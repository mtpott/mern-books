import { gql } from '@apollo/client';

//get me query
export const GET_ME = gql`
    query {
        me {
            _id
            username
            savedBooks {
                bookId
                title
                image
                link
                description
                authors
            }
        }
    }
`;