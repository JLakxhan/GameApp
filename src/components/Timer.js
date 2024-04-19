import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Timer = ({ duration, onTimeout }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1000);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);

    useEffect(() => {
        if (time === 0) {
          onTimeout(); // Call the onTimeout function when the time runs out
          return;
        }
        const timer = setTimeout(() => setTime(time - 1000), 1000);
        return () => clearTimeout(timer);
      }, [time, onTimeout]);

    const getFormattedTime = (milliseconds) => {
        let total_seconds = parseInt(Math.floor(milliseconds / 1000));
        let total_minutes = parseInt(Math.floor(total_seconds / 60));

        let seconds = parseInt(total_seconds % 60);
        let minutes = parseInt(total_minutes % 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const timerClassName = time <= 10000 ? 'timer timer-red' : 'timer';

    return <div className={timerClassName}>{getFormattedTime(time)}</div>;
};

export default Timer;
