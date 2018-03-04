import React from 'react';

const WebcamStream = (props) => (
  <div className="webcam">
    <video accept="image/*" capture="camera" autoPlay="true" id="webcam" playsInline="true">
    </video>
    <div className="button">
      <button id="captureButton" onClick={props.handleCaptureClick}><span id="flash-icon">📸</span></button>
    </div>
  </div>
);

export default WebcamStream;
