import React, { Component } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 60,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;


  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 343248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
class CountdownTimer extends Component {
    render() {
        return (
      
            <div className="row">
              <div className="col-md-2"> </div>
                <div className="col-md-6">
                <h1 style={{color:'#ff6a00'}}>Ưu đãi hấp dẫn</h1>
                    <h1 style={{color:'#ff6a00'}}>Săn Sale Online Mỗi Ngày</h1>
                </div>
                <div className="col-md-1">

               
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#7E2E84"]]}
                duration={daysDuration}
                initialRemainingTime={remainingTime}
              >
                {({ elapsedTime }) =>
                  renderTime("ngày", getTimeDays(daysDuration - elapsedTime))
                }
              </CountdownCircleTimer>
              </div>
              <div className="col-md-1">
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#D14081"]]}
                duration={daySeconds}
                initialRemainingTime={remainingTime % daySeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > hourSeconds
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime("giờ", getTimeHours(daySeconds - elapsedTime))
                }
              </CountdownCircleTimer>
              </div>
              <div className="col-md-1">
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#EF798A"]]}
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > minuteSeconds
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime("phút", getTimeMinutes(hourSeconds - elapsedTime))
                }
              </CountdownCircleTimer>
              </div>
              <div className="col-md-1">
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#218380"]]}
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > 0
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime("giây", getTimeSeconds(elapsedTime))
                }
              </CountdownCircleTimer>
              </div>
            </div>
          );
    }
}

export default CountdownTimer;
  

