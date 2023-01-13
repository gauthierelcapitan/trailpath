import { HttpService } from '@nestjs/axios';
import { Position } from 'geojson';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { chunk } from 'lodash';
import {
  IGN_ELEVATION_BATCH_SIZE,
} from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.constant';
import {
  ElevationIgnResponseInterface,
} from '@trailpath/api/app/elevation/common/elevation-ign-response.interface';
import {
  ApplicationException,
} from '@trailpath/api/app/common/exception/application.exception';
import {
  ElevationDatasourceEnum,
} from '@trailpath/api-interface/elevation/elevation-datasource.enum';

/**
 * Class that handle elevation replacement in coordinates using French IGN GeoService data.
 *
 * Documentation : https://geoservices.ign.fr/documentation/services/api-et-services-ogc/calcul-altimetrique-rest
 */
@Injectable()
export class ReplaceElevationIgnService {

  private readonly logger = new Logger(ReplaceElevationIgnService.name);

  constructor(private readonly httpService: HttpService) {}

  async replace(coordinates: Position[], _datasource: ElevationDatasourceEnum.IGN): Promise<Position[]> {

    const chunks = chunk(coordinates, IGN_ELEVATION_BATCH_SIZE)

    return (await Promise.all(chunks.map(async chunk => this.fetchIgnElevation(chunk)))).flat(1)
  }

  private async fetchIgnElevation(coordinates: Position[]): Promise<Position[]> {

    const lon = coordinates.map(([lon]) => lon).join('|')
    const lat = coordinates.map(([_lon, lat]) => lat).join('|')

    const url = `https://wxs.ign.fr/calcul/alti/rest/elevation.json?lon=${lon}&lat=${lat}`

    const { data: { elevations } } = await firstValueFrom(
      this.httpService.get<ElevationIgnResponseInterface>(url, {
        timeout: 10000
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new ApplicationException(`Error ${error.response.data} while fetching IGN elevation ${url}.`);
        }),
      )
    );

    return coordinates.map(([lon, lat], index) => ([lon, lat, (Math.round(elevations[index].z*10)/10)]))
  }
}
