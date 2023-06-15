import { ICRUDFindAll, ICRUDFindById } from './ICRUD';

export interface ICRUDMatches<T> extends ICRUDFindAll<T>, ICRUDFindById<T> {
  findByInProgress(inProgress: boolean): Promise<T[] | null>;
  updateMatch(id: number, match: Partial<T>): Promise<T | null>;
}
