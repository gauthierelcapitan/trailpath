import { EntityRepository } from '@mikro-orm/postgresql';
import { TrackEntity } from '@trailpath/api/app/data-access/entity/track/track.entity';

export class TrackRepository extends EntityRepository<TrackEntity> {}
