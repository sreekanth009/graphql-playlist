import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends React.Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>ALL Books by this author</p>
          <ul>
            {book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Book selected</div>;
    }
  };

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);

// function solution() {
//   const commentList = [];
//   fetch("https://www.example.com/comments?count=10")
//   .then((res) => res.json())
//   .then((data) => {
//    commentList.push(data);
//    buildLayout(commentList)
//   })
//   .catch(error => console.log(error))
// }

// function buildLayout(arr){
//   return(
//     <div class="comment-list" data-count="10">
//      arr.map((item) => {
//       return (
//        <div class="comment-item">
//         <div class="comment-item__username">{item.username}</div>
//         <div class="comment-item__message">{item.message}</div>
//        </div>
//       )
//      });
//     </div>
//   )
//  }

// function buildLayout(arr) {
//   return (
//     <div>
//       arr.map((item) => {
//         return (
//           <div>
//             <p>{item.name}</p>
//           </div>
//         )
//       })
//     </div>
//   )
// }

{
  /* <div class="comment-list" data-count="10">
    arr.map((item) => {
     return (
      <div class="comment-item">
       <div class="comment-item__username">{item.username}</div>
       <div class="comment-item__message">{item.message}</div>
      </div>
     )
    })
   </div>

<div class="comment-list" data-count="10">
  <div class="comment-item">
    <div class="comment-item__username">{item.username}</div>
    <div class="comment-item__message">{item.message}</div>
  </div>
  </div> */
}

//  function buildLayout(arr){
//   return(
//     <div class="comment-list" data-count="10">
//       arr.map((item) => {
//        <div class="comment-item">
//         <div class="comment-item__username">{item.username}</div>
//         <div class="comment-item__message">{item.message}</div>
//        </div>
//       })
//     </div>
//   )
//  }

// fetch("https://www.example.com/comments?count=10")
//   .then((res) => res.json())
//   .then((data) => {
//    commentList = data;
//    buildLayout(commentList)
//   })
//   .catch(error => console.log(error))

//   let div = document.createElement("div");
//   div.classList.add("comment-list");
//   div.setAttribute("data-count", 10);

//   let username = document.createTextNode("commentList.username");
