import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
query GetCurrentUser($email: String!) {
  users(email:$email) {
    id
    username
    fullName
    dateJoined
    birthdate
    isSuperuser
    gameStores {
      id
    }
    gameStoreOwner
    gameStoreEmployee
    lastActivity
  }
}
`