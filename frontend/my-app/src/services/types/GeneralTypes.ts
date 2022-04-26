
export type ValidationError = {
    errorValue: string,
    valid: boolean
}

export type ValidatedObject<T> = {
    value: T,
    valid: boolean,
    errorValue: string
}