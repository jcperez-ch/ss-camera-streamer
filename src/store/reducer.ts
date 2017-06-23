import { Action, Reducer } from 'redux';

import { CAMERA } from './action.types';
import { AppState, Camera } from './types';

export const addVideo = (state: AppState, video: Camera) => {
  const has = Object.prototype.hasOwnProperty.bind(video);
  if (has('src')) {
    return { ...state, camera: [...state.camera, video] };
  }
  return state;
};

export const playNextVideo = (state: AppState): AppState => {
  const { camera, current } = state;
  return camera.length > current
    ? { ...state, current: current + 1 }
    : state;
};

export const restartPlaylist = (state: AppState): AppState => {
  return state.current === 0 ? state : { ...state, current: 0 };
};

export const clearPlaylist = (state: AppState): AppState => {
  return state.camera.length === 0 && state.current === 0 ? state : { current: 0, camera: [] };
};

export const reducer: Reducer<AppState> = (state: AppState, { type, ...payload }: Action): AppState => {
  switch (type) {
    case CAMERA.ADD:
      return addVideo(state, payload as Camera);
    case CAMERA.CLEAR:
      return clearPlaylist(state);
    case CAMERA.MOVE:
      return playNextVideo(state);
    case CAMERA.RESTART:
      return restartPlaylist(state);
    default:
  }
  return state;
};
