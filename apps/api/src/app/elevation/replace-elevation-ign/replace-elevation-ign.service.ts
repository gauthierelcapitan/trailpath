import { HttpService } from '@nestjs/axios';
import { Position } from 'geojson';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { chunk } from 'lodash';
import {
  IGN_ELEVATION_BATCH_SIZE
} from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.constant';
import {
  ElevationIgnResponse
} from '@trailpath/api/app/elevation/common/elevation-ign-response.interface';
import {
  ApplicationException
} from '@trailpath/api/app/common/exception/application.exception';

@Injectable()
export class ReplaceElevationIgnService {

  private readonly logger = new Logger(ReplaceElevationIgnService.name);

  constructor(private readonly httpService: HttpService) {}

  async replace(coordinates: Position[]): Promise<Position[]> {

    const chunks = chunk(coordinates, IGN_ELEVATION_BATCH_SIZE)

    return (await Promise.all(chunks.map(async chunk => this.fetchIgnElevation(chunk)))).flat(1)
  }

  async fetchIgnElevation(coordinates: Position[]): Promise<Position[]> {

    const lon = coordinates.map(([lon]) => lon).join('|')
    const lat = coordinates.map(([_lon, lat]) => lat).join('|')

    const url = `https://wxs.ign.fr/calcul/alti/rest/elevation.json?lon=${lon}&lat=${lat}`

    const { data: { elevations } } = await firstValueFrom(
      this.httpService.get<ElevationIgnResponse>(url, {
        timeout: 10000
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new ApplicationException(`Error ${error.response.data} while fetching IGN ${url}.`);
        }),
      )
    );

    return coordinates.map(([lon, lat], index) => ([lon, lat, elevations[index].z]))
  }
}
