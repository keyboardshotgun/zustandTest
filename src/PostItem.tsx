import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GetDataType} from './store';

type PostItemProps = {
  el: GetDataType;
  index: number;
  updateItem: (el: GetDataType) => void;
  selectedItem: (el: GetDataType) => void;
  removeItem: (el: GetDataType) => void;
};

const PostItem = ({
  el,
  index,
  updateItem,
  selectedItem,
  removeItem,
}: PostItemProps) => {

  const updateDramaHandler = () => {
    updateItem(el);
  };
  const selectDramaHandler = () => {
    selectedItem(el);
  };
  const removeDramaHandler = () => {
    removeItem(el);
  };

  return (
    <View
      key={el.id}
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginBottom: 5,
      }}>
      <TouchableOpacity
        onPress={removeDramaHandler}
        style={{width: '25%', height: '100%'}}>
        <Text>{`${(index+1)+':'+el.id}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={selectDramaHandler}
        style={{width: '60%', height: '100%'}}>
        <Text numberOfLines={3}>{`${el.body}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={updateDramaHandler}
        style={{width: '15%', height: '100%'}}>
        <Text>{el?.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostItem;
