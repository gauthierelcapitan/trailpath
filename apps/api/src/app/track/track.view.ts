import { ApiProperty } from '@nestjs/swagger';

export class TrackView {
  @ApiProperty()
  public label: string;

  @ApiProperty()
  public slug: string;

  constructor(label: string, slug: string) {
    this.label = label;
    this.slug = slug;
  }
}
