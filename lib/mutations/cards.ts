import { gql } from "@apollo/client";

export const BULK_INSERT_CARDS = gql`
mutation BulkInsert($GameStoreId: ID!) {
  bulkCreateMagicCard(input: {gameStore: $GameStoreId, magicCards: []}) {
    magicCards {
      id
      namePtbr
    }
  }
}
`