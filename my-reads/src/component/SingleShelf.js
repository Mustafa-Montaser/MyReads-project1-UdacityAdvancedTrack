import React, { Component } from "react";
import SingleBook from "./SingleBook";

export default class SingleShelf extends Component {
    render() {
        return (
            <div className="shelf">
                <h3>&emsp;
                    {   // getting the shelf name formated from shelfName of the book
                        Array.from(this.props.shelfName).map((ch, i) =>
                        i === 0 ? ch.toUpperCase() : ch === ch.toUpperCase() ? ` ${ch.toLowerCase()}` : ch)
                    }
                </h3>
                <div className="grid-container">
                    {this.props.shelf.map(book => ( 
                        <SingleBook
                            key={book.id}
                            book={book}
                            changeBookShelf={this.props.changeBookShelf}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
