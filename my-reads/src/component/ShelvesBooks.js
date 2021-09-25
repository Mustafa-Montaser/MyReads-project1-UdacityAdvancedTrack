import React, { Component } from "react";
import { Link } from "react-router-dom";

import SingleShelf from "./SingleShelf";

export default class ShelvesBooks extends Component {
    // display or not loading page
    componentDidUpdate = () => {
        if (this.props.isLoading) {
            document.getElementById("loadChange").style.display = "flex";
        } else {
            document.getElementById("loadChange").style.display = "none";
        }
    };

    render() {
        return (
            <>
                <div className="load" id="loadChange">Loading</div>
                <div className="shelves">
                    {Object.keys(this.props.shelves).map(shelf => (
                        <SingleShelf
                            key={shelf}
                            shelf={this.props.shelves[shelf]}
                            shelfName={shelf}
                            changeBookShelf={this.props.changeBookShelf}
                        />
                    ))}
                </div>
                <Link className="search-btn" to="/search">+</Link>
            </>
        );
    }
}
