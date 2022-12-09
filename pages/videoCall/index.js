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
import connect from "../../public/photos/icon/connect.png";
import disconnect from "../../public/photos/icon/logout.png";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function VideoCall() {
  const router = useRouter();

  let { roomCall } = router.query;

  let props = {
    roomCall,
  };

  console.log("roomCall1", roomCall);
  useEffect(() => {
    document.getElementById("noCam").style.display = "none";
    document.getElementById("noMic").style.display = "none";
  }, []);

  const [room, setRoom] = useState([]);
  const [token, setToken] = useState([]);
  const [channel, setChannel] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await videoCallService.getRoomAgrora(props.roomCall);

      if (data.statusCode == 200) {
        if (data.data[0] != undefined) {
          setRoom(data.data[0]);
          setToken(data.data[0].token);
          setChannel(data.data[0].chanelName);
          console.log("channelName", data.data[0].chanelName);
          console.log("token", data.data[0].token);
        } else {
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

  const handleConfirmExit = () => {
    setOpenDialog(true);
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
  const [loadConnect, setLoadConnect] = useState(true);
  const [loadMic, setLoadMic] = useState(true);
  const [loadCam, setLoadCam] = useState(true);

  const [now1, setNow] = useState(new Date());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNow(new Date());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      {/* <div className="text-3xl font-bold text-[#ff7010] m-4 flex justify-center">{now1.toISOString().slice(11, 19)}</div> */}

      <div className="m-auto   rounded shadow-lg  max-w-[98%] max-h-[100%] bg-white   p-2 place-items-center mt-[4%] ">
        <div className="">
          <div
            className="d-flex flex 
         
          "
          >
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
                  // ngắt sử  dụng camera của web

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

              {loadConnect ? (
                <Image
                  src={connect}
                  id="connect"
                  onClick={() => {
                    startOneToOneVideoCall();
                    setLoadConnect(false);
                  }}
                  alt="Picture of the author"
                  width={45}
                  height={45}
                  className="items-center cursor-pointer "
                />
              ) : (
                <Image
                  src={disconnect}
                  id="disconnect"
                  onClick={() => {
                    handleConfirmExit();
                  }}
                  alt="Picture of the author"
                  width={40}
                  height={40}
                  className="items-center cursor-pointer mt-2"
                />
              )}

              {/* hiển thị dialog */}
              <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="w-[100%] h-[100%] "
              >
                {/* <DialogTitle id="alert-dialog-title">
                  {"Bạn có muốn thoát không?"}
                </DialogTitle> */}
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description "
                    className="text-xl text-black font-bold"
                  >
                    Bạn có muốn thoát không?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenDialog(false)}
                    className="text-[#ff7010] hover:bg-[#455f71]"
                  >
                    Không
                  </Button>
                  <Button
                    onClick={() =>
                      //reset lại trang web
                      window.location.reload(router.push("/"))
                    }
                    className="text-[#ff7010] hover:bg-[#455f71]"
                    autoFocus
                  >
                    Có
                  </Button>
                </DialogActions>
              </Dialog>
            </section>
          </div>
        </div>
      </div>
      <Script src="https://cdn.agora.io/sdk/release/AgoraRTC_N-4.2.1.js"></Script>
      <Script src="../../pages/videoCall/script.js"></Script>
    </div>
  );
}
