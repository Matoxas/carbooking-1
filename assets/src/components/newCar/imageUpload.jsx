import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./NewCar.css";
const dropzoneRef = React.createRef();
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const SortableItem = SortableElement(({ value }) => (
  <li className="imageWrapper">
    <img src={value.preview} alt="image preview" style={img} />
  </li>
));

const SortableList = SortableContainer(({ items, className, axis = "x" }) => {
  return (
    <ul className={className}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      errors: []
    };
  }

  // componentWillUnmount() {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   const { images } = this.state;
  //   if (images[0].preview != -1) {
  //     for (let i = images.length; i >= 0; i--) {
  //       const image = images[i];
  //       URL.revokeObjectURL(image.preview);
  //     }
  //   }
  // }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const files = this.checkImages(acceptedFiles);
      console.log(files);
      this.setState({
        files: files.map(file => ({
          ...file,
          preview: URL.createObjectURL(file)
        }))
      });
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
    }
  };

  checkImages = images => {
    if (images.length > 5) {
      images = images.slice(0, 5);
      return images;
    }
    return images;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      files: arrayMove(this.state.files, oldIndex, newIndex)
    });
  };

  render() {
    const { files } = this.state;

    if (files && files.length > 0) {
      return (
        <SortableList
          axis={"x"}
          className={"imageUpload"}
          items={this.state.files}
          onSortEnd={this.onSortEnd}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="imageUpload">
          <Dropzone
            disableClick
            className="dropzone"
            accept="image/jpeg, image/png, image/gif, image/bmp"
            ref={dropzoneRef}
            onDrop={this.onDrop}
          >
            <div className="flex flex-center flex-column">
              <h4>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="svg-inline--fa fa-cloud-upload fa-w-20 fa-7x"
                >
                  <path
                    fill="#999"
                    d="M312.5 168.5c-4.7-4.7-12.3-4.7-17 0l-98.3 98.3c-4.7 4.7-4.7 12.3 0 17l5.7 5.7c4.7 4.7 12.3 4.7 17 0l68.2-68.2V372c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V221.3l68.2 68.2c4.7 4.7 12.3 4.7 17 0l5.7-5.7c4.7-4.7 4.7-12.3 0-17l-98.5-98.3zm259.2 70.3c2.8-9.9 4.3-20.2 4.3-30.8 0-61.9-50.1-112-112-112-16.7 0-32.9 3.6-48 10.8-31.6-45-84.3-74.8-144-74.8-94.4 0-171.7 74.5-175.8 168.2C39.2 220.2 0 274.3 0 336c0 79.6 64.4 144 144 144h368c70.7 0 128-57.2 128-128 0-47-25.8-90.8-68.3-113.2zM512 448H144c-61.9 0-112-50.1-112-112 0-56.8 42.2-103.7 97-111-.7-5.6-1-11.3-1-17 0-79.5 64.5-144 144-144 60.3 0 111.9 37 133.4 89.6C420 137.9 440.8 128 464 128c44.2 0 80 35.8 80 80 0 18.5-6.3 35.6-16.9 49.2C573 264.4 608 304.1 608 352c0 53-43 96-96 96z"
                    className=""
                  />
                </svg>
              </h4>
              <h5>tempk nuotraukas čia, arba</h5>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  dropzoneRef.current.open();
                }}
              >
                pasirink iš kompiuterio
              </button>
            </div>
          </Dropzone>
        </div>
        <span className="invalid-feedback">{this.props.errors}</span>
      </React.Fragment>
    );
  }
}

export default ImageUpload;
