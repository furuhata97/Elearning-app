import React from 'react';

import { InfosProvider } from './infos';

const AppProvider: React.FC = ({ children }) => (
  <InfosProvider>{children}</InfosProvider>
);

export default AppProvider;
