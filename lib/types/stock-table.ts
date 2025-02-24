export type StockTableMagicCards = {
    nameEn: string
    leaguePrice: number
    price: number
    stockCount: number
    leaguePriceLastUpdate: string
}

export type StockTableGameStores = {
    name: string
    magicCardsRegistered: number
    minAcceptablePrice: number
    magicCards: StockTableMagicCards[]
}

export type StockTableUsers = {
    gameStores: StockTableGameStores[]
}

export type StockTableResponse = {
    users: StockTableUsers[]
}
