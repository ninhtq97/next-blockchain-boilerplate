import { useCallback, useEffect, useRef } from 'react';

const useDebounce = () => {
  const $timer = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback(
    (val: string, onChange: (value: string) => void, debounceMs = 500) => {
      if ($timer.current) {
        clearTimeout($timer.current);
      }

      $timer.current = setTimeout(() => {
        onChange(val);
        $timer.current = undefined;
      }, debounceMs);
    },
    [],
  );

  useEffect(() => {
    if ($timer.current) {
      clearTimeout($timer.current);
      $timer.current = undefined;
    }
  }, []);

  return { debounce };
};

export default useDebounce;
