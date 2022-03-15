import React from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

type PageTwoPropsType = NativeStackNavigationProp<any, 'PageTwo'>;
type PageTwoProps = {
  navigation: PageTwoPropsType;
  route: RouteProp<{params: {itemInfo: any}}, 'params'>;
};

const PageTwo = ({navigation, route}: PageTwoProps) => {
  return <View style={{flex: 1, backgroundColor : '#FFFF00' }} />;
};

export default PageTwo;
