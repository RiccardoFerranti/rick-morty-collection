import React, { createContext, FC, useContext } from 'react';

import { TDictionary } from './commonTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecordContext = createContext<any>(null);

RecordContext.displayName = 'DataContext';

interface IRecordProviderProps {
  record: TDictionary,
  children: React.ReactNode | React.ReactNode[],
}

export const RecordProvider: FC<IRecordProviderProps> = ({ record, children }) => (
  <RecordContext.Provider value={record}>
    {children}
  </RecordContext.Provider>
);

export function useRecord <T = any>(data?: T): T {
  const context = useContext(RecordContext);

  return data || context;
}
