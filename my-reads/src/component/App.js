import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "./Header";
import ShelvesBooks from "./ShelvesBooks";
import Search from "./Search";
import * as bookAPI from "../booksAPI";

export default class App extends Component {
    state = {
        shelvesBooks: {currentlyReading: [], read: [], wantToRead: []},
        isLoading: true,
        booksQuery: [],
    };
    
    // getting book data at first time
    componentDidMount = async () => {
        this.setState({ isLoading: true });
        let shelvesBooks = this.state.shelvesBooks;
        let gettingBooks = await bookAPI.getAll();
        const shelvesNames = Object.keys(shelvesBooks);
        gettingBooks.map(book => shelvesNames.map(shelf => book.shelf === shelf ? shelvesBooks[shelf].push(book) : null));
        this.setState({ shelvesBooks, isLoading: false });
    };

    // change book shelf or remove it if none is selected
    changeBookShelf = async (book, newShelf, oldShelf) => {
        this.setState({ isLoading: true });
        let shelvesBooks = this.state.shelvesBooks;
        let newShelves = await bookAPI.update(book, newShelf); 
        if(newShelves) {
            if(oldShelf !== "none") shelvesBooks[oldShelf].splice(shelvesBooks[oldShelf].indexOf(book), 1);
            if(newShelf !== "none") {
                book.shelf = newShelf;
                shelvesBooks[newShelf].push(book);
            }
            this.setState({ shelvesBooks, isLoading: false });
        }
    };

    // render the result of query
    queryResult = (booksQueryResult) => this.setState({ booksQuery: booksQueryResult });
    
    // check if book is exist in any shelf or not 
    isBookExist = (book) => {
        let shelvesBooks = this.state.shelvesBooks;
        let books = [];
        for(const shelf in shelvesBooks) books = [...books, ...shelvesBooks[shelf]]; 
        let newShelf = "";
        for (let i = 0; i < books.length; i++) {
            if (books[i].id === book.id) {
                const booksQuery = this.state.booksQuery;
                booksQuery[booksQuery.indexOf(book)].shelf = books[i].shelf;
                this.setState({ booksQuery: booksQuery });
                newShelf = books[i].shelf;
                break;
            }
        }
        return newShelf;
    };

    render() {
        return (
            <div className="container">
                <Route path="/" exact component={Header} />
                <Route 
                    path="/" exact 
                    render={() => (
                        <ShelvesBooks 
                            shelves={this.state.shelvesBooks}
                            isLoading={this.state.isLoading} 
                            changeBookShelf={this.changeBookShelf} 
                        />
                    )} 
                />
                <Route
                    path="/search"
                    render={() => (
                        <Search 
                            booksQuery={this.state.booksQuery} 
                            queryResult={this.queryResult} 
                            changeBookShelf={this.changeBookShelf}
                            isBookExist={this.isBookExist}
                        />
                    )}
                />
            </div>
        );
    }
}
