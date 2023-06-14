import { ICRUDFindAll, ICRUDFindById } from './ICRUD';

export type ICRUDTeam<T> = ICRUDFindAll<T> & ICRUDFindById<T>;
