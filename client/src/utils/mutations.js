import { gql } from '@apollo/client';

//log user into the page using email and password. return token used to authenticate user
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

//add a new user with username, email, and password
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

//add a book to the user's saved books array. return the array
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            email
            username
            savedBooks {
                bookId
                authors
                description
                title
                link
                image
            }
        }
    }
`;

//remove a book from the user's saved books array. return the rest of the array
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: bookId!) {
        removeBook(bookId: $bookId) {
            _id
            email
            username
            books {
                bookId
                authors
                description
                title
                link
                image
            }
        }
    }
`