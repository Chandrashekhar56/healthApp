import React, {useState, useEffect} from 'react';

const withTimerHOC = WrappedComponent => {
  return props => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const startTimer = () => {
      setIsActive(true);
    };

    const stopTimer = () => {
      setIsActive(false);
    };
    useEffect(() => {
      startTimer();
    }, []);

    useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setTimer(timer => timer + 1);
        }, 1000);
      } else if (!isActive && timer !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, timer]);

    const formatTime = () => {
      const getSeconds = `0${timer % 60}`.slice(-2);
      const minutes = `${Math.floor(timer / 60)}`;
      const getMinutes = `0${minutes % 60}`.slice(-2);

      return `${getMinutes} : ${getSeconds}`;
    };

    return (
      <WrappedComponent
        {...props}
        timer={formatTime()}
        setTimer={setTimer}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    );
  };
};

export default withTimerHOC;
