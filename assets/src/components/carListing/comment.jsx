import React, { Component } from 'react';
import './carListing.css';

class comment extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            commentsPerPage: 5,
            showPageNumbers: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { currentPage, commentsPerPage } = this.state;
        let showPageNumbers = "";

        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        const currentComments = this.props.comments.slice(indexOfFirstComment, indexOfLastComment);

        const renderComments = currentComments.map(comment => {
            return (<div className="comment clearfix">
                <div className="comment-column--left">
                    <i className="far fa-user-circle fa-2x" />
                </div>
                <div className="comment-column--right">
                    <p className="mb-0">
                        <span className="comment--color-primary">{comment.name}</span>
                        <span className="comment--color-grey">: {comment.createdAt.slice(0, 16)}</span>
                    </p>
                    <p>
                        {comment.comment}
                    </p>
                </div>
            </div>
            );
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.comments.length / commentsPerPage); i++) {
            pageNumbers.push(i);
        }

        if (this.props.comments.length / commentsPerPage <= 1) {
            showPageNumbers = false;
        } else {
            showPageNumbers = true;
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === this.state.currentPage) {
                return (
                    <a
                        className="active page-numbers-li"
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </a>
                );
            }
            return (
                <a
                    className="page-numbers-li"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </a>
            );
        });

        return (
            <div>
                {renderComments}
                <div className="pagination page-numbers">
                    {showPageNumbers ? (
                        renderPageNumbers
                    ) : null}
                </div>
            </div>
        );
    }
}

export default comment;