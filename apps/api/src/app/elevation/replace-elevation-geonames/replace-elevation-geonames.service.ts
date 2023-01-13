import { Injectable, Logger } from '@nestjs/common';
import { Position } from 'geojson';
import { ConfigService } from '@nestjs/config';

import {
  ElevationDatasourceEnum
} from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import {
  EnvironmentGeonamesInterface
} from '@trailpath/api/environments/interface/environment-geonames.interface';
import {
  ApplicationException
} from '@trailpath/api/app/common/exception/application.exception';
import { chunk } from 'lodash';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { HttpService } from '@nestjs/axios';
import {
  ElevationGeonamesResponseInterface
} from '@trailpath/api/app/elevation/common/elevation-geonames-response.interface';
import {
  GEONAMES_ELEVATION_BATCH_SIZE
} from '@trailpath/api/app/elevation/replace-elevation-geonames/replace-elevation-geonames.constant';

/**
 * Class that handle elevation replacement in coordinates using Geonames webservice.
 *
 * Documentation :
 *    - Elevation : https://www.geonames.org/export/web-services.html
 */
@Injectable()
export class ReplaceElevationGeonamesService {

  private readonly logger = new Logger(ReplaceElevationGeonamesService.name);

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  async replace(coordinates: Position[], _datasource: ElevationDatasourceEnum.ASTER_GDEM): Promise<Position[]> {

    const chunks = chunk(coordinates, GEONAMES_ELEVATION_BATCH_SIZE)

    const geonames = this.configService.get<EnvironmentGeonamesInterface>('geonames')

    return (await Promise.all(chunks.map(async chunk => this.fetchGeonamesElevation(chunk, geonames.username)))).flat(1)

  }

  private async fetchGeonamesElevation(coordinates: Position[], username: string): Promise<Position[]> {

    const lon = coordinates.map(([lon]) => lon).join(',')
    const lat = coordinates.map(([_lon, lat]) => lat).join(',')

    const url = `http://api.geonames.org/astergdemJSON?lats=${lat}&lngs=${lon}&username=${username}`

    const { data } = await firstValueFrom(
      this.httpService.get<ElevationGeonamesResponseInterface>(url, {
        timeout: 10000
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new ApplicationException(`Error ${error.response.data} while fetching GeoNames elevation ${url}.`);
        }),
      )
    );

    return coordinates.map(([lon, lat], index) => ([lon, lat, (Math.round(data.geonames[index].astergdem*10)/10)]))
  }
}
