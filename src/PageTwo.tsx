import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import ConfettiGroup from './ConfettiGroup';
export const DeviceInfo = Dimensions.get('window');

type PageTwoProps = {};

const PageTwo = ({}: PageTwoProps) => {
  const [numberOfBalls, setNumberOfBalls] = useState<number>(10);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFF00'}}>
      <ConfettiGroup numberOfBalls={numberOfBalls} />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          left: 15,
          bottom: 15,
          width: DeviceInfo.width - 30,
          height: 40,
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
        }}>
        <Button
          title={'minus-10'}
          onPress={() =>
            setNumberOfBalls(prevState => (prevState < 2 ? 1 : prevState - 10))
          }
        />
        <Button
          title={'minus-1'}
          onPress={() =>
            setNumberOfBalls(prevState => (prevState < 2 ? 1 : prevState - 1))
          }
        />
        <View
          style={{
            width: 50,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{`${numberOfBalls}`}</Text>
        </View>
        <Button
          title={'plus+1'}
          onPress={() =>
            setNumberOfBalls(prevState => (prevState > 200 ? 1 : prevState + 1))
          }
        />
        <Button
          title={'plus+10'}
          onPress={() =>
            setNumberOfBalls(prevState =>
              prevState > 200 ? 1 : prevState + 10,
            )
          }
        />
      </View>
    </View>
  );
};

export default PageTwo;
