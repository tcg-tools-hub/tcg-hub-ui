import { gql } from "@apollo/client";

export const STOCK_TABLE = gql`
query StockTable($email: String!) {
  users(email: $email) {
    gameStores {
      name
      magicCardsRegistered
      minAcceptablePrice
      magicCards {
        nameEn
        leaguePrice
        price
        stockCount
        leaguePriceLastUpdate
      }
    }
  }
}
`