import { ApiProperty } from '@nestjs/swagger';
import { TrackMetadataInterface } from '@trailpath/api-interface/track';

export class TrackMetadataView implements TrackMetadataInterface {
  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  desc: string;

  constructor({ name, desc }: TrackMetadataInterface) {
    this.name = name;
    this.desc = desc;
  }
}
