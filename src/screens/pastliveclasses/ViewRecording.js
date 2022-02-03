// import React, { useEffect, useState, useCallback, useRef } from 'react'
// import { StyleSheet, Text, View, Button } from 'react-native'
// import YoutubePlayer from "react-native-youtube-iframe";
// import {width,height} from '../../utils/config'
// import { Video, AVPlaybackStatus } from 'expo-av';
// import getVideoId from 'get-video-id';

// const ViewRecording = ({navigation, route}) => {

//     const {link} = route.params
//     // https://www.youtube.com/watch?v=HOYpAgWPTps
//     // https://classrecording.s3.ap-south-1.amazonaws.com/45.mp4

//     const l2 = link.split('/')

//     console.log(link)

//     const { id } = getVideoId(link);

//     const [playing, setPlaying] = useState(false);

//     const video = React.useRef(null);
//     const [status, setStatus] = React.useState({});

//     const onStateChange = useCallback((state) => {
//       if (state === "ended") {
//         setPlaying(false);
//         Alert.alert("video has finished playing!");
//       }
//     }, []);

//     const togglePlaying = useCallback(() => {
//       setPlaying((prev) => !prev);
//     }, []);

//     return (
//         <View style={styles.container}>
//               {l2[2]=='www.youtube.com'?<YoutubePlayer
//         height={300}
//         width={width}
//         play={playing}
//         videoId={id}
//         onChangeState={onStateChange}
//       />:
//       // }{l2[2]=='classrecording.s3.ap-south-1.amazonaws.com'||'https://classrecording.s3.amazonaws.com'&&
//        <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: link,
//         }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />}

// {/* <View style={styles.buttons}>
//         <Button
//           title={status.isPlaying ? 'Pause' : 'Play'}
//           onPress={() =>
//             status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//           }
//         />
//       </View> */}

//         </View>
//     )
// }

// export default ViewRecording

// const styles = StyleSheet.create({
//     container:{
//         backgroundColor:'white',
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     buttons: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     video: {
//       alignSelf: 'center',
//       width,
//       height: width*0.7,
//     },
//     })
import React, { useRef, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";

// import Vimeo from "react-native-vimeo";
import getVideoId from "get-video-id";
import Video from "react-native-video";
import { height, width } from "../../utils/config";
import WebView from "react-native-webview";
// import * as ScreenOrientation from "expo-screen-orientation";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import YoutubePlayer from "react-native-youtube-iframe";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PlayPastLiveClass({ navigation, route }) {
  const { link } = route.params;
  // https://www.youtube.com/watch?v=HOYpAgWPTps
  // https://classrecording.s3.ap-south-1.amazonaws.com/45.mp4
  console.log(link);
  // https://player.vimeo.com/video/662609383?byline=false&portrait=false&autoplay=false&title=false&dnt=true

  // const l2 = link.split("/");

  const { id } = getVideoId(link);

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState("contain");

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert("Oh! ", error);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  const exitFullScreen = () => {
    alert("Exit full screen");
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == "contain") setScreenType("cover");
    else setScreenType("contain");
  };

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
        // await ScreenOrientation.unlockAsync(
        //   ScreenOrientation.OrientationLock.LANDSCAPE
        // );
        console.log("Lanscape");
        // only on Android required
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        ); // only on Android required
        break;
    }
  };

  const showVideoInFullscreen = async () => {
    await videoPlayer.current.presentFullscreenPlayer();
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
    if (state === "") {
    }
  }, []);

  return (
    <View style={styles.container}>
      {link.toString().includes("vimeo") ? (
        <WebView
          source={{
            uri: `https://player.vimeo.com/video/${id}?byline=false&portrait=false&autoplay=false&title=false&dnt=true`,
          }}
        />
      ) : (
        // <Vimeo
        //   videoId={id}
        //   style={{ backgroundColor: "black" }}
        //   onReady={() => console.log("Video is ready")}
        //   onPlay={() => {
        //     console.log("Video is playing");
        //   }}
        //   onFinish={() => console.log("Video is finished")}
        //   loop={false}
        //   controls={true}
        //   speed={false}
        //   time={"0m0s"}
        //   onVolumeChange={10}
        //   scalesPageToFit={false}
        // />
        <></>
      )}

      {link.toString().includes("youtu") ? (
        <View>
          <YoutubePlayer
            ref={videoPlayer}
            height={350}
            width={width}
            initialPlayerParams={{
              start: true,
              controls: true,
              preventFullScreen: false,
              modestbranding: true,
              loop: true,
            }}
            webViewProps={{ contentMode: "recommended" }}
            videoId={id}
            onChangeState={onStateChange}
          />
          <Pressable
            // TouchableOpacity to "steal" taps
            // absolutely positioned to the top
            // height must be adjusted to
            // just cover the top 3 dots
            style={{
              top: 0,
              height: 100,
              width: "100%",
              position: "absolute",
            }}
          />
          <Pressable
            // TouchableOpacity to "steal" taps
            // absolutely positioned to the top
            // height must be adjusted to
            // just cover the top 3 dots
            style={{
              right: 0,
              height: "100%",
              width: width * 0.17,
              position: "absolute",
            }}
          />
        </View>
      ) : (
        <></>
      )}

      {link.toString().includes(".mp4") ? (
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={onFullscreenUpdate}
          source={{
            uri: link,
          }}
          fullscreen={true}
          style={styles.mediaPlayer}
          volume={10}
        />
      ) : (
        <></>
      )}

      {link.toString().includes(".mp4") ? (
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={showVideoInFullscreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    // alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
