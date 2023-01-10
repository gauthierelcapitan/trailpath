import {
  DateTimeType,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TrackRepository } from '@trailpath/api/app/data-access/entity/track/track.entity.repository';
import { v4 } from 'uuid';

@Entity({ tableName: 'track', customRepository: () => TrackRepository })
export class TrackEntity {
  [EntityRepositoryType]?: TrackRepository;

  @PrimaryKey()
  id: string = v4();

  @Property()
  name: string;

  @Property()
  distance: number;

  @Property({
    type: DateTimeType,
  })
  createdAt: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
