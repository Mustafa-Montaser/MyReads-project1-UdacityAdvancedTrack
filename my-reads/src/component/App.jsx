import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "./Header";
import ShelvesBooks from "./ShelvesBooks";
import Search from "./Search";
import * as bookAPI from "../booksAPI";

export default class App extends Component {
    state = {
        shelves: {
            wantToRead: [],
            currentlyReading: [],
            read: [],
        },
        isLoading: true,
        booksQuery: [],
    };

    // called when component is mounted
    componentDidMount = async () => {
        // clone shelves
        let shelves = this.state.shelves;
        // getting the books data
        let gettingBooks = await bookAPI.getAll();
        gettingBooks.map((book) => {
            // pushing element to it's shelf array
            if (book.shelf === "wantToRead") {
                shelves.wantToRead.push(book);
            } else if (book.shelf === "currentlyReading") {
                shelves.currentlyReading.push(book);
            } else if (book.shelf === "read") {
                shelves.read.push(book);
            }
            return 0;
        });
        // updating state
        this.setState({ shelves, isLoading: false });
    };

    // changeBookShelf function is responsible for updating state depending on user selection for new shelf for any book
    // called when click on any item in any selection box (SingleBook component)
    changeBookShelf = async (book, newShelf) => {
        // waiting untill getting data by show "loading" to the user
        this.setState({ isLoading: true });
        // get the new shelf for each book
        let booksIDs = await bookAPI.update(book, newShelf);
        // updating old shelves with new version
        let shelves = this.state.shelves;
        await Promise.all(
            Object.keys(booksIDs).map(async (_shelf) => {
                shelves[_shelf] = await Promise.all(
                    booksIDs[_shelf].map(async (bookId) => await bookAPI.get(bookId))
                );
                return 0;
            })
        );
        // update state
        this.setState({ shelves: shelves, isLoading: false });
    };

    // queryResult function update the state depending on the query result in search page (Search component)
    queryResult = (booksQueryResult) => {
        this.setState({ booksQuery: booksQueryResult });
    };

    // isBookExist function check if book in query result is exist in state shelves
    isBookExist = (book) => {
        let shelves = this.state.shelves;
        let allBooks = [...shelves.wantToRead, ...shelves.currentlyReading, ...shelves.read];
        let newShelf = "";
        for (let i = 0; i < allBooks.length; i++) {
            if (allBooks[i].id === book.id) {
                const booksQuery = this.state.booksQuery;
                booksQuery[booksQuery.indexOf(book)].shelf = allBooks[i].shelf;
                this.setState({ booksQuery: booksQuery });
                newShelf = allBooks[i].shelf;
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
                            shelves={this.state.shelves} 
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
