import React from 'react';
import {Button, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import ScrollableTable from './ScrollableTable';
import {useStore} from './store';

type PageOnePropsType = NativeStackNavigationProp<any, 'PageOne'>;
type PageOneProps = {
  navigation: PageOnePropsType;
  route: RouteProp<{params: {itemInfo: any}}, 'params'>;
};

const PageOne = ({navigation, route}: PageOneProps) => {
  const store = useStore();
  const {addDrama} = store;

  return (
    <View style={{flex: 1, backgroundColor: '#a0a0d8'}}>
      <View
        style={{
          width: '100%',
          height: '10%',
          padding: 15,
          flexDirection: 'row',
        }}>
        <Button title={'Add'} onPress={addDrama} />
      </View>
      <View style={{width: '100%', height: '90%' }}>
        <ScrollableTable store={store} />
      </View>
    </View>
  );
};

export default PageOne;
