export const shortenAddress = (address?: string) => {
    if (address && address.length > 8) {
        return `${address.slice(0, 4)}...${address.slice(-4)}`
    }
    return ""
}
