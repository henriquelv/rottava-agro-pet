declare module 'zustand/middleware' {
  import { State, StateCreator } from 'zustand'

  export interface PersistOptions<T> {
    name: string
    getStorage?: () => Storage
    serialize?: (state: T) => string
    deserialize?: (str: string) => T
    partialize?: (state: T) => Partial<T>
    version?: number
    migrate?: (persistedState: any, version: number) => T | Promise<T>
    merge?: (persistedState: any, currentState: T) => T
    onRehydrateStorage?: (state: T) => ((state?: T, error?: Error) => void) | void
  }

  export type PersistImpl = <T extends State>(
    config: StateCreator<T>,
    options: PersistOptions<T>
  ) => StateCreator<T>

  export const persist: PersistImpl
} 