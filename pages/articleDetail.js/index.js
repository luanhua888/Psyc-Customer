import Script from "next/script";
import Image from "next/image";
import profileAvatar from "../../public/icon_profile.png";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { videoCallService } from "../../services/VideoCallService";
import noMic from "../../public/photos/icon/microphone.png";
import mic from "../../public/photos/icon/mic.png";
import noCam from "../../public/photos/icon/no-video.png";
import camera from "../../public/photos/icon/video-camera.png";
import connect from "../../public/photos/icon/link.png";

import astroRoundedImg from "../../public/photos/astro-rounded.png";
import { articleService } from "../../services/ArticleService";
import DOMPurify from "dompurify";
import Paragraph from "antd/lib/typography/Paragraph";


export default function ArticleDetail() {
  const router = useRouter();

  let { articleId  } = router.query;

  let props = {
    articleId ,
  };

  // console.log("roomCall1", roomCall);
  useEffect(() => {
    document.getElementById("noCam").style.display = "none";
    document.getElementById("noMic").style.display = "none";
  }, []);


  console.log("articleId", articleId);
  const [article, setArticleId] = useState({});

  const [room, setRoom] = useState([]);
  const [token, setToken] = useState([]);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await articleService.detailArticle(props.articleId);
        if (data.statusCode == 200) {
          setArticleId(data.data[0]);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
     
        const data = await videoCallService.getRoomAgrora(props.roomCall);

        if (data.statusCode == 200) {

          if(data.data[0] != undefined){
          setRoom(data.data[0]);
          setToken(data.data[0].token);
          setChannel(data.data[0].chanelName);
          console.log("channelName", data.data[0].chanelName);
          console.log("token", data.data[0].token);
          }else{
            router.push("/chat");
          }
        }
     
    })();
  }, []);

  const config = {
    mode: "rtc",
    codec: "vp8",
  };

  const options = {
    appId: "249ed20e39a7470f9e7ed035b2fa4022",
  };

  const remote = "#remote";

  const rtc = {
    client: null,
    localVideoTrack: null,
    localAudioTrack: null,
  };

  const join = async () => {
    rtc.client = AgoraRTC.createClient(config);
    await rtc.client.join(options.appId, channel, token || null);
      rtc.client.publish(rtc.localVideoTrack);
      rtc.client.publish(rtc.localAudioTrack);
   
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







  const startVideo = async () => {
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // rtc.client.publish(rtc.localVideoTrack);
    
    rtc.localVideoTrack.play("local");
  };

  const startAudio = async () => {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // rtc.client.publish(rtc.localAudioTrack);
    rtc.localAudioTrack.play();
  };

  const stopVideo = () => {
    rtc.localVideoTrack.stop();
    
    // rtc.client.unpublish(rtc.localVideoTrack);
  };

  const stopAudio = () => {
    rtc.localAudioTrack.stop();
    // rtc.client.unpublish(rtc.localAudioTrack);
   

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
            <section
              className="items-center m-auto
            "
            >
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
                onClick={() => {
                  startAudio();
                  document.getElementById("mic").style.display = "none";
                  document.getElementById("noMic").style.display = onload;
                }}
                alt="Picture of the author"
                width={45}
                height={45}
                className="items-center  cursor-pointer"
              />
              <Image
                src={noMic}
                id="noMic"
                onClick={() => {
                  stopAudio();
                  document.getElementById("noMic").style.display = "none";
                  document.getElementById("mic").style.display = onload;
                }}
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
