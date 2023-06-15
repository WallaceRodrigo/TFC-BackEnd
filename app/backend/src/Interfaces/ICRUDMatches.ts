import { ICRUDCreator, ICRUDFindAll, ICRUDFindById } from './ICRUD';

export interface ICRUDMatches<T> extends ICRUDFindAll<T>, ICRUDCreator<T>, ICRUDFindById<T> {
  findByInProgress(inProgress: boolean): Promise<T[] | null>;
  updateMatch(id: number, match: Partial<T>): Promise<T | null>;
}
