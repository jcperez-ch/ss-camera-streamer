import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, playNextVideo } from '../../../store';
import './css.scss';

interface VideoProps {
  onEnded: React.ReactEventHandler<any>;
  onError: React.ReactEventHandler<any>;
  autoPlay?: boolean;
  controls?: boolean;
  placeholder?: string;
  src?: string;
}

export const Video: React.SFC<VideoProps> = ({
  onEnded = () => true,
  controls = false,
  autoPlay = false,
  src,
  placeholder = '',
}: VideoProps) => src === undefined
  ? <span className="Video-empty">{placeholder}</span> : (
    <video { ...{ className: 'Video', autoPlay, controls, onEnded, src } }>
      {placeholder}
    </video>
  );

export const selectCurrentVideo = ({ camera, current }: AppState) => {
  if (camera.length > current) {
    const { src } = camera[current];
    return {
      src,
      autoPlay: true,
      placeholder: '',
    };
  }
  return { placeholder: 'No more videos' };
};

export const selectVideoActions = (dispatch: Dispatch<Action>): any => ({
  onEnded: () => dispatch(playNextVideo()),
  onError: () => dispatch(playNextVideo()),
});

export const AppVideo = connect(selectCurrentVideo, selectVideoActions)(Video);
