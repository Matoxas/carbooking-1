import React from 'react';

const carImage = (props) => {
    return(
        <div>
            {props.images}
            <img className="rounded" src={`/${props.image.images[0]}`} alt=""/>
        </div>
    )
};

export default carImage;