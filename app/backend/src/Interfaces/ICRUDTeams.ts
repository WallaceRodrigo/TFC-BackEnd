export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}
