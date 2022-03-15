import React, {useCallback, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useStore} from './store';
import ScrollableTable from './ScrollableTable';

type MainScreenPropsType = NativeStackNavigationProp<any, 'MainScreen'>;
type MainScreenProps = {
  navigation: MainScreenPropsType;
  route: RouteProp<{params: {itemInfo: any}}, 'params'>;
};

const pageName = ['PageOne', 'PageTwo', 'PageThree'];

const MainScreen = ({navigation}: MainScreenProps) => {
  const [isLocalData, setIsLocalData] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const updateDataType = () => setIsLocalData(prevState => !prevState);
  const store = useStore();
  const { items } = store;

  const counter = useStore(
    useCallback(state => {
      // 계산이 필요 한 경우 이렇게 사용한다. ???
      return state?.kdramas.length;
    }, []),
  );

  const goSub = (type: number) => {
    navigation.navigate(pageName[type]);
  };

  const addDrama = () => store.addDrama();

  const getItems = () => {
    store?.getData({page: pageNumber});
    setPageNumber(prevState => prevState + 1);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#18A6F6',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{width: '100%', height: '20%', padding: 15, borderWidth: 1}}>
          <Button title={'page1'} onPress={() => goSub(0)} />
          <Button title={'page2'} onPress={() => goSub(1)} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title={!isLocalData ? 'LOCAL DATA' : 'WEB DATA'}
              onPress={updateDataType}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '10%',
            padding: 15,
            flexDirection: 'row',
          }}>
          <Button title={`Total : ${counter}`} onPress={() => {}} />
          <Button title={'Add'} onPress={addDrama} />
          <View style={{width: 20}} />
          <Button title={`Page : ${pageNumber}`} onPress={() => {}} />
          <Button title={`Items : ${items.length??0}`} onPress={() => {}} />
          <Button title={'Get'} onPress={getItems} />
        </View>

        {store.nowDrama?.id ? (
          <View
            style={{
              width: '100%',
              height: '10%',
              padding: 15,
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
            }}>
            <Text>{`${store.nowDrama?.id}`}</Text>
            <Text>{`${store.nowDrama?.name}`}</Text>
          </View>
        ) : null}
        <View
          style={{
            width: '100%',
            height: store.nowDrama?.id ? '60%' : '70%',
            padding: 15,
          }}>
          <ScrollableTable store={store} dataType={isLocalData} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MainScreen;
