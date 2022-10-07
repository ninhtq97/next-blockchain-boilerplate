import { useEffect } from 'react';

const useOutsideClick = (
  $refs: React.RefObject<HTMLElement>[],
  isListening: boolean,
  onOutsideClick: () => void,
  $listeningElementRef?: React.RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const onClick = (e) => {
      const isAnyIgnoredElementAncestorOfTarget = $refs.some(($ref) =>
        $ref.current!.contains(e.target),
      );

      if (
        (e.button === 0 || e.button === 2) &&
        !isAnyIgnoredElementAncestorOfTarget
      ) {
        onOutsideClick();
      }
    };

    const $listeningElement = $listeningElementRef?.current || document;

    console.log('$listeningElement:', $listeningElement);
    console.log('isListening:', isListening);

    if (isListening) {
      $listeningElement.addEventListener('click', onClick);
    }
    return () => {
      $listeningElement.removeEventListener('click', onClick);
    };
  }, [$refs, isListening, onOutsideClick, $listeningElementRef]);
};

export default useOutsideClick;
