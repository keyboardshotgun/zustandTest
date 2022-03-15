import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {DramaType} from './store';

type DramaItemProps = {
  el: DramaType;
  removeDrama: (el: DramaType) => void;
  selectedDrama: (el: DramaType) => void;
  updateDrama: (el: DramaType) => void;
};

const DramaItem = ({
  el,
  removeDrama,
  updateDrama,
  selectedDrama,
}: DramaItemProps) => {

  const updateDramaHandler = () => {
    updateDrama(el);
  };
  const selectDramaHandler = () => {
    selectedDrama(el);
  };
  const removeDramaHandler = () => {
    removeDrama(el);
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
        <Text>{`${el.id}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={selectDramaHandler}
        style={{width: '60%', height: '100%'}}>
        <Text>{`${el.name}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={updateDramaHandler}
        style={{width: '15%', height: '100%'}}>
        {el?.deep1 ? <Text>{`${el?.deep1.deep3}`}</Text> : null}
      </TouchableOpacity>
    </View>
  );
};

export default DramaItem;
