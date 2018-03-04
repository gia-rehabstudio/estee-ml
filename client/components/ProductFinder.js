import React, { Component } from 'react';
import WebcamStream from './WebcamStream';


class ProductFinder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      camSpecs: { audio: false, video: { width: 400, height: 400 } },
      bestMatch: null,
      bestValue: null
    }

    this.handleCaptureClick = this.handleCaptureClick.bind(this);
    this.captureImage = this.captureImage.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
    this.handleNewLetter = this.handleNewLetter.bind(this);

  }

  componentDidMount() {
    const camSpecs = this.state.camSpecs;
    const getUserMedia = (specs) => (
      new Promise((successCb, errorCb) => {
        navigator.getMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
        navigator.getMedia.call(navigator, specs, successCb, errorCb);
      })
    );

    getUserMedia(camSpecs)
      .then((stream) => {

        const video = document.getElementById('webcam');
        console.log(video);
        const vendorURL = window.URL || window.webkitURL;

        video.src = vendorURL.createObjectURL(stream);
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });

    this.clearPhoto();
  }

  captureImage() {
    const canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          video = document.getElementById('webcam'),
          photo = document.getElementById('photo'),
          { width, height } = this.state.camSpecs.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const imgData = canvas.toDataURL('image/png')
    const rawImgData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
    photo.setAttribute('src', imgData);

    predict('estee', rawImgData)
      .then(bestMatch => this.setState({
        bestMatch
    }))
  }

  clearPhoto() {
    const canvas = document.getElementById('canvas'),
          photo = document.getElementById('photo'),
          context = canvas.getContext('2d'),
          { width, height } = this.state.camSpecs.video;

    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const imgData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imgData);
  }

  handleCaptureClick(event) {
    event.preventDefault();
    setTimeout(this.captureImage, 3000);
  }

  handleNewLetter() {
    this.setState({ randomLetter: ['A', 'C', 'V'][Math.floor(Math.random() * 3)] });
  }

  render() {
    return (
      <div className="capture" >
        <p className="subtitle" >For the most accurate experience, use a solid white background.</p>
        <WebcamStream handleCaptureClick={this.handleCaptureClick} />
        <canvas id="canvas" hidden></canvas>
        <div className="output">
          <img id="photo" alt="Your photo" width="400" />
        </div>
        <h2> {this.state.bestMatch}</h2>
      </div>
    )
  }
}

function onClick(cta) {
    cta = document.getElementById("captureButton");
    video.parentNode.replaceChild(photo, video);
    return;
}

function getCamDimensions() {
// Have to calculate the dimensions for the canvas based on the videos natural dimensions, not its output dimensions.
  canvas.setAttribute('height', webcam.videoHeight);
  canvas.setAttribute('width', webcam.videoWidth);
  return;
}

// Predict Logic: Predicts the best match for the image input
const clarifaiApp = require('../clarifaiApp')

function predict(model, imgUrl) {
  return clarifaiApp.models.predict(model, imgUrl)
    .then(res => {
      const bestMatch = res.rawData.outputs[0].data.concepts[0].name;
      const bestValue = res.rawData.outputs[0].data.concepts[0].value;

      // return bestMatch

      if(bestMatch == "this is not an estee beauty product") {
          return (
              <p>try again</p>
          )
      } else if(bestMatch == "Advanced Night Micro Cleansing Foam"){
          return (
              <div className="product-description">
                  <div id="myProgress">
                      <div id="myBar" style={{ width: (bestValue * 500)  }}>
                      <span>{ Math.round(bestValue * 100)}% match</span>
                       </div>
                  </div>
                  <p className="product-description-stats">This product has a {bestValue} chance of being</p>
                  <h3 className="product-description--title">Advanced night micro cleansing foam</h3>
                  <p className="product-description--p"> This conditioning formula transforms into a soft,
                  airy foam that removes makeup and impurities, including pollution, as it purifies deep
                  within skin's surface to improve your overall healthy look. The first step to your keep looking younger
                  skincare routine.</p>
                  <a
                  className="cleansing-foam product-cta"
                  href="https://www.esteelauder.co.uk/product/681/39367/product-catalog/skincare/advanced-night/micro-cleansing-foam">
                  BUY NOW
                  </a>
                  <span> or find out more with</span>
                  <a
                  className="assistant product-cta"
                  href="https://www.esteelauder.co.uk/product/681/39367/product-catalog/skincare/advanced-night/micro-cleansing-foam">
                  GOOGLE ASSISTANT
                  </a>
              </div>
          )
      } else if(bestMatch == "Advanced Night Repair"){
          return (
              <div className="product-description">
                  <div id="myProgress">
                      <div id="myBar" style={{ width: (bestValue * 500)  }}>
                      <span>{ Math.round(bestValue * 100)}% match</span>
                       </div>
                  </div>
                  <p className="product-description-stats">This product has a {bestValue} chance of being</p>
                  <h3 className="product-description--title">Advanced Night Repair Synchronized Recovery Complex II</h3>
                  <p className="product-description--p"> Advanced Night Repair is our number one serum. It's suitable for all skin
                  types and dramatically reduces the look of all key signs of aging. And it'll help you achieve your skin goal
                  of glowing skin.<br/>
                  Apply to clean skin before you moisturize.
                  Apply a drop on each fingertip of one hand. Touch fingertips of both hands together.
                  Massage serum over face and neck, starting at the center, moving outward.
                  </p>
                  <a
                  className="night-repair product-cta"
                  href="https://www.esteelauder.co.uk/product/681/26959/product-catalog/skincare/advanced-night-repair/synchronized-recovery-complex-ii">
                  BUY NOW
                  </a>
                  <span> or find out more with</span>
                  <a
                  className="assistant product-cta"
                  href="https://www.esteelauder.co.uk/product/681/39367/product-catalog/skincare/advanced-night/micro-cleansing-foam">
                   GOOGLE ASSISTANT
                  </a>
              </div>
          )
      }
      else if(bestMatch == "human face" && bestValue > 0.6){
        return (
            <div id="myProgress">
                <div id="myBar" style={{ width: (bestValue * 500)  }}>
                    <span>{ Math.round(bestValue * 100)}% match</span>
                    <h3 className="product-description--title">What a lovely human face!</h3>
                    <p className="product-description--p">  Make it look as radiant as possible with Estée Lauder's magic. </p>
                    <a
                    className="night-repair product-cta"
                    href="https://www.esteelauder.co.uk/product/681/26959/product-catalog/skincare/advanced-night-repair/synchronized-recovery-complex-ii">
                    FIND OUT MORE
                    </a>
                    <a
                    className="assistant product-cta"
                    href="https://www.esteelauder.co.uk/product/681/39367/product-catalog/skincare/advanced-night/micro-cleansing-foam">
                     GOOGLE ASSISTANT
                    </a>
                </div>
            </div>
        )
    }
    else if(bestMatch == "human face" && bestValue < 0.6){
      return (
          <div id="myProgress">
              <div id="myBar" style={{ width: (bestValue * 500)  }}>
                  <span>{ Math.round(bestValue * 100)}% match</span>
                  <h3 className="product-description--title">You look a bit blurry today</h3>
              </div>
          </div>
      )
  }
     else {
        return bestMatch
    }
})
}

export default ProductFinder;
