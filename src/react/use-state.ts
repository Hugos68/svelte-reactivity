export function useState<T>(init?: T) {
	let value = $state(init);
	return [() => value, (new_value: T) => (value = new_value)];
}
