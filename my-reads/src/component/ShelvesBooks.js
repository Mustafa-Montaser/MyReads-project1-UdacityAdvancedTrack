import React, { Component } from "react";
import { Link } from "react-router-dom";

import SingleShelf from "./SingleShelf";

export default class ShelvesBooks extends Component {
    // called after each render
    componentDidUpdate = () => {
        // when it's still loading, show loading, and vice versa
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
                    {Object.keys(this.props.shelves).map((shelf) => (
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
