import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(input: {email: $email, password: $password}) {
            token
        }
    }
`