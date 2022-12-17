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

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = req.cookies;
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}

export default function VideoCall() {
  const router = useRouter();

  let { roomCall } = router.query;

  let props = {
    roomCall,
  };

  console.log("roomCall1", roomCall);
  // useEffect(() => {
  //   document.getElementById("noCam").style.display = "none";
  //   document.getElementById("noMic").style.display = "none";
  // }, []);

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

  const publicVideo = async () => {};

  const join = async () => {
    rtc.client = AgoraRTC.createClient(config);
    await rtc.client.join(options.appId, channel, token);
    // rtc.client.publish(rtc.localVideoTrack);
    // rtc.client.publish(rtc.localAudioTrack);
    startVideo();

    setPublishVideo(true);
  };
  const leave = async () => {
  
  };

  const handleConfirmExit = () => {
    setOpenDialog(true);
  };

  const [publishVideo, setPublishVideo] = useState(false);

  async function startOneToOneVideoCall() {
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    join().then(() => {
      rtc.client.on("user-published", async (user, mediaType) => {
        if (rtc.client._users.length > 2) {
          rtc.client.leave();
          remote.html(
            '<div class="roomMessage"><p class="full">Please Wait Room is Full</p></div>'
          );
          return;
        }

        rtc.client.publish(rtc.localVideoTrack);
        rtc.client.publish(rtc.localAudioTrack);

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
    rtc.localVideoTrack.play("local");
  };

  const startAudio = async () => {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // rtc.client.publish(rtc.localAudioTrack);
    rtc.localAudioTrack.play();
  };

  const stopVideo = async () => {
    if (publishVideo == true) {
      rtc.localVideoTrack.stop();
    } else {
      AgoraRTC.rtc.client.unpublish(rtc.localVideoTrack);
      setPublishVideo(true);
      rtc.localVideoTrack.play();
    }
  };

  const stopAudio = () => {
    // xóa client audio track hiện tại
    router.push("/chat");
  };
  const [loadConnect, setLoadConnect] = useState(true);
  const [loadMic, setLoadMic] = useState(true);
  const [loadCam, setLoadCam] = useState(true);

  const [now1, setNow] = useState(
    // lấy thời gian hiện tại việt nam
    new Date(new Date().getTime())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date(new Date().getTime()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [time, setTime] = useState(1800000);

  const countdown = () => {
    const interval = setInterval(() => {
      setTime((time) => time - 1000);
    }, 1000);
    return () => clearInterval(interval);
  };

  // tắt share screen



  return (
    <div>
      <div className="text-3xl font-bold text-[#ff7010] flex justify-end mx-5">
        {/* {now1.getHours()}:{now1.getMinutes()}:{now1.getSeconds()} */}
        {/* hiển thị phút giây của cuộc gọi */}
        Thời gian còn lại: {Math.floor(time / 60000)}:
        {Math.floor((time % 60000) / 1000)}
        {/* nếu 0 thì hiện thị 00 */}
        {Math.floor((time % 60000) / 1000) < 10 ? "0" : ""}
      </div>

      <div className="m-auto   rounded shadow-lg  max-w-[98%] max-h-[100%] bg-white   p-2 place-items-center ">
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
              {/* <Image
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
              /> */}

              {loadConnect ? (
                <div
                  onClick={() => {
                    startOneToOneVideoCall();
                    setLoadConnect(false);
                    countdown();
                  }}
                  className="flex items-center cursor-pointer justify-center px-2 bg-[#ff7010] text-white font-bold rounded-lg border border-transparent shadow-sm w-[100%] h-[50px] hover:bg-[#ff7010] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff7010] mt-2"
                >
                  {/* <Image
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
                /> */}
                  Tham Gia Cuộc Gọi
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleConfirmExit();
                  }}
                  className="flex items-center justify-center px-2 bg-[#ff7010] text-white font-bold rounded-lg border border-transparent shadow-sm w-[100%] h-[50px] hover:bg-[#ff7010] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff7010] mt-2"
                >
                  {/* <Image
                  src={disconnect}
                  id="disconnect"
                  onClick={() => {
                    handleConfirmExit();
                  }}
                  alt="Picture of the author"
                  width={40}
                  height={40}
                  className="items-center cursor-pointer mt-2"
                /> */}
                  Thoát Cuộc Gọi
                </div>
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
                    onClick={
                      () =>
                        window.location.reload()
                        // router.push("/historyBooking")
                      // tắt sử dụng camera và mic của máy

                      //reaload lại trang web và chuyển tới history
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
