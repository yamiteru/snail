const instance = new Map();

export abstract class Singleton {
	constructor(name: string) {
		if (!instance.has(name)) {
			instance.set(name, this);
		}

		return instance.get(name);
	}
}
