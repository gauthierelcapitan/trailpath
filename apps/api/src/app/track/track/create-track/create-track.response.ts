import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackResponseInterface } from '@trailpath/api-interface/track/create-track/create-track.response.interface';

export class CreateTrackResponse implements CreateTrackResponseInterface {
  @ApiProperty({
    type: 'string',
    example: '2d8243a5-3eb7-4507-81c7-85380d7205d3',
    description: 'Track UUID',
  })
  uuid: string;

  constructor(partial?: Partial<CreateTrackResponse>) {
    Object.assign(this, partial);
  }
}
