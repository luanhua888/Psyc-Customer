import Script from "next/script";
import Image from "next/image";
import profileAvatar from "../../public/icon_profile.png";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import "../../pages/videoCall/script.js";
// import "../../pages/videoCall/AgoraRTC_N-4.14.0.js";

import { useEffect, useRef, useState } from "react";

export default function videocall() {
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

  const remote = ("#remote");

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
      startVideo();
      startAudio();
      rtc.client.on("user-published", async (user, mediaType) => {
        if (rtc.client._users.length > 2) {
          rtc.client.leave();
          remote.html(
            '<div class="roomMessage"><p class="full">Please Wait Room is Full</p></div>'
          );
          return
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

  const startVideo = async () => {
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // rtc.client.publish(rtc.localVideoTrack);
    rtc.client.publish([rtc.localVideoTrack]);
    rtc.localVideoTrack.play("local");
  };

  const startAudio = async () => {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // rtc.client.publish(rtc.localAudioTrack);
    rtc.client.publish([rtc.localAudioTrack]);
    rtc.localAudioTrack.play();
  };

  const stopVideo = () => {
    rtc.localVideoTrack.stop();
    rtc.client.unpublish(rtc.localVideoTrack);
  };

  const stopAudio = () => {
    rtc.localAudioTrack.stop();
    rtc.client.unpublish(rtc.localAudioTrack);
  };

  return (
    <div>
      <div className="">
        <div className="m-auto rounded shadow-lg  min-w-[600px] h-[800px] bg-white  p-2 place-items-center px-[34%] ">
          <div
            id="remote"
            class=" p-1 justify-content-center rounded remote shadow-lg min-w-[500px] h-[500px] bg-sky-300 "
          >
            <div
              id="local"
              class=" p-1 justify-content-center  float-right rounded position-absolute local shadow-lg w-[80px] h-[80px] z-1 bg-black"
            ></div>
          </div>
          <div className="d-flex justify-content-center item-center">
            {/* <i class="fa  fa-video-camera " id="btnCam" aria-hidden="true"></i> */}
            <button
              id="btnCam"
              className="px-4 bg-orange-300"
              onClick={startVideo}
            >
              video
            </button>
            <button
              id="btnMic"
              className="px-4 bg-indigo-600"
              onClick={startAudio}
            >
              MIC
            </button>
            <button
              id="btnPlug"
              className="px-4 bg-orange-500"
              onClick={startOneToOneVideoCall}
            >
              Plug
            </button>

            {/* <Image
              src={profileAvatar}
              alt="Picture of the author"
              width={60}
              height={60}

                className="rounded-full"
                
            />
            <Image
              src={profileAvatar}
              alt="Picture of the author"
              width={60}
              height={60}
              id="btnCam"
            />
            <Image
              src={profileAvatar}
              alt="Picture of the author"
              width={60}
              height={60}
              id="btnCam"
            />
            <Image
              src={profileAvatar}
              alt="Picture of the author"
              width={60}
              height={60}
              id="btnCam"
            /> */}
          </div>
        </div>
      </div>
      <Script src="https://cdn.agora.io/sdk/release/AgoraRTC_N-4.2.1.js"></Script>

      <Script src="../../pages/videoCall/script.js"></Script>
    </div>
  );
}
