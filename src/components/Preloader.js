import React, { Component } from 'react';
import images from '../non-db/imageList.js'; //this is just the merlo tiles

//console.log(images);

class Preloader extends Component {
  constructor(props) {
        super(props);
        this.state = {
              images: ['./img/merlo/2-0-0.jpg'],
        };
  }

  // Preload images at the earliest possible event
  componentDidMount() {
    // images.forEach((src) => {
    //   const img = document.createElement('img');
    //   img.src = src; // Assigning the img src immediately requests the image
    // });
  }

  render() { // nothing needs to render, this is just to keep tiles available

    return (
      <div>
      </div>
    );
  }
}

export default Preloader;
