import { gql } from "@apollo/client";

export const BULK_INSERT_CARDS = gql`
mutation BulkInsert($GameStoreId: ID!, $MagicCards: [BulkMagicCardInput]!) {
  bulkCreateMagicCard(input: {gameStore: $GameStoreId, magicCards: $MagicCards}) {
    magicCards {
      id
      namePtbr
    }
  }
}
`