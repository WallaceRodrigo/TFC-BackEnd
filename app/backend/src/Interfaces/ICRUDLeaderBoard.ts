import { ICRUDFindAll, ICRUDFindById } from './ICRUD';

export type ICRUDLeaderBoard<T> = ICRUDFindAll<T> & ICRUDFindById<T>;
