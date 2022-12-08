import { useEffect, useRef } from 'react';

const useOutsideClick = (
  $refs: React.RefObject<HTMLElement>[],
  isListening: boolean,
  onOutsideClick: () => void,
  $listeningElementRef?: React.RefObject<HTMLElement>,
) => {
  const $mouseDownTargetRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      $mouseDownTargetRef.current = e.target;
    };

    const onMouseUp = (e) => {
      const isAnyIgnoredElementAncestorOfTarget = $refs.some(($ref) => {
        return (
          $ref.current &&
          ($ref.current.contains($mouseDownTargetRef.current) ||
            $ref.current.contains(e.target))
        );
      });

      if (e.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', onMouseDown);
      $listeningElement.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', onMouseDown);
      $listeningElement.removeEventListener('mouseup', onMouseUp);
    };
  }, [$refs, isListening, onOutsideClick, $listeningElementRef]);
};

export default useOutsideClick;
