import { ApiProperty } from '@nestjs/swagger';
import { TrackMetadataView } from '@trailpath/api/app/track/track/view/track-metadata.view';
import { TrackInterface } from '@trailpath/api-interface/track/track.interface';
import { Feature, GeoJsonProperties, LineString, Point } from 'geojson';

export class TrackView implements TrackInterface {
  @ApiProperty()
  id: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  track: Feature<LineString, GeoJsonProperties>;

  @ApiProperty()
  points: Feature<Point>[];

  @ApiProperty({ type: TrackMetadataView })
  metadata: TrackMetadataView;

  constructor(
    id: string,
    { filename, track, points, metadata }: TrackInterface,
  ) {
    this.id = id;
    this.filename = filename;
    this.track = track;
    this.points = points;
    this.metadata = new TrackMetadataView(metadata);
  }
}
