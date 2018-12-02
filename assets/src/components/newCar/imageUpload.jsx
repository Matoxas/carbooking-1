import React, { Component } from "react";
import "./newCar.css";
import Image from "./image";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Uploader from "./uploader";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class ImageUpload extends Component {
  constructor(props) {
    super(props);
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const images = reorder(
      this.props.images,
      result.source.index,
      result.destination.index
    );

    this.props.setImages(images);
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.setImagesErrorMessage("");
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setImages(acceptedFiles);
    }

    if (rejectedFiles && rejectedFiles.length > 0) {
      this.props.setImagesErrorMessage(
        "įkėlėte failų netinkamu formatu. Tinkami formatai: .jpg, .png"
      );
    }
  };

  setImages = images => {
    const prevImages = this.props.images;
    const newImages = images.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    const allImages = [...prevImages, ...newImages];
    const allImagesWithIndexes = allImages.map((image, index) => ({
      file: image.file,
      preview: image.preview,
      id: index + 1
    }));
    const files = this.checkImages(allImagesWithIndexes);
    this.props.setImages(files);
  };

  checkImages = images => {
    if (images.length > 5) {
      this.props.setImagesErrorMessage(
        "maksimalus galimų įkelti nuotraukų skaičius: 5, bus naudojama 5 nuotraukos."
      );

      images = images.slice(0, 5);
      return images;
    }
    return images;
  };

  render() {
    const { images } = this.props;

    if (images && images.length > 0) {
      return (
        <React.Fragment>
          <span className="imageUpload-info">
            {images.length > 1 && "Eiliškumui pakeisti, paspausk ir tempk"}
          </span>
          <div className="imageUpload">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} className="images-wrapper">
                    {images.map((item, index) => (
                      <Image
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        item={item}
                        onDelete={this.props.onDelete}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {images.length < 5 && (
              <Uploader className="nothing" onDrop={this.onDrop}>
                <button type="button" className="btn btn-secondary">
                  +
                </button>
              </Uploader>
            )}
          </div>
          {this.props.errors.length > 0 && (
            <span className="invalid-feedback">{this.props.errors}</span>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="imageUpload">
          <Uploader className="dropzone" onDrop={this.onDrop} disableClick>
            {({ open }) => (
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
                  onClick={() => open()}
                >
                  pasirink iš kompiuterio
                </button>
              </div>
            )}
          </Uploader>
        </div>
        {this.props.errors.length > 0 && (
          <span className="invalid-feedback">{this.props.errors}</span>
        )}
      </React.Fragment>
    );
  }
}

export default ImageUpload;
