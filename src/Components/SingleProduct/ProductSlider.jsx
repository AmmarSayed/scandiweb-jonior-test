import React, { Component } from "react";
import * as styles from "./ProductSlider.module.css";

export class ProductSlider extends Component {
  state = { imgIndex: 0 };

  selectImage = (num) => {
    this.setState({ imgIndex: num });
  };

  render() {
    const { images } = this.props;
    return (
      <section className={styles.slider}>
        <div className={styles.tiles}>
          {images.slice(0, 6).map((image, i) => (
            <div
              key={i}
              className={styles.tileImgContainer}
              onClick={() => {
                this.selectImage(i);
              }}
            >
              <img src={image} className={styles.tileImage} />
            </div>
          ))}
        </div>
        <div className={styles.imgContainer}>
          <img src={images[this.state.imgIndex]} />
        </div>
      </section>
    );
  }
}

export default ProductSlider;
