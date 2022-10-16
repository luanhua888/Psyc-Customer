import Script from "next/script";
import Image from "next/image";
import profileAvatar from "../../public/icon_profile.png";
import mic from "../../public/photos/icon/mic.png";
import camera from "../../public/photos/icon/video-camera.png";
import noMic from "../../public/photos/icon/microphone.png";
import noCam from "../../public/photos/icon/no-video.png";
import connect from "../../public/photos/icon/link.png";

import { useEffect, useRef, useState } from "react";


export default function videocall() {
  
  useEffect(() => {
    document.getElementById("noCam").style.display = "none";
    document.getElementById("noMic").style.display = "none";
  }, []);


  const config = {
    mode: "rtc",
    codec: "vp8",
  };

  const options = {
    appId: "249ed20e39a7470f9e7ed035b2fa4022",
    channel: "SLOT_67",
    token:
      "006249ed20e39a7470f9e7ed035b2fa4022IAB+SoIah5RwWhOPjPrW8XBj9qI1GRsGvvp12d3Q9rMubNnsRj8h39v0KAAL9DwEKVxMYwUAAQAAAAAAAgAAAAAAAwAAAAAABAAAAAAA6AMAAAAA",
    
    };

  const remote = "#remote";

  const rtc = {
    client: null,
    localVideoTrack: null,
    localAudioTrack: null,
    
  };

  const join = async () => {
    rtc.client = AgoraRTC.createClient(config);
    await rtc.client.join(
      options.appId,
      options.channel,
      options.token || null
    );

  };

  async function startOneToOneVideoCall() {
    join().then(() => {
      rtc.client.on("user-published", async (user, mediaType) => {
        if (rtc.client._users.length > 2) {
          rtc.client.leave();
          remote.html(
            '<div class="roomMessage"><p class="full">Please Wait Room is Full</p></div>'
          );
          return;
        }

        await rtc.client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play("remote");
        }
        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });
    });
  }

  const leave = () => {
    rtc.client.leave();
  };

  const startVideo = async () => {
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // rtc.client.publish(rtc.localVideoTrack);
    // rtc.client.publish([rtc.localVideoTrack]);
    rtc.localVideoTrack.play("local");

  };

  const startAudio = async () => {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // rtc.client.publish(rtc.localAudioTrack);
    // rtc.client.publish([rtc.localAudioTrack]);
    rtc.localAudioTrack.play();
  };

  const stopVideo = () => {
    rtc.localVideoTrack.stop();
    // rtc.client.unpublish(rtc.localVideoTrack);
  };

  const stopAudio = () => {
    rtc.localAudioTrack.stop();
    rtc.client.unpublish(rtc.localAudioTrack);
  };

  return (
    <div>
      <div className="m-auto   rounded shadow-lg  max-w-[98%] max-h-[100%] bg-white   p-2 place-items-center mt-[4%] ">
        <div className="">
          <div className="d-flex flex">
            <div
              id="local"
              class="d-flex p-1 justify-content-center rounded  float-right local shadow-lg w-[100%] h-[500px] mt-0.5 mr-1 bg-black"
            ></div>
            <div
              id="remote"
              class="d-flex m-auto p-1 justify-content-center rounded  remote shadow-lg w-[100%] h-[500px] bg-slate-500 place-items-center "
            ></div>
          </div>
          <div className=" d-flex flex items-center  ">
            <section className="items-center m-auto
            ">
           
              <Image
                src={camera}
                id="camera"
                onClick={() => {
                  startVideo();
                
                document.getElementById("camera").style.display = "none";
                document.getElementById("noCam").style.display = onload;
                }}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center p-5 cursor-pointer"
              />
              <Image
                src={noCam}
                id="noCam"
                onClick={() => {
                  stopVideo();
                  document.getElementById("noCam").style.display = "none";
                document.getElementById("camera").style.display = onload;
                }}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center  cursor-pointer"
                
              />
              <Image
                src={mic}
                id="mic"
                onClick={startAudio}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center  cursor-pointer"
              />
              <Image
                src={noMic}
                id="noMic"
                onClick={stopAudio}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center  cursor-pointer"
              />
             
              <Image
                src={connect}
                id="connect"
                onClick={startOneToOneVideoCall}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center cursor-pointer "
              />
            </section>
          </div>
        </div>
      </div>
      <Script src="https://cdn.agora.io/sdk/release/AgoraRTC_N-4.2.1.js"></Script>

      <Script src="../../pages/videoCall/script.js"></Script>
    </div>
  );
}
