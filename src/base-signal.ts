declare const SignalSymbol: unique symbol;

class BaseSignal {
	private readonly [SignalSymbol] = true;
}

export { BaseSignal };
