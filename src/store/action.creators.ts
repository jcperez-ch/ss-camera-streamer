import { CAMERA } from './action.types';
import { Camera } from './types';

export const playNextVideo = () => ({
    type: CAMERA.MOVE,
});

export const restartPlaylist = () => ({
    type: CAMERA.RESTART,
});

export const clearPlaylist = () => ({
    type: CAMERA.CLEAR,
});

export const addVideo = (video: Camera) => ({
    type: CAMERA.ADD,
    ...video,
});
