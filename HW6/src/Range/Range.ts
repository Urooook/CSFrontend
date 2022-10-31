import { Values } from "./interface";

export default class Range<T extends Values> {
    #from: number;

    #to: number;

    #isNumber: boolean;

    constructor(from: T, to: T) {
        this.#isNumber = typeof from === 'number';
        this.#from = this.validate(from);
        this.#to = this.validate(to);
    }

    [Symbol.iterator]() {
        return this.#values();
    }

    reverse() {
        return this.#values(true);
    }

    validate<T extends Values>(value: T): number {
        if (value == null) {
            throw new Error('value is required');
        }

        if (typeof value === 'string') {
            if (value.length > 1) {
                throw new Error('should has one character');
            }

            const code = value.codePointAt(0);

            if (code == null) {
                throw new Error('unicode code not found');
            }
            return code;
        }

        return value;
    }

    #values(isReverse = false): IterableIterator<T | any> {
        let cursor = isReverse ? this.#to : this.#from;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next: () => {
                const changeCursor = () => (isReverse ? cursor-- : cursor++);

                return {
                    done: isReverse ? cursor < this.#from : cursor > this.#to,
                    value: this.#isNumber ? changeCursor() : String.fromCodePoint(changeCursor()),
                };
            },
        };
    }
}