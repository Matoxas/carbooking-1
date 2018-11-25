import React from 'react';

const carImage = (props) => {
    return(
        <div className="figure">
            {props.images}
            <img className="product-image" src={`/${props.image.images[0]}`} alt=""/>
        </div>
    )
};

export default carImage;