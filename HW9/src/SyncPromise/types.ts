export enum STATUSES {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected',
}

export type ThenableObject<T> = {
    then?(resolve: (value: ThenableObject<T>) => void, reject?:(reason?: any) => void): void
}