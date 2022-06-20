import React, {useEffect, useState} from 'react';
import {useStyles} from 'routes/main/Room/RoomStream/Meeting/Meeting.styles';

interface TimerProps {
  isStarted: boolean;
}

const Timer: React.FC<TimerProps> = ({isStarted}) => {
  const classes = useStyles();

  const [seconds, setSeconds] = useState(0);
  const [hoursPart, setHoursPart] = useState(0);
  const [minutesPart, setMinutesPart] = useState(0);
  const [secondsPart, setSecondsPart] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isStarted) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        setHoursPart(Math.floor(seconds / 3600));
        setMinutesPart(Math.floor((seconds - hoursPart * 3600) / 60));
        setSecondsPart(seconds - hoursPart * 3600 - minutesPart * 60);
      }, 1000);
    } else if (!isStarted && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted, seconds]);

  return (
    <span className={classes.streamDurationValue}>
      {hoursPart.toString().padStart(2, '0')}:{minutesPart.toString().padStart(2, '0')}:
      {secondsPart.toString().padStart(2, '0')}
    </span>
  );
};
export default Timer;
