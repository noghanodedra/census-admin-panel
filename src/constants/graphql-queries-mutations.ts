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

export const GET_DROP_DOWN_DATA = gql`
    {
        workClassList {
            id
            name
            description
        }

        occupationList {
            id
            name
            description
        }

        educationList {
            id
            name
            description
        }

        relationshipList {
            id
            name
            description
        }

        casteList {
            id
            name
            minority
            description
        }

        genderList {
            id
            name
            description
        }

        incomeClassList {
            id
            name
            description
        }

        maritalStatusList {
            id
            name
            description
        }

        stateList {
            id
            name
            code
            districts {
                id
                name
            }
        }

        censusList {
            id
            name
        }
    }
`;
