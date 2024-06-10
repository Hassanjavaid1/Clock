import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { PiPauseDuotone } from "react-icons/pi";
import { BiReset } from "react-icons/bi";
import alarm from "../Components/Ring-sound-effect.mp3"

export default function Clock() {
  const [minutes,setMinutes] = useState(25);
  const [second,setSecond] = useState(0)
  const [isRunning,setisRunning] =useState(false)
  const [breakLength,setBreakLength] = useState(5)
  const [redClass,setRedClass] = useState('default')
  const [increment,setIncrement] = useState(minutes)
  const [decrement,setDecrement] = useState(1)
  const [breakIncrement,setBreakIncrement] = useState(breakLength)
  const [breakDecrement,setBreakDecrement] = useState(1)
  const [isSession,setIsSession] = useState(true)


  useEffect(()=>{
    let timer;
    timer = setInterval(() => {
     if(isRunning){
       if(second == 0){
         if(minutes == 0){
          if(isSession){
            setIsSession(false)
           setMinutes(breakLength)
           setSecond(59)
           }
           else{
             setIsSession(true)
             setMinutes(25);
             setSecond(0)
             setisRunning(false)
             }
             }
             else{
           setBreakLength((preMin) => preMin - 1)
          setMinutes((prevMinutes) => prevMinutes - 1)
          setSecond(59)
          
         }
         
       }else{
        setSecond((prevSecond) => prevSecond - 1)
       }
     }
     }, 1000);

     if(second <= 2 && minutes < 1){
       new Audio(alarm).play()
       }else if(second <= 59 && minutes < 1){
        setRedClass('redClass')
     }
     else{
      setRedClass('default')
     }

    return () => clearInterval(timer)

 },[isRunning,second,minutes,redClass,increment,breakLength,breakIncrement,isSession,breakDecrement,breakIncrement])



const timerPlay = () => setisRunning(true);
const timerPaused = () => setisRunning(false);
   

const resetTimer  = () =>{
  setisRunning(false)
  setMinutes(25)
  setSecond(0)
setIncrement(25)
setBreakLength(5)
}

const sessionIncrement = () =>{
  if(minutes >= 60 ){
    setMinutes(60)
    setIncrement(60)
    }else{
      setisRunning(false);
      setMinutes((prevMin) => prevMin + 1)
      setIncrement(minutes + 1)

    }
 
  
}
 const sessionDecrement = () =>{
   if(minutes <= 1){
     setMinutes(1)
     setDecrement(1)
     }else{
    setisRunning(false)
    setMinutes((prevMin) => prevMin - 1)
    setIncrement(minutes - 1)

  }
 }

 const handleBreakInc = () =>{
  if(breakLength >= 60){
    setBreakLength(60)
    setBreakIncrement(60)
    }else{
   setisRunning(false)
   setBreakLength((prevMin) => prevMin + 1)
   setBreakIncrement(breakLength - 1)
 }
}
 const handleBreakDec = () =>{
  if(breakLength <= 1){
    setisRunning(false)
    setBreakLength(1)
    setBreakDecrement(1)
    }else{
   setisRunning(false)
   setBreakLength((prevMin) => prevMin - 1)
   setBreakDecrement(breakLength - 1)
   
 }
}

  return (
    <>
      <div className="container">
        <h1>25 + 5 Clock!</h1>
        <div className="subContainer">
          <div className="main-session-break">
            <div className="break-session">
              <div id="break-label">Break Length</div>
              <div className="break">
                <FaArrowUp id="break-increment" onClick={handleBreakInc}/>
                <h3 id="break-length">{breakLength}</h3>
                <FaArrowDown id="break-decrement" onClick={handleBreakDec}/>
              </div>
            </div>
            <div className="break-session">
              <div id="session-label">Session Length</div>
              <div className="break">
                <FaArrowUp id="session-increment" onClick={sessionIncrement}/>
                <h3 id="session-length">{increment}</h3>
                <FaArrowDown id="session-decrement" onClick={sessionDecrement}/>
              </div>
            </div>
          </div>
          <div className="time">
            <div id="timer-label" className={redClass}>{isSession?'session':'break'}</div>
      <div id="time-left" className={redClass}>{isSession?`${String(minutes).padStart(2,'0')}:${String(second).padStart(2,'0')}`:`${String(breakLength).padStart(2,'0')}:${String(second).padStart(2,'0')}`}</div>
            <div className="icon">
              <FaPlay id="start_stop" title="play" onClick={timerPlay} />
              <PiPauseDuotone id="start_stop" title="pause" onClick={timerPaused}/>
              <BiReset id="reset" onClick={resetTimer} />
            </div>
          </div>
          <h4 style={{textAlign:'center'}}>Developed By Hassan javaid!</h4>
        </div>
      </div>
    </>
  );
}
