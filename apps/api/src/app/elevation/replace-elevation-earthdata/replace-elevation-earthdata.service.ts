import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationException } from '@trailpath/api/app/common/exception/application.exception';
import { EnvironmentEarthdataInterface } from '@trailpath/api/environments/interface/environment-earthdata.interface';
import { ElevationDatasourceEnum } from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import * as fs from 'fs';
import { Position } from 'geojson';
import { catchError, firstValueFrom, from } from 'rxjs';
import { SyncTileSet } from 'srtm-elevation';

type Datasources =
  | ElevationDatasourceEnum.SRTMGL3
  | ElevationDatasourceEnum.SRTMGL1
  | ElevationDatasourceEnum.NASADEM;

/**
 * Class that handle elevation replacement in coordinates using NASA Earthdata.
 *
 * SRTM limitation : from 60°N to 56°S (https://www.researchgate.net/figure/SRTM-near-global-coverage-of-landmass-from-60N-to-56S-Image-courtesy-of-JPL_fig1_248903640)
 *
 * Documentation :
 *    - NASADEM : https://lpdaac.usgs.gov/products/nasadem_hgtv001/
 *    - SRTMGL3 : https://lpdaac.usgs.gov/products/srtmgl3v003/
 *    - SRTMGL1 : https://lpdaac.usgs.gov/products/srtmgl1v003/
 */
@Injectable()
export class ReplaceElevationEarthdataService {
  private readonly logger = new Logger(ReplaceElevationEarthdataService.name);

  private readonly providerMapper: { [D in Datasources]: string } = {
    [ElevationDatasourceEnum.SRTMGL1]:
      'https://e4ftl01.cr.usgs.gov/MEASURES/SRTMGL1.003/2000.02.11/{lat}{lng}.SRTMGL1.hgt.zip',
    [ElevationDatasourceEnum.SRTMGL3]:
      'https://e4ftl01.cr.usgs.gov/MEASURES/SRTMGL3.003/2000.02.11/{lat}{lng}.SRTMGL3.hgt.zip',
    [ElevationDatasourceEnum.NASADEM]:
      'https://e4ftl01.cr.usgs.gov/MEASURES/NASADEM_HGT.001/2000.02.11/NASADEM_HGT_{lat}{lng}.zip',
  };

  constructor(private readonly configService: ConfigService) {}

  async replace(
    coordinates: Position[],
    datasource: Datasources,
  ): Promise<Position[]> {
    const earthdata =
      this.configService.get<EnvironmentEarthdataInterface>('earthdata');
    const { topLeft, bottomRight } = this.getOutermostCoordinates(coordinates);

    const tilesDirectory = `${earthdata.tilesDirectory}/${datasource}`;

    if (!fs.existsSync(tilesDirectory)) {
      fs.mkdirSync(tilesDirectory);
    }

    return await firstValueFrom(
      from(
        new Promise<Position[]>((resolve, reject) => {
          const tileSet = new SyncTileSet(
            tilesDirectory,
            [bottomRight.lat, topLeft.lon],
            [topLeft.lat, bottomRight.lon],
            (error) => {
              if (error) {
                reject(error);
              } else {
                resolve(
                  coordinates.map(([lon, lat]) => {
                    const ele =
                      Math.round(tileSet.getElevation([lat, lon]) * 10) / 10;

                    return [lon, lat, ele];
                  }),
                );
              }
            },
            {
              provider: this.providerMapper[datasource],
              username: earthdata.username,
              password: earthdata.password,
            },
          );
        }),
      ).pipe(
        catchError((error) => {
          this.logger.error(error);
          throw new ApplicationException(
            `Error while fetching Earthdata elevation : ${error}.`,
          );
        }),
      ),
    );
  }

  private getOutermostCoordinates = (
    coordinates: Position[],
  ): {
    bottomRight: { lat: number; lon: number };
    topLeft: { lat: number; lon: number };
  } => {
    const lonList = coordinates.map(([lon]) => lon);
    const latList = coordinates.map(([_lon, lat]) => lat);

    return {
      topLeft: { lat: Math.max(...latList), lon: Math.min(...lonList) },
      bottomRight: { lat: Math.min(...latList), lon: Math.max(...lonList) },
    };
  };
}
