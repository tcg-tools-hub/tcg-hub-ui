export const formatToCurrency = (value: string) => {
    const amount = parseFloat(value ?? 0)
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(amount)
    return formatted
}