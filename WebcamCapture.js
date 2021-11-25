import React, { useCallback, useRef,useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonChecked"
import { useDispatch } from 'react-redux'
import { setCameraImage } from './features/cameraSlice'
import { useHistory } from 'react-router'
import "./webcamCapture.css"
const videoConstraints={
    width:250,
    height:400,
    facingMode:"user",
}

function WebcamCapture() {
    const webcamRef=useRef(null)
    const dispatch=useDispatch()
    const history=useHistory()
      const capture=useCallback(()=>{
          const imagesrc=webcamRef.current.getScreenshot()
          dispatch(setCameraImage(imagesrc))
          history.push("/preview")
         },[webcamRef])
    return (
        <div className="webcamCapture">
            <Webcam
             audio={false}
             height={videoConstraints.height}
             ref={webcamRef}
             screenshotFormat="image/jpeg"
             width={videoConstraints.width}
             videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon className="webcamCapture__button" onClick={capture} fontSize="large"/>
        </div>
    )
}

export default WebcamCapture
