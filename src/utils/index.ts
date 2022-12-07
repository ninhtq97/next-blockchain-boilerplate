export { default as api } from './api';
export * from './array';
export * from './bigNumber';
export * from './date';
export * from './error';
export * from './random';
export * from './sentry';
export * from './storage';
export * from './string';
export * from './toast';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const onCalcIndicator = (
  $parent: React.RefObject<any>,
  el: HTMLElement,
  $indicator: React.RefObject<any>,
) => {
  const parent = $parent.current;

  const parentRect = parent.getBoundingClientRect();
  const parentWidthOffset = parentRect.right - parentRect.width;

  const elRect = el.getBoundingClientRect();

  const indicator = $indicator.current;

  const position = elRect.left - parentWidthOffset;

  indicator.style.width = `${elRect.width}px`;
  indicator.style.left = `${position}px`;
};

export const animateNumber = (
  obj,
  initVal: number,
  lastVal: number,
  duration: number,
) => {
  let startTime: number = 0;

  const step = (currentTime: number) => {
    if (!startTime) {
      startTime = currentTime;
    }

    const progress = Math.min((currentTime - startTime) / duration, 1);

    obj.innerHTML =
      lastVal % 1 !== 0
        ? +(progress * (lastVal - initVal) + initVal).toFixed(2)
        : Math.floor(progress * (lastVal - initVal) + initVal).toString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };
  window.requestAnimationFrame(step);
};

export const excludeEmptyValue = <T extends {}>(obj: T): T => {
  Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
  return obj;
};
