import { gql } from '@apollo/client';

// Mutation to create a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to save a book to user's savedBooks
export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: BookInput!) {
    saveBook(userId: $userId, book: $book) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

// Mutation to remove a book from user's savedBooks
export const REMOVE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: ID!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;