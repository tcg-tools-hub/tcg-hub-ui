export type StockTableMagicCards = {
    nameEn: string
    leaguePrice: number
    price: number
    stockCount: number
}

export type StockTableGameStores = {
    name: string
    magicCards: StockTableMagicCards[]
}

export type StockTableUsers = {
    gameStores: StockTableGameStores[]
}

export type StockTableResponse = {
    users: StockTableUsers[]
}
