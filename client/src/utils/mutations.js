//DECLARATIONS: gql
import { gql } from '@apollo/client';

//login mutation ==============================
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    } 
`;

//add user mutation =========================
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id 
                username
            }
        }
    }
`;