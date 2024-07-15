import React from 'react';

import { WysiwygEditor } from './components/WysiwygEditor';
import { GlobalStyles } from './styles/global';

export const App: React.FC = () => {
  return (
    <>
      <p>App</p>

      <WysiwygEditor />

      <GlobalStyles />
    </>
  );
};
