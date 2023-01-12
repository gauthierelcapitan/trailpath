import { Injectable } from '@nestjs/common';
import { Position } from 'geojson';
import {
  ElevationMethodEnum
} from '@trailpath/api-interface/elevation/elevation-method.enum';
import {
  ElevationDatasourceEnum
} from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import {
  ReplaceElevationIgnService
} from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.service';

@Injectable()
export class ElevationService {

  private readonly mapping: { [K in ElevationDatasourceEnum]: (coordinates: Position[]) => Promise<Position[]>};

  constructor(private readonly replaceElevationIgnService: ReplaceElevationIgnService) {
    this.mapping = {
      [ElevationDatasourceEnum.IGN]: (coordinates: Position[]) => this.replaceElevationIgnService.replace(coordinates)
    }
  }

  async replace(
    coordinates: Position[],
    method: ElevationMethodEnum,
    datasource: ElevationDatasourceEnum): Promise<Position[]> {

    switch (method) {
      case ElevationMethodEnum.REPLACE_MISSING:
        return await this.replaceMissing(coordinates, datasource)
      case ElevationMethodEnum.REPLACE_ALL:
        return await this.mapping[datasource](coordinates)
      default:
      case ElevationMethodEnum.NONE:
        return coordinates
    }
  }

  private async replaceMissing(coordinates: Readonly<Position[]>, datasource: ElevationDatasourceEnum) {
    const result = JSON.parse(JSON.stringify(coordinates));

    let missingIndex: { position: Position, index: number}[]  = coordinates.map((position, index) => !position[2] && { position, index }).filter(Boolean)

    const replacements = await this.mapping[datasource](missingIndex.map(({ position }) => position))

    missingIndex.forEach(({ index }, indexReplacement) => {
      result[index][2] = replacements[indexReplacement][2]
    })

    return result
  }
}
