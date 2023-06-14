// import { ICRUDFindById } from './ICRUD';

export type ICRUDUser<T> = {
  findByEmail(email: string): Promise<T | null>,
};
