const useTab = () => {
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

  return { onCalcIndicator };
};

export default useTab;
