import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $publisher: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, publisher: $publisher, authorId: $authorId) {
      name
      id
    }
  }
`;

const deleteBookMutation = gql`
  mutation remove($id: ID!){
    deleteBook(id: $id) {
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, deleteBookMutation };
