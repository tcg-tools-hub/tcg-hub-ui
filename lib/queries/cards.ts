import { gql } from "@apollo/client";

export const STOCK_TABLE = gql`
query StockTable($email: String!) {
  users(email: $email) {
    gameStores {
      name
      magicCards {
        nameEn
        leaguePrice
        price
        stockCount
      }
    }
  }
}
`