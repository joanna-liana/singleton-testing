describe('Singleton', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('creates the initial instance', () => {
    const { Singleton } = require('./singleton');

    const instance = Singleton.init(console);

    expect(instance).toBeInstanceOf(Singleton);
  });

  it('cannot create multiple instances', () => {
    const { Singleton } = require('./singleton');

    Singleton.init(console);

    expect(() => Singleton.init(console)).toThrowError();
  });

  it('returns the existing instance', () => {
    const { Singleton } = require('./singleton');

    Singleton.init(console);

    expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
  });

  it('returns the existing instance multiple times', () => {
    const { Singleton } = require('./singleton');

    Singleton.init(console);

    expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
    expect(Singleton.getInstance()).toBeInstanceOf(Singleton);
  });
});
