import create, {GetState, SetState} from 'zustand';
import produce, {Draft} from 'immer';
import axios, {AxiosResponse} from 'axios';

const DramaArray = [
  '터치',
  '낭만닥터김사부2',
  '머니게임',
  '신비아파트외전:연애공식구하리',
  '더게임:0시를향하여',
  '포레스트',
  '이태원클라쓰',
  '본대로말하라',
  '방법',
  '안녕드라큘라',
  '하이에나',
  '날씨가좋으면찾아가겠어요',
  '아무도모른다',
  '메모리스트',
  '슬기로운의사생활',
  '그남자의기억법',
  '반의반',
  '어서와',
  '부부의세계',
  '유별나!문셰프',
  '루갈',
  '위험한약속',
  '계약우정',
  '더킹:영원의군주',
  '기막힌유산',
  '본어게인',
  '화양연화',
  '미씽:그들이있었다',
  '브람스를좋아하세요',
  '거짓말의거짓말',
  '트웬티트웬티',
  '비밀의남자',
  '청춘기록',
  '오!삼광빌라',
  '좀비탐정',
  '낮과밤',
  '바람피면죽는다',
  '여신강림',
  '허쉬',
  '철인왕후',
  '런온',
  '암행어사:조선비밀수사단',
];

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

interface ZustandStateRequestFntInterface {
  isCallable: boolean;
  reqEnabled: () => void;
  reqDisabled: () => void;
}

const createNetworkSlice: StoreSlice<ZustandStateRequestFntInterface> = (
  set,
  _,
) => ({
  isCallable: true,
  reqEnabled: () => set(() => ({isCallable: true})),
  reqDisabled: () => set(() => ({isCallable: false})),
});

export type DramaType = {
  id: number;
  name: string;
  deep1?: {
    deep2: [{switch: false}, {switch: false}, {switch: false}];
    deep3: string | boolean;
  };
};

export type GetDataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface UseStoreInterface {
  itemListEnd: boolean;
  items: GetDataType[] | [];
  nowDrama: DramaType | {};
  kdramas: DramaType[] | [];
  addDrama: () => void;
  selectedDrama: (payload: DramaType) => void;
  removeDrama: (payload: {id: number}) => void;
  updateDrama: (payload: {id: number}) => void;
  getData: (payload: {page: number}) => void;
}

const createDefaultStateSlice: StoreSlice<
  UseStoreInterface,
  ZustandStateRequestFntInterface
> = (set, get) => {
  return {
    itemListEnd: false,
    items: [],
    nowDrama: {},
    kdramas: [],
    selectedDrama: (payload: DramaType) =>
      set(
        produce((draft: Draft<any>) => {
          draft.nowDrama = payload;
        }),
      ),
    addDrama: () =>
      set(
        produce((draft: Draft<any>) => {
          draft.kdramas.unshift({
            id: Math.floor(Math.random() * 999999999 + 1),
            name: DramaArray[Math.floor(Math.random() * 41)],
          });
        }),
      ),
    removeDrama: (payload: {id: number}) =>
      set(
        produce((draft: Draft<any>) => {
          draft.kdramas = draft.kdramas.filter(
            (el: DramaType) => el.id !== payload.id, // findIndex => draft.kdramas.splice(deletedIndex, 1);
          );
        }),
        true, // array replace not merge
      ),
    updateDrama: (payload: {id: number}) =>
      set(
        produce((draft: Draft<any>) => {
          const targetDrama: DramaType = draft.kdramas.filter(
            (el: DramaType) => el.id === payload.id,
          );
          targetDrama.name = DramaArray[Math.floor(Math.random() * 41)];
        }),
      ),
    getData: async (payload: {page: number}) => {
      // Pagination : https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5

      if (get()?.isCallable === false) {
        return;
      }

      const uri =
        'https://jsonplaceholder.typicode.com/posts?_limit=10&_start=' +
        payload?.page;

      try {
        get()?.reqDisabled();
        const result: AxiosResponse = await axios.get(uri);
        if (result.status === 200) {
          if (result?.data && result?.data?.length > 0) {
            console.log('response : ', result?.data?.length);
            if (result?.data?.length < 10) {
              console.log('list end');
            } else {
              const newItems: GetDataType[] = result?.data;
              set(
                produce((draft: Draft<any>) => {
                  draft.items = [...draft.items, ...newItems];
                }),
              );
            }
          } else {
            console.log('no data');
            console.log('list end');
          }
        } else {
          console.log('request fail');
        }
      } catch (e) {
        console.log('get error : ', e);
      }
      get()?.reqEnabled();
    },
  };
};

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createNetworkSlice(set, get),
  ...createDefaultStateSlice(set, get),
});

export const useStore = create(createRootSlice);

// export const useStore = create<UseStoreInterface>(set => ({
//   itemListEnd: false,
//   items: [],
//   nowDrama: {},
//   kdramas: [],
//   selectedDrama: payload =>
//     set(
//       produce((draft: Draft<any>) => {
//         draft.nowDrama = payload;
//       }),
//     ),
//   addDrama: () =>
//     set(
//       produce((draft: Draft<any>) => {
//         draft.kdramas.unshift({
//           id: Math.floor(Math.random() * 999999999 + 1),
//           name: DramaArray[Math.floor(Math.random() * 41)],
//         });
//       }),
//     ),
//   removeDrama: payload =>
//     set(
//       produce((draft: Draft<any>) => {
//         draft.kdramas = draft.kdramas.filter(
//           (el: DramaType) => el.id !== payload.id, // findIndex => draft.kdramas.splice(deletedIndex, 1);
//         );
//       }),
//       true, // array replace not merge
//     ),
//   updateDrama: payload =>
//     set(
//       produce((draft: Draft<any>) => {
//         const targetDrama: DramaType = draft.kdramas.filter(
//           (el: DramaType) => el.id === payload.id,
//         );
//         targetDrama.name = DramaArray[Math.floor(Math.random() * 41)];
//       }),
//     ),
//   getData: async (payload: {page: number}) => {
//     // Pagination : https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5
//     const uri =
//       'https://jsonplaceholder.typicode.com/posts?_limit=10&_start=' +
//       payload?.page;
//     try {
//       const result: AxiosResponse = await axios.get(uri);
//
//       if (result.status === 200) {
//         if (result?.data && result?.data?.length > 0) {
//           console.log('response : ', result?.data?.length);
//           if (result?.data?.length < 10) {
//             console.log('list end');
//           } else {
//             const items: GetDataType[] = result?.data;
//           }
//         } else {
//           console.log('no data');
//           console.log('list end');
//         }
//       } else {
//         console.log('request fail');
//       }
//     } catch (e) {
//       console.log('get error : ', e);
//     }
//   },
// }));
