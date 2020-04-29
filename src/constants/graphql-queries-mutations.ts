import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            profile {
                firstName
                lastName
                email
                lastLoggedIn
            }
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation logout($accessToken: String!) {
        logout(accessToken: $accessToken)
    }
`;