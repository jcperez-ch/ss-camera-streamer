import { Store } from 'redux';

import { AppState, addVideo, clearPlaylist, restartPlaylist } from '../store';

declare const socket: any;

interface VideoFacade {
    src: string;
    type: string;
}

export const configureAgent = (store: Store<AppState>): void => {
    socket.on('add', (video: VideoFacade) => {
        store.dispatch(addVideo(video));
    });
    socket.on('restart', () => {
        store.dispatch(restartPlaylist());
    });
    socket.on('clear', () => {
        store.dispatch(clearPlaylist());
    });
};
