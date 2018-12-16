import React, {Component} from 'react';

class carImage extends Component {
    render() {
        return (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 product-image" src={`/${this.props.image.images[0]}`} alt=""/>
                    </div>
                    {this.props.image.images.map((image, index) => {
                        if (index > 0) {
                            return (<div className="carousel-item">
                                <img className="d-block w-100 product-image" src={`/${image}`} alt=""/>
                            </div>)
                        }
                    })}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default carImage;