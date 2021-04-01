import { EventEmitter } from 'events';
import { TokenValidator } from './tokenValidator';

export class EmitterService {
  private static instance: EmitterService;

  private confirmTimeLimit = 5000;

  private confirmTimeout?: NodeJS.Timeout;

  private constructor(
    private readonly emitter: EventEmitter,
    private readonly validator: TokenValidator
  ) {}

  static init(
    emitter: EventEmitter,
    validator: TokenValidator
  ): EmitterService {
    if (this.instance) {
      throw new Error('Only one instance allowed');
    }

    this.instance = new EmitterService(emitter, validator);

    return this.instance;
  }

  static getInstance(): EmitterService {
    return this.instance;
  }

  public initializeSocket() {
    this.confirmTimeout = setTimeout(() => {
      console.log('DISCONNECT');
      return this.emitter.emit('DISCONNECT');
    }, this.confirmTimeLimit);

    this.initalizeConfirmListener();

    console.log('*** confirm timeout set ***', this.confirmTimeout);
  }

  private initalizeConfirmListener() {
    this.emitter.on('CONFIRM', async (token) => {
      console.log('CONFIRM');
      const isValidToken = await this.validator(token);

      if (!isValidToken) {
        console.log('token invalid');

        return;
      }

      console.log('VALID');
      this.confirmTimeout && clearTimeout(this.confirmTimeout);
    });
  }
}
