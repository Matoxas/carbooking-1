import React from 'react';
import './carListing.css';

const comment = (props) => {
    return (
        <React.Fragment>
            {props.comments.map(comment => (
                <div className="comment">
                    <div className="comment-column--left">
                        <i className="far fa-user-circle fa-3x"/>
                    </div>
                    <div className="comment-column--right">
                        <p>
                            {comment.comment}
                        </p>
                        <p>
                            <span className="comment--color-primary">{comment.name}</span>
                            <span className="comment--color-grey">: {comment.createdAt.slice(0, 10)}</span>
                        </p>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
};

export default comment;