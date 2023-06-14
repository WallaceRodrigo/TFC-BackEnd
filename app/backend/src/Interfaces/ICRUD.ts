export type NewEntity<T> = Omit<T, 'id'>;

export interface ICRUDFindAll<T> {
  findAll(): Promise<T[]>,
}

export interface ICRUDFindById<T> {
  findById(id: number): Promise<T | null>,
}

export interface ICRUDCreator<T> {
  create(data: NewEntity<T>): Promise<T>,
}

export interface ICRUDUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDDelete {
  delete(id: number): Promise<number>,
}
