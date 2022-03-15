import React, {useEffect} from 'react';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import SvgCircle from './SvgShape/SvgCircle';
import {DeviceInfo} from './PageTwo';

export type IParticle = {
  size: number;
  deltas: {
    top: number;
    left: number;
    bottom: number;
    swing: number;
    rotateX: number;
    rotateY: number;
    delay: number;
    duration: number;
  };
};

type ConfettiProps = {
  data: IParticle;
};

const Confetti = ({data}: ConfettiProps) => {
  const aniValue = useSharedValue(0);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    'worklet';
    aniValue.value = withRepeat(
      withTiming(1, {
        duration: data.deltas?.duration,
        easing: Easing.ease,
      }),
      0,
      true,
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            aniValue.value,
            [0, 0.3, 0.6, 1],
            [
              0,
              (Math.sin(-1) * DeviceInfo.width) / 4,
              (Math.sin(1) * DeviceInfo.width) / 4,
              0,
            ],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            aniValue.value,
            [0, 0.5, 1],
            [0, DeviceInfo.height / 2 - data.size, DeviceInfo.height],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);

  return (
    <Animated.View style={{flex: 1}}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: data.deltas.top,
            left: data.deltas.left,
          },
          animatedStyle,
        ]}>
        <SvgCircle size={data.size} />
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(Confetti);
