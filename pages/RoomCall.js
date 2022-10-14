import React from 'react'

export default function RoomCall() {
  return (
    <>
    {/* Layout RoomCall like zalo call */}
<div class="d-flex justify-content-center w-100 p-2">

<div class="p-2 rounded shadow-lg position-relative">
    <div id="local" class="d-flex p-1 justify-content-center rounded position-absolute local shadow-lg "
    style={
        {
       width: "80px",
    height: "80px",
    backgroundColor: "#223344",
    top: "14px",
    right: "15px",
    zIndex: "1",
    
        }
    }
    ></div>
    <div id="remote" class="d-flex p-1 justify-content-center rounded remote shaow-lg "
    style={{
        width: "500px",
        height: "500px",
        backgroundColor: "#384552",
    }}  
    ></div>
    <div class="d-flex justify-content-center">
        <i class="fa fa-video-camera" id="btnCam" aria-hidden="true "></i>
        <i class="fa fa-microphone " id="btnMic" aria-hidden="true "></i><i class="fa fas fa-plug " id="btnPlug" aria-hidden="true"></i>
    </div>
</div>

</div>


    </>
  )
}
