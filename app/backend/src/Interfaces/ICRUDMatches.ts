import { ICRUDCreator, ICRUDFindAll } from './ICRUD';

export interface ICRUDMatches<T> extends ICRUDFindAll<T>, ICRUDCreator<T> {
  findByInProgress(inProgress: boolean): Promise<T[] | null>;
  updateMatch(id: number, match: Partial<T>): Promise<T | null>;
}
