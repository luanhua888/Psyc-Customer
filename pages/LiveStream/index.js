import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { videoCallService } from "../../services/VideoCallService";
import noCam from "../../public/photos/icon/no-video.png";

export default function LiveStream_r() {
  const router = useRouter();

  let { roomLive } = router.query;

  let props = {
    roomLive,
  };

  console.log("props", roomLive);

  useEffect(() => {
    document.getElementById("leave-btn").style.display = "none";
  }, []);

  useEffect(() => {
    (async () => {
      const data = await videoCallService.getRoomAgrora(props.roomLive);

      if (data.statusCode == 200) {
        if (data.data[0] != undefined) {
          setRoom(data.data[0]);
          setToken(data.data[0].token);
          setChannel(data.data[0].chanelName);
          console.log("channelName", data.data[0].chanelName);
          console.log("token", data.data[0].token);
        } else {
          router.push("/RoomLive");
        }
      }
    })();
  }, []);

  const [room, setRoom] = useState([]);
  const [token, setToken] = useState([]);
  const [channel, setChannel] = useState([]);

  // let joinStream = async () => {

  //   await AgoraRTC.createMicrophoneAndCameraTracks(
  //     {},
  //     {
  //       encoderConfig: {
  //         width: { min: 640, ideal: 1920, max: 1920 },
  //         height: { min: 480, ideal: 1080, max: 1080 },
  //       },
  //     }
  //   );

  // };

  useEffect(() => {}, []);

  //======================================================================================================================================================

  const config = {
    mode: "rtc",
    codec: "vp8",
  };

  const options = {
    appId: "249ed20e39a7470f9e7ed035b2fa4022",
  };

  const join = async () => {
    rtc.client = AgoraRTC.createClient(config);
    await rtc.client.join(options.appId, channel, token || null);
  };

  const stream__container = "#stream__container";

  const rtc = {
    client: null,
    localVideoTrack: null,
    localAudioTrack: null,
  };

  async function startOneToOneVideoCall() {
    join().then(() => {
      document.getElementById("join-btn").style.display = "none";
      document.getElementById("leave-btn").style.display = onload;

      rtc.client.on("user-published", async (user, mediaType) => {
        if (rtc.client._users.length > 2) {
          rtc.client.leave();
          stream__container.html(
            '<div class="roomMessage"><p class="full">Please Wait Room is Full</p></div>'
          );
          return;
        }

        await rtc.client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play("stream__container");
        }
        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });
    });
  }

  return (
    <>
      <div id="room__container" className="relative ">
        <section
          id="members__container"
          className="max-w-[250px] bg-black overflow-y-auto w-[90%] fixed   h-full"
        >
          <div
            id="members__header"
            className="flex justify-around items-center fixed bg-gray-500 w-[218px]"
          >
            <p>Participants</p>
            <strong id="members__count" className="bg-slate-900">
              0
            </strong>
          </div>

          <div id="member__list" className="flex flex-col gap-1 pb-2"></div>
        </section>

        <section id="stream__container" className=" relative   ">
          <div id="stream__box" className="bg-gray-400  hidden"></div>

          <div
            id="streams__container"
            className="flex flex-wrap gap-2 justify-center  "
          ></div>

          <div
            class="stream__actions"
            className="fixed bottom-1 left-[50%] p-4 -translate-x-1 hidden"
          >
            <button id="camera-btn" class="active absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
              </svg>
            </button>
            <button id="mic-btn" class="active" className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
              </svg>
            </button>
            <button id="screen-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
              </svg>
            </button>
          </div>

          <button
            width="24"
            height="24"
            id="join-btn"
            className="absolute"
            onClick={startOneToOneVideoCall}
          >
            Tham Gia
          </button>
          <button id="leave-btn" className="bg-gray-500">
            <Image
              src={noCam}
              id="noCam"
              onClick={() => {
                router.push("/RoomLive");
                alert("Bạn có muốn thoát phòng live không?");
              }}
              alt="Picture of the author"
              width={24}
              height={24}
              className="items-center  cursor-pointer"
            />
          </button>
        </section>

        <section
          id="messages__container"
          className="h-[80%] bg-slate-900 right-0  fixed overflow-y-auto"
        >
          <div id="messages"></div>

          <form id="message__form">
            <input
              type="text"
              name="message"
              placeholder="Send a message...."
            />
          </form>
        </section>
      </div>

      <Script src="https://cdn.agora.io/sdk/release/AgoraRTC_N-4.2.1.js"></Script>
    </>
  );
}
