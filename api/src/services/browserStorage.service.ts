import {Drivers, Storage} from '@ionic/storage'
import type {IStorageService} from '../interfaces'

export class BrowserStorageService implements IStorageService {
  private isInitialized = false
  private storage?: Storage

  private constructor() {
    void this.init()
  }

  private static _instance: BrowserStorageService

  static get instance(): BrowserStorageService {
    if (!BrowserStorageService._instance) {
      BrowserStorageService._instance = new BrowserStorageService()
    }
    return BrowserStorageService._instance
  }

  async init() {
    if (!this.isInitialized) {
      this.storage = new Storage({
        name: '__pokedexDb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
      await this.storage.create()
      this.isInitialized = true
    }
  }

  async set(key: string, value: unknown): Promise<any> {
    return await this.storage?.set(key, value)
  }

  async get(key: string) {
    return await this.storage?.get(key)
  }

  async remove(key: string): Promise<void> {
    return await this.storage?.remove(key)
  }
}
