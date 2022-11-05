export type Nullable<T> = T | null;

export default class StringIterator {
    private firstSurrogateRange = [0xd800, 0xdbff];

    private secondSurrogateRange = [0xdc00, 0xdfff];

    private isFirstSurrogate(code: number): boolean {
        return code >= this.firstSurrogateRange[0] && code <= this.firstSurrogateRange[1];
    }

   private isSecondSurrogate(code: number): boolean {
        return code >= this.secondSurrogateRange[0] && code <= this.secondSurrogateRange[1];
    }

    iterate(string: string): IterableIterator<string> {
        const normalizedString = string.normalize();
        let firstSurrogate: Nullable<number> = null;
        let pointer = 0;
        const self = this;

        return {
            next(): IteratorResult<string> {
                if (pointer >= normalizedString.length) return { done: true, value: undefined };

                const charCode = normalizedString.charCodeAt(pointer);
                if (self.isFirstSurrogate(charCode)) {
                    firstSurrogate = charCode;
                    pointer += 1;

                    return this.next();
                }

                if (self.isSecondSurrogate(charCode)) {
                    pointer += 1;

                    if (firstSurrogate !== null) {
                        const value = String.fromCharCode(firstSurrogate, charCode);
                        firstSurrogate = null;

                        return { done: false, value };
                    }

                    return this.next();
                }

                const regularChar = String.fromCharCode(charCode);
                firstSurrogate = null;
                pointer += 1;

                return { done: false, value: regularChar };
            },
            [Symbol.iterator](): IterableIterator<string> {
                return this;
            },
        };
    }
}