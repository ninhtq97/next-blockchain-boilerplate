import { useEffect } from 'react';

const useOutsideClick = (
  $refs: React.RefObject<HTMLElement>[],
  isListening: boolean,
  onOutsideClick: () => void,
  $listeningElementRef?: React.RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const onClick = (e) => {
      const isAnyIgnoredElementAncestorOfTarget = $refs.some(($ref) => {
        return $ref.current && $ref.current.contains(e.target);
      });

      if (
        (e.button === 0 || e.button === 2) &&
        !isAnyIgnoredElementAncestorOfTarget
      ) {
        onOutsideClick();
      }
    };

    const $listeningElement = $listeningElementRef?.current || document.body;

    if (isListening) {
      $listeningElement.addEventListener('click', onClick);
    }
    return () => {
      $listeningElement.removeEventListener('click', onClick);
    };
  }, [$refs, isListening, onOutsideClick, $listeningElementRef]);
};

export default useOutsideClick;
