import React from 'react';

export default function usePersistedState(key: string, defaultValue?: any) {
  const [state, setState] = React.useState(() => {
    const persistedState = window.sessionStorage.getItem(key) || null;
    return persistedState && persistedState.length > 0 ? JSON.parse(persistedState) : defaultValue;
  });
  React.useEffect(() => {
    if (state) { window.sessionStorage.setItem(key, JSON.stringify(state)); }
  }, [state, key]);
  return [state, setState];
}
