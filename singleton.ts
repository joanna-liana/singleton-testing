interface Logger {
  log: (txt: string) => void;
}

export class Singleton {
  private static instance: Singleton;

  private constructor(private readonly logger: Logger) {}

  static init(logger: Logger): Singleton {
    if (this.instance) {
      throw new Error('Only one instance allowed');
    }

    this.instance = new Singleton(logger);

    return this.instance;
  }

  static getInstance(): Singleton {
    return this.instance;
  }
}
