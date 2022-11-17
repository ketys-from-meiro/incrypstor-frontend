export const required = (value: string | number) => {
    const valid = typeof value === "string" ? Boolean(value) : !Number.isNaN(value)
    return valid ? undefined : "Required field"
}

export const numberInRange = (value: number, min: number, max: number) => {
    return value >= min && value <= max ? undefined : `Must be in range ${min}, ${max}`
}
