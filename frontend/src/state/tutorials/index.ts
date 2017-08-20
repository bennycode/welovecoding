import {wrapActionForFetching} from 'redux-fetchers';
import {Categories} from 'src/api';

const RECEIVE_CATEGORIES = 'tutorials/RECEIVE_CATEGORIES';
const RECEIVE_PLAYLISTS = 'tutorials/RECEIVE_PLAYLISTS';

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  id: number;
  slug: string;
  description: string;
  level: string;
  languageCode: string;
  provider: string;
  categoryId: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  videos: Video[];
}

export interface Video {
  id: number;
  name: string;
  videoId: string;
  slug: string;
  previewImageUrl: string;
  authorId: number;
  playlistId: number;
  createdAt: string;
  updatedAt: string;
}

export function getCategories() {
  return dispatch => {
    return Categories.getCategories().then(res => {
      return dispatch({
        type: RECEIVE_CATEGORIES,
        data: res.data,
      });
    });
  };
}

export function getPlaylistsForCategory(id) {
  return dispatch => {
    return Categories.getPlaylists(id).then(res => {
      dispatch({
        type: RECEIVE_PLAYLISTS,
        categoryId: id,
        data: res.data,
      });
    });
  };
}

export const getCategoriesFetcher = wrapActionForFetching(
  getCategories,
  state => state.tutorials.categories.length !== 0,
);

export const getPlaylistsForCategoryFetcher = wrapActionForFetching(
  getPlaylistsForCategory,
  (state, id) => state.tutorials.categoryPlaylists[id],
);

export interface TutorialsState {
  categories: Category[];
  categoryPlaylists: {
    [key: string]: Playlist[];
  };
}

const initialState: TutorialsState = {
  categories: [],
  categoryPlaylists: {},
};

export default function reducer(state: TutorialsState = initialState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    case RECEIVE_PLAYLISTS:
      return {
        ...state,
        categoryPlaylists: {
          ...state.categoryPlaylists,
          [action.categoryId]: action.data,
        },
      };
    default:
      return state;
  }
}
