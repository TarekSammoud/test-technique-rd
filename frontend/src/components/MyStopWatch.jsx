import React, { useImperativeHandle } from 'react';
import { useStopwatch } from 'react-timer-hook';

const MyStopwatch = React.forwardRef((props, ref) => {
  const { seconds, minutes, hours, pause, reset } = useStopwatch({ autoStart: true, interval: 1000 });

  useImperativeHandle(ref, () => ({
    pause,
    getTime: () => ({ hours, minutes, seconds, reset })
  }));

  return (
    <div style={{ textAlign: 'center' }}>
      {hours.toString().padStart(2,'0')}:{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}
    </div>
  );
});

export default MyStopwatch;
