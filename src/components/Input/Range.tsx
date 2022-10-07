import { useEffect, useRef, useState } from 'react';

type Props = {
  min?: number;
  max?: number;
  format?: 'value' | 'percent';
  withRangeText?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Range: React.FC<Props> = ({
  defaultValue,
  onChange: onChangeProps,
  min = 0,
  max = 100,
  format = 'value',
  withRangeText = false,
  ...props
}) => {
  const [stateValue, setStateValue] = useState(defaultValue || 0);

  const isControlled = Boolean(defaultValue?.toString() && !!onChangeProps);
  const value = isControlled ? defaultValue : stateValue;

  const $range = useRef<HTMLInputElement>(null);
  const $bubble = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setStateValue(e.currentTarget.value);
    } else {
      onChangeProps?.(e);
    }
  };

  const onInput = () => {
    setBubblePosition();
    setTrackProcess();
  };

  const setTrackProcess = () => {
    const css = calcTrack($range.current!);
    $range.current!.style.background = css;
  };

  const setBubblePosition = () => {
    const css = calcPosition($range.current!);
    $bubble.current!.style.left = css;
  };

  useEffect(() => {
    setTrackProcess();
    setBubblePosition();
  }, [value]);

  return (
    <>
      <div className="relative flex range">
        <input
          type="range"
          className="ipt"
          value={value}
          onChange={onChange}
          onInput={onInput}
          min={min}
          max={max}
          ref={$range}
          style={{ backgroundColor: '#1E2540' }}
          {...props}
        />
        <div className="bubble" ref={$bubble}>
          {format === 'value'
            ? value
            : `${parseFloat(Number(value).toFixed(1))}%`}
        </div>
      </div>
      {withRangeText && (
        <div className="flex justify-between gap-2 text-base text-white mt-3">
          <p>{min}</p>
          <p>{max}</p>
        </div>
      )}
    </>
  );
};

const calcTrack = ($range: HTMLInputElement) => {
  const val = +$range.value;
  const max = +$range.max;

  return `linear-gradient(to right, #FFFF00 -0.02%, #F88500 ${Number(
    ((val / max) * 100).toString(),
  )}%, #36425A ${Number(((val / max) * 100).toString())}%, #36425A 100%)`;
};

const calcPosition = ($range: HTMLInputElement) => {
  const val = +$range.value;
  const min = $range.min ? +$range.min : 0;
  const max = $range.max ? +$range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));

  return `calc(${newVal}% + (${6 - newVal * 0.11}px))`;
};

export default Range;
