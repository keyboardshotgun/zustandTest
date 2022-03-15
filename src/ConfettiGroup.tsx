import React, {useEffect, useState} from 'react';
import Confetti from './Confetti';
import {DeviceInfo} from './PageTwo';

type ConfettiGroupProps = {
  numberOfBalls: number;
};

const ConfettiGroup = ({numberOfBalls}: ConfettiGroupProps) => {
  const [mapLength, setMapLength] = useState<number>(1);

  useEffect(() => {
    setMapLength(numberOfBalls);
  }, [numberOfBalls]);

  const propertyMaker = () => {
    return {
      size: Math.random() * 15 + 10,
      deltas: {
        top: Math.random() * 100,
        left: Math.random() * DeviceInfo.width,
        bottom: 0,
        swing: (Math.random() * DeviceInfo.width) / 4 + 10,
        rotateX: 0,
        rotateY: 0,
        delay: Math.random() * 1000 + 50,
        duration: Math.random() * 3000 + 500,
      },
    };
  };

  return (
    <>
      {Array.from({length: mapLength}).map((_, index) => {
        return <Confetti data={propertyMaker()} key={index} />;
      })}
    </>
  );
};

export default React.memo(ConfettiGroup);
