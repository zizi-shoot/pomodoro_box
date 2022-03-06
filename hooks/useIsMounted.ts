import React, { useState } from 'react';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
