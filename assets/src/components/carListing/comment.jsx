import React, {Component} from 'react';
import './carListing.css';

class comment extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            commentsPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const {currentPage, commentsPerPage} = this.state;

        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        const currentComments = this.props.comments.slice(indexOfFirstComment, indexOfLastComment);

        const renderComments = currentComments.map(comment => {
            return (<div className="comment">
                    <div className="comment-column--left">
                        <i className="far fa-user-circle fa-3x"/>
                    </div>
                    <div className="comment-column--right">
                        <p>
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

        const renderPageNumbers = pageNumbers.map(number => {
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
                <div className="page-numbers"> //NOT finished page design
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
}

export default comment;