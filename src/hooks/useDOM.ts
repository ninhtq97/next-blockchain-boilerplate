const useDOM = () => {
  const onCalcIndicator = (
    parent: HTMLElement,
    el: HTMLElement,
    indicator: HTMLElement,
  ) => {
    const parentRect = parent.getBoundingClientRect();
    const parentWidthOffset = parentRect.right - parentRect.width;

    const elRect = el.getBoundingClientRect();
    const position = elRect.left - parentWidthOffset;

    indicator.style.width = `${elRect.width}px`;
    indicator.style.left = `${position}px`;
  };

  const onAnimateNumber = (
    el: HTMLElement,
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

      el.innerHTML =
        lastVal % 1 !== 0
          ? (+(progress * (lastVal - initVal) + initVal).toFixed(2)).toString()
          : Math.floor(progress * (lastVal - initVal) + initVal).toString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(window.requestAnimationFrame(step));
      }
    };
    window.requestAnimationFrame(step);
  };

  return { onCalcIndicator, onAnimateNumber };
};

export default useDOM;
