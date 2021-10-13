import React, { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import {width,height} from '../../utils/config'
import { Video, AVPlaybackStatus } from 'expo-av';
import getVideoId from 'get-video-id';

const ViewRecording = ({navigation, route}) => {

    const {link} = route.params
    // https://www.youtube.com/watch?v=HOYpAgWPTps
    // https://classrecording.s3.ap-south-1.amazonaws.com/45.mp4

    const l2 = link.split('/')



    console.log(link)

    const { id } = getVideoId(link);

    const [playing, setPlaying] = useState(false);

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);
  
    

    return (
        <View style={styles.container}>
              {l2[2]=='www.youtube.com'?<YoutubePlayer
        height={300}
        width={width}
        play={playing}
        videoId={id}
        onChangeState={onStateChange}
      />:
      // }{l2[2]=='classrecording.s3.ap-south-1.amazonaws.com'||'https://classrecording.s3.amazonaws.com'&&
       <Video
        ref={video}
        style={styles.video}
        source={{
          uri: link,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />}

{/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
       
        </View>
    )
}

export default ViewRecording

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      alignSelf: 'center',
      width,
      height: width*0.7,
    },
    })