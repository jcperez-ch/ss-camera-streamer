import * as React from 'react';

import { Logo } from '../Logo';
import { AppVideo } from '../Video';
import './css.scss';

export const App: React.SFC<{}> = () => (
  <div className="App">
    <div className="App-header"><Logo /></div>
    <div className="App-content"><AppVideo /></div>
  </div>
);
