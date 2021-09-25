import React, { Component } from "react";
import { Link } from "react-router-dom";

import { search } from "../booksAPI";
import SingleBook from "./SingleBook";

export default class Search extends Component {
    // getting query result depend on user input
    handleChange = async (e) => {
        const query = e.target.value;
        if (query === "") this.props.queryResult([]);
        else {
            const queryBooksResult = await search(query);
            this.props.queryResult(queryBooksResult);
        }
    };

    render() {
        return (
            <>
                <div className="search-container">
                    <Link className="back-btn" to="/">&#10140;</Link>
                    <input id="srch" type="text" placeholder="Search by title or auther" onKeyUp={(e) => this.handleChange(e)} />
                </div>
                {this.props.booksQuery.length === 0 || document.getElementById("srch") == null ? (
                    <div className="loading">No query result</div>
                ) : (
                    <div className="grid-container">
                        {Array.isArray(this.props.booksQuery) ? (
                            this.props.booksQuery.map((book) => (
                                <SingleBook
                                    key={book.id}
                                    book={book}
                                    changeBookShelf={this.props.changeBookShelf}
                                    isBookExist={this.props.isBookExist}
                                    addBook="addBook"
                                />
                            ))
                        ) : (
                            <div className="loading">No query result</div>
                        )}
                    </div>
                )}
                <div className="load" id="addBook">Adding Book ... </div>
            </>
        );
    }
}
