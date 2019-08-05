import { Repository, EntityRepository } from 'typeorm';
import { Role } from './role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
