class Effect {
	constructor(fn: () => void, flush: "pre" | "post" = "post") {
		switch (flush) {
			case "pre":
				$effect.pre(fn);
				break;
			case "post":
				$effect(fn);
				break;
			default:
				throw new Error(
					`Invalid flush value: ${flush}. Expected 'pre' or 'post'.`,
				);
		}
	}
}

type Parameters = ConstructorParameters<typeof Effect>;

const effect = (fn: Parameters[0], flush?: Parameters[1]) =>
	new Effect(fn, flush);

export { effect, Effect };
