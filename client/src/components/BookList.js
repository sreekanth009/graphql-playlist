import React from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import { 
  getBooksQuery,
  deleteBookMutation
} from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  deleteBook(bookId) {
    this.props.deleteBookMutation({
      variables: {
        id: bookId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }


  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books..</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            id={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
            <button 
              className={'remove-book'}
              onClick={() => this.deleteBook(book.id)}
            >
              X
            </button>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id={"book-list"}>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default compose (
  graphql(getBooksQuery),
  graphql(deleteBookMutation, {name: "deleteBookMutation"})
)(BookList);
 
// export default graphql(getBooksQuery)(BookList);

