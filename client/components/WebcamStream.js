import React from 'react';

const WebcamStream = (props) => (
  <div className="webcam">
    <video id="webcam"></video>
    <div className="button">
      <button id="captureButton" onClick={props.handleCaptureClick}>✔</button>
    </div>
  </div>
);

export default WebcamStream;
