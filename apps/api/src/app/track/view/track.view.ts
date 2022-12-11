import { ApiProperty } from '@nestjs/swagger';
import { TrackInterface } from '@trailpath/api-interface/track/track.interface';
import { GeoJSON } from 'geojson';

export class TrackView implements TrackInterface {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public filename: string;

  @ApiProperty()
  public geojson: GeoJSON;

  constructor(id: string, filename: string, geojson: GeoJSON) {
    this.id = id;
    this.filename = filename;
    this.geojson = geojson;
  }
}
