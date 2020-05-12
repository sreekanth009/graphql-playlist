const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// let books = [
//   {name: 'Book Name1', genre: 'Faantasy', id: '1', authorId: '1'},
//   {name: 'Book Name2', genre: 'Fantasy', id: '2', authorId: '2'},
//   {name: 'Book Name3', genre: 'Drama', id: '3', authorId: '3'},
//   {name: 'Book Name4', genre: 'Sci-Fi', id: '4', authorId: '2'},
//   {name: 'Book Name5', genre: 'Thirller', id: '5', authorId: '3'},
//   {name: 'Book Name6', genre: 'Drama', id: '6', authorId: '1'},
// ]

// let authors = [
//   {name: 'Napoleon Hill', age: '75', id: '1'},
//   {name: 'Josep Murfy', age: '45', id: '2'},
//   {name: 'John Doe', age: '57', id: '3'},
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    publisher: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        // return _.find(authors, {id: parent.authorId})
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return _.filter(books, {authorId: parent.id})
        return Book.find({authorId: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from db
        // return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from db
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        // return authors;
        return Author.find({});
      }
    }
  }
});


// Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        publisher: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          publisher: args.publisher,
          authorId: args.authorId
        });
        return book.save()
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(root, args) {
        let deleteItem = Book.findByIdAndRemove(args.id).exec();
        if (!deleteItem) {
          throw new Error('Error')
        }
        return deleteItem;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

