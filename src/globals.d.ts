interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _paq: [string, ...any[]][];
}

// jsdom does not ship its own type declarations.
declare module 'jsdom' {
  export class VirtualConsole {
    emit(event: string, ...args: unknown[]): boolean;
  }
}
