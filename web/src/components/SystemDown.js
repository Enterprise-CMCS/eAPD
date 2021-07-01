import React from 'react';
import { connect } from 'react-redux';

const SystemDown = () =>{
  return (
    <div id="start-main-content">
      <div>The System is down.  Enjoy the video!</div>
      <br/>
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/JwZwkk7q25I" title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
      </div>
    </div>
  )
}

export default connect()(SystemDown);

export { SystemDown as plain };