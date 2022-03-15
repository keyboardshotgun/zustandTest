import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {DramaType, GetDataType, UseStoreInterface} from './store';
import DramaItem from './DramaItem';
import PostItem from './PostItem';

type ScrollableTableProps = {
  dataType: boolean;
  store: UseStoreInterface;
};

const ScrollableTable = ({dataType = false, store}: ScrollableTableProps) => {
  const [dataList, setDataList] = useState<
    UseStoreInterface['kdramas'] | UseStoreInterface['items']
  >([]);

  useEffect(() => {
    if (store?.items || store?.kdramas) {
      setDataList(dataType ? store?.items ?? [] : store?.kdramas ?? []);
    }
  }, [dataType, store?.items, store?.kdramas]);

  const selectedDrama = (drama: DramaType) => {
    if (drama.id) {
      store.selectedDrama(drama);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: 15}}
      style={{flex: 1}}>
      <View style={{width: '100%', height: '100%'}}>
        {dataList.map((el, index) => {
          return dataType ? (
            <PostItem
              el={el as GetDataType}
              key={el?.id + ':' + (el as GetDataType)?.title + ':' + index}
              index={index}
              removeItem={() => {}}
              selectedItem={() => {}}
              updateItem={() => {}}
            />
          ) : (
            <DramaItem
              el={el as DramaType}
              key={el.id + ':' + (el as DramaType)?.name + ':' + index}
              removeDrama={() => store.removeDrama(el)}
              selectedDrama={selectedDrama}
              updateDrama={() => store.removeDrama(el)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ScrollableTable;
