import React, {useState, useEffect} from 'react';
import {ProgressBar} from 'react-native-paper';
import palette from '../theme/palette';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update the progress value over 1 minute
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 1) {
          clearInterval(interval);
        }
        return Math.min(oldProgress + 0.01, 1); // Increase by 1% every 0.6 seconds
      });
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ProgressBar
      progress={progress}
      color={palette.background.main}
      style={{height: 6}}
    />
  );
};

export default LoadingBar;
