import React from 'react';

const WebcamStream = (props) => (
  <div className="webcam">
    <video id="webcam">
    </video>
    <div className="button">
      <button id="captureButton" onClick={props.handleCaptureClick}><span id="flash-icon">📸</span></button>
    </div>
  </div>
);

export default WebcamStream;
