import { useEffect, useRef } from 'react';

interface Props {
  handleClose: () => void,
}

export function useCloseModal({ handleClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return ref;
}
