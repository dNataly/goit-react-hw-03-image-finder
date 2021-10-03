import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";
import s from "./ImageGallery.module.css";

export class ImageGallery extends Component {
  state = {
    imageIndex: null,
    showModal: false,
  };

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
  };

  handleClick(index) {
    this.setState({ imageIndex: index, showModal: true });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.props.items.map((item, index) => (
            <ImageGalleryItem
              key={index}
              item={item}
              onClick={() => {
                this.handleClick(index);
              }}
            />
          ))}
        </ul>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.items[this.state.imageIndex].largeImageURL} alt={this.props.items[this.state.imageIndex].tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
