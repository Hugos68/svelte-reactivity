declare const __brand: unique symbol;

class Signal<T> {
	public value = $state() as T;
	private readonly [__brand] = true;

	public constructor(init?: T) {
		this.value = init as T;
	}
}

type Parameters<T> = ConstructorParameters<typeof Signal<T>>;

const signal = <T>(init?: Parameters<T>[0]) => new Signal(init);

export { signal, Signal };
