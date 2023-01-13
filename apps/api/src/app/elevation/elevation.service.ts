import { Injectable } from '@nestjs/common';
import { ReplaceElevationEarthdataService } from '@trailpath/api/app/elevation/replace-elevation-earthdata/replace-elevation-earthdata.service';
import { ReplaceElevationGeonamesService } from '@trailpath/api/app/elevation/replace-elevation-geonames/replace-elevation-geonames.service';
import { ReplaceElevationIgnService } from '@trailpath/api/app/elevation/replace-elevation-ign/replace-elevation-ign.service';
import { ElevationDatasourceEnum } from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import { ElevationMethodEnum } from '@trailpath/api-interface/elevation/elevation-method.enum';
import { Position } from 'geojson';

@Injectable()
export class ElevationService {
  private readonly mapping: {
    [K in ElevationDatasourceEnum]: (
      coordinates: Position[],
      datasource: ElevationDatasourceEnum,
    ) => Promise<Position[]>;
  };

  constructor(
    private readonly replaceElevationIgnService: ReplaceElevationIgnService,
    private readonly replaceElevationGeonamesService: ReplaceElevationGeonamesService,
    private readonly replaceElevationEarthdataService: ReplaceElevationEarthdataService,
  ) {
    this.mapping = {
      [ElevationDatasourceEnum.IGN]: (
        coordinates: Position[],
        datasource: ElevationDatasourceEnum.IGN,
      ) => this.replaceElevationIgnService.replace(coordinates, datasource),
      [ElevationDatasourceEnum.SRTMGL1]: (
        coordinates: Position[],
        datasource: ElevationDatasourceEnum.SRTMGL1,
      ) =>
        this.replaceElevationEarthdataService.replace(coordinates, datasource),
      [ElevationDatasourceEnum.SRTMGL3]: (
        coordinates: Position[],
        datasource: ElevationDatasourceEnum.SRTMGL3,
      ) =>
        this.replaceElevationEarthdataService.replace(coordinates, datasource),
      [ElevationDatasourceEnum.NASADEM]: (
        coordinates: Position[],
        datasource: ElevationDatasourceEnum.NASADEM,
      ) =>
        this.replaceElevationEarthdataService.replace(coordinates, datasource),
      [ElevationDatasourceEnum.ASTER_GDEM]: (
        coordinates: Position[],
        datasource: ElevationDatasourceEnum.ASTER_GDEM,
      ) =>
        this.replaceElevationGeonamesService.replace(coordinates, datasource),
    };
  }

  async replace(
    coordinates: Position[],
    method: ElevationMethodEnum,
    datasource: ElevationDatasourceEnum,
  ): Promise<Position[]> {
    switch (method) {
      case ElevationMethodEnum.REPLACE_MISSING:
        return await this.replaceMissing(coordinates, datasource);
      case ElevationMethodEnum.REPLACE_ALL:
        return await this.mapping[datasource](coordinates, datasource);
      default:
      case ElevationMethodEnum.NONE:
        return coordinates;
    }
  }

  private async replaceMissing(
    coordinates: Readonly<Position[]>,
    datasource: ElevationDatasourceEnum,
  ) {
    const result = JSON.parse(JSON.stringify(coordinates));

    const missingIndex: { index: number; position: Position }[] = coordinates
      .map((position, index) => !position[2] && { position, index })
      .filter(Boolean);

    const replacements = await this.mapping[datasource](
      missingIndex.map(({ position }) => position),
      datasource,
    );

    missingIndex.forEach(({ index }, indexReplacement) => {
      result[index][2] = replacements[indexReplacement][2];
    });

    return result;
  }
}
