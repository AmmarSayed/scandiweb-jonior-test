import React, { Component } from "react";
import { ChevLeftIcon, ChevRightIcon } from "../../icons/icons";
import * as styles from "./CartImageSlider.module.css";

export default class CartImageSlider extends Component {
  state = { imgIndex: 0 };

  moveLef = () => {
    if (this.state.imgIndex === 0) this.setState({ imgIndex: this.props.images.length - 1 });
    else this.setState({ imgIndex: (this.state.imgIndex -= 1) });
  };

  moveRight = () => {
    const lastIndex = this.props.images.length - 1;
    if (this.state.imgIndex === lastIndex) this.setState({ imgIndex: 0 });
    else this.setState({ imgIndex: (this.state.imgIndex += 1) });
  };

  render() {
    const { images } = this.props;

    return (
      <div className={styles.slider}>
        <div className={styles.img_container}>
          <img src={images[this.state.imgIndex]} alt="" className={styles.img} />
        </div>
        <div className={styles.slider_actions}>
          <button onClick={this.moveLef} className={styles.slider_btn}>
            <ChevLeftIcon />
          </button>
          <button onClick={this.moveRight} className={styles.slider_btn}>
            <ChevRightIcon />
          </button>
        </div>
      </div>
    );
  }
}
