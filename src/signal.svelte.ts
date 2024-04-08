import { BaseSignal } from "./base-signal.js";

class Signal<T> extends BaseSignal {
	public value = $state() as T;

	public constructor(init?: T) {
		super();
		this.value = init as T;
	}
}

type Parameters<T> = ConstructorParameters<typeof Signal<T>>;

const signal = <T>(init?: Parameters<T>[0]) => new Signal(init);

export { signal, Signal };
