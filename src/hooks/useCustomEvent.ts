import React, { useState, useEffect } from 'react';

const useCustomEvent = (event:any) => {
  const [value, updateValue] = useState(undefined);

  const onEvent = (detail:any) => {
    updateValue(detail);
  };

  useEffect(() => {
    window.addEventListener(event, onEvent);
    return () => window.removeEventListener(event, onEvent);
  });

  return [
    value,
    (detail:any) => {
      window.dispatchEvent(
        new CustomEvent(event, {
          detail,
          bubbles: false,
        }),
      );
    },
  ];
};
export default useCustomEvent;
