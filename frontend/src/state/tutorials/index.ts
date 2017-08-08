import {Categories} from 'src/api';

const RECEIVE_CATEGORIES = 'tutorials/RECEIVE_CATEGORIES';

export function getCategories() {
  return dispatch => {
    return Categories.getCategories().then(res => {
      return dispatch({
        type: RECEIVE_CATEGORIES,
        data: res,
      });
    });
  };
}

export interface TutorialsState {
  categories: any[];
}

const initialState: TutorialsState = {
  categories: [],
};

export default function reducer(state: TutorialsState = initialState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    default:
      return state;
  }
}
