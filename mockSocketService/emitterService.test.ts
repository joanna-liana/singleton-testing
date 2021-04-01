import { EventEmitter } from 'events';
import { EmitterService } from './emitterService';
import { validateToken } from './tokenValidator';

const endEventLoop = () => new Promise((resolve) => setImmediate(resolve));

describe('Emitter service', () => {
  jest.spyOn(console, 'log').mockImplementation(() => null);

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  it('Disconnects an initialised client that did not confirm init', async () => {
    // given
    const { EmitterService: ES } = require('./emitterService');

    const emitter = new EventEmitter();

    const emitSpy = jest.spyOn(emitter, 'emit');

    const instance: EmitterService = ES.init(emitter, validateToken);

    instance.initializeSocket();

    // when
    jest.runAllTimers();

    await endEventLoop();

    // then
    expect(emitSpy).toHaveBeenCalledWith('DISCONNECT');
  });

  it('Does not disconnect an initialised client that confirmed init', async () => {
    // given
    const { EmitterService: ES } = require('./emitterService');

    const emitter = new EventEmitter();

    const emitSpy = jest.spyOn(emitter, 'emit');

    const instance: EmitterService = ES.init(emitter, validateToken);

    instance.initializeSocket();

    // when
    emitter.emit('CONFIRM', 'valid-token');

    await endEventLoop();

    jest.runAllTimers();

    // then
    expect(emitSpy).not.toHaveBeenCalledWith('DISCONNECT');
  });

  it('Disconnects an initialised client that did not confirm init with a valid token', async () => {
    // given
    const { EmitterService: ES } = require('./emitterService');

    const emitter = new EventEmitter();

    const emitSpy = jest.spyOn(emitter, 'emit');

    const instance: EmitterService = ES.init(emitter, validateToken);

    instance.initializeSocket();

    // when
    emitter.emit('CONFIRM', 'invalid-token');

    await endEventLoop();

    jest.runAllTimers();

    // then
    expect(emitSpy).toHaveBeenCalledWith('DISCONNECT');
  });
});
