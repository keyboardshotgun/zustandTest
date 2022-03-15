import React from 'react';
import {View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

type PageThreePropsType = NativeStackNavigationProp<any, 'PageThree'>;
type PageThreeProps = {
  navigation: PageThreePropsType;
  route: RouteProp<{params: {itemInfo: any}}, 'params'>;
};

const PageThree = ({navigation, route}: PageThreeProps) => {
  return <View style={{flex: 1, backgroundColor : '#FF0000' }} />;
};

export default PageThree;
