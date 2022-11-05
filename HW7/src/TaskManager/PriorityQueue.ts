export default class PriorityQueue<T> {
    #elements: T[] = [];

    get isEmpty() {
        return this.#elements.length === 0;
    }

    insert(value: T, predicate: (element: T) => boolean): void {
        let index = this.#elements.length - 1;

        while (this.#elements[index] != null && predicate(this.#elements[index])) {
            this.#elements[index + 1] = this.#elements[index];
            index -= 1;
        }

        this.#elements[index + 1] = value;
    }

    remove(): T {
        return this.#elements.shift();
    }
}