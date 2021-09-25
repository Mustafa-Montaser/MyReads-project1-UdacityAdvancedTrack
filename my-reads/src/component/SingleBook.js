import React, { Component } from "react";

export default class SingleBook extends Component {
    // check which book button is clicked and check book shelf to be highlighted
    openSelect = (btnId) => {
        let newShelf = "";
        // check if book which found in search reasult is exist in any shelf or not
        if("isBookExist" in this.props) newShelf = this.props.isBookExist(this.props.book);
        document.getElementById(btnId).classList.toggle("btn-clk");
        const unOrderListId = btnId.slice(0, btnId.indexOf("--btn")) + "--ul";
        Array.from(document.getElementsByTagName("ul")).map(ul => ul.id === unOrderListId ? ul.classList.toggle("select-show") : ul.classList.remove("select-show"));
        const listArr = Array.from(document.getElementById(unOrderListId).children);
        if(newShelf === "" && this.props.book.shelf === undefined) {
            listArr[listArr.length - 1].classList.add("selected-item");
        } else {
            for(let i = 0; i < listArr.length - 1; i++) {
                if(this.props.book.shelf === listArr[i].getAttribute("shelf-name")) {
                    listArr[i].classList.add("selected-item");
                    break;
                }
            }
        }
    };

    // getting book and new shelf and old shelf to change book shelf
    listHandleClick = async (e) => {
        const liId = e.target.id;
        const btnId = liId.slice(0, liId.indexOf("--li")) + "--btn";
        document.getElementById(btnId).classList.toggle("btn-clk");
        const unOrderListId = btnId.slice(0, btnId.indexOf("--btn")) + "--ul";
        document.getElementById(unOrderListId).classList.toggle("select-show");
        Array.from(document.getElementById(unOrderListId).children).map(listChild => {
            listChild.classList.remove("selected-item");
            return 0;
        });
        if("addBook" in this.props) document.getElementById(this.props.addBook).style.display = "flex";
        await this.props.changeBookShelf(this.props.book, e.target.getAttribute("shelf-name"), this.props.book.shelf === undefined ? "none" : this.props.book.shelf);
        if("addBook" in this.props) {
            document.getElementById(this.props.addBook).style.color= "#5cb85c";
            document.getElementById(this.props.addBook).innerText = "Book is added";
            const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
            await wait(1000);
            document.getElementById(this.props.addBook).style.color= "#f0ad4e";
            document.getElementById(this.props.addBook).innerText = "Adding book ...";
            document.getElementById(this.props.addBook).style.display = "none";
        }
    };

    render() {
        return (
            <div className="grid-item" id={this.props.book.id}>
                <img
                    src={"imageLinks" in this.props.book && "thumbnail" in this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""}
                    alt={"title" in this.props.book ? this.props.book.title : ""}
                />
                <span className="title">{"title" in this.props.book ? this.props.book.title : ""}</span>
                {"authors" in this.props.book ? this.props.book.authors.map((author) => (<span className="author" key={author}>{author}</span>)) : "" }
                <button className="btn" id={`${this.props.book.id}--btn`} onClick={(e) => this.openSelect(e.target.id)}>&#x27A4;</button>
                <ul className="select-container" id={`${this.props.book.id}--ul`}>
                    <li className="select-item">Move To</li>
                    <li className="select-item" id={`${this.props.book.id}--li`} shelf-name="currentlyReading" onClick={(e) => this.listHandleClick(e)} >Currently Reading</li>
                    <li className="select-item" id={`${this.props.book.id}--li`} shelf-name="read" onClick={(e) => this.listHandleClick(e)} >Read</li>
                    <li className="select-item" id={`${this.props.book.id}--li`} shelf-name="wantToRead" onClick={(e) => this.listHandleClick(e)}>Want To Read</li>
                    <li className="select-item" id={`${this.props.book.id}--li`} shelf-name="none" onClick={(e) => this.listHandleClick(e)} >None</li>
                </ul>
            </div>
        );
    }
}
