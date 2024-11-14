export interface IStorageService {
  init(): Promise<void>

  set(key: string, value: unknown): Promise<any>

  get(key: string): Promise<any>

  remove(key: string): Promise<void>
}
