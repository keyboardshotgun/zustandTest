import React from 'react';
import Svg, {Circle} from 'react-native-svg';

type SvgCircleProps = {
  size?: number;
};

const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
function changeHex() {
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }
  return hex;
}

const SvgCircle = (props: SvgCircleProps) => {
  const {size = 17} = props;
  const randomColor = changeHex();
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
      <Circle
        fill={randomColor ?? '#3399BB'}
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
      />
    </Svg>
  );
};

export default SvgCircle;
