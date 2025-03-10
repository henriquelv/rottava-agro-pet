declare module 'zustand' {
  import { PersistOptions } from 'zustand/middleware'
  
  export interface State {
    [key: string]: any
  }

  export interface StateCreator<T extends State> {
    (set: (partial: ((state: T) => Partial<T>) | Partial<T>) => void, get: () => T): T
  }

  export interface StoreApi<T extends State> {
    setState: (partial: ((state: T) => Partial<T>) | Partial<T>) => void
    getState: () => T
    subscribe: (listener: (state: T) => void) => () => void
    destroy: () => void
  }

  export type Mutate<S, A> = (
    state: S,
    actions: A
  ) => S

  export interface Create {
    <T extends State>(
      initialState: T | StateCreator<T>
    ): (set: (partial: ((state: T) => Partial<T>) | Partial<T>) => void, get: () => T) => StoreApi<T>
  }

  export interface UseBoundStore<T extends State> extends StoreApi<T> {
    (): T
    <U>(selector: (state: T) => U): U
  }
} 