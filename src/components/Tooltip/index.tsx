import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Position } from 'types';

type Start = 'start';
type End = 'end';

type Placement = `${Position}-${Start}` | Position | `${Position}-${End}`;

type Offset = Partial<Record<Position, number>>;

type TTooltipProps = {
  onEnter: () => void;
  onLeave: () => void;
};

type Props = {
  placement?: Placement;
  offset?: Offset;
  renderLink?: React.FC<TTooltipProps>;
  renderContent?: React.FC<TTooltipProps>;
} & React.HTMLAttributes<HTMLElement>;

const Tooltip: React.FC<Props> = ({
  className,
  placement = 'bottom',
  offset = { top: 0, left: 0 },
  renderLink,
  renderContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef<HTMLDivElement>(null);
  const $tooltipRef = useRef<HTMLDivElement>(null);

  const onEnter = () => setIsOpen(true);
  const onLeave = () => setIsOpen(false);

  useEffect(() => {
    const setPosition = () => {
      const { top, left } = calcPosition(
        offset,
        placement,
        $tooltipRef,
        $linkRef,
      );
      $tooltipRef.current!.style.top = `${top}px`;
      $tooltipRef.current!.style.left = `${left}px`;
    };

    if (isOpen) {
      setPosition();
      window.addEventListener('resize', setPosition);
      window.addEventListener('scroll', setPosition);
    }

    return () => {
      window.removeEventListener('resize', setPosition);
      window.removeEventListener('scroll', setPosition);
    };
  }, [isOpen, offset, placement]);

  return (
    <>
      <div
        className="table"
        ref={$linkRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {renderLink?.({ onEnter, onLeave })}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {createPortal(
              <motion.div
                className={`fixed p-2 bg-gray-600 text-white rounded z-50 shadow-md${
                  className ? ` ${className}` : ''
                }`}
                ref={$tooltipRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderContent?.({ onEnter, onLeave })}
              </motion.div>,
              document.querySelector('body')!,
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const calcPosition = (
  offset: Offset,
  placement: Placement,
  $tooltipRef: React.RefObject<HTMLElement>,
  $linkRef: React.RefObject<HTMLElement>,
) => {
  const margin = 10;
  const finalOffset = { ...offset };

  if ($tooltipRef.current && $linkRef.current) {
    const tooltipRect = $tooltipRef.current.getBoundingClientRect();
    const linkRect = $linkRef.current.getBoundingClientRect();

    const linkCenterY = linkRect.top + linkRect.height / 2;
    const linkCenterX = linkRect.left + linkRect.width / 2;

    const placements = {
      'top-start': {
        top: linkRect.top - margin - tooltipRect.height,
        left: linkRect.left,
      },
      top: {
        top: linkRect.top - margin - tooltipRect.height,
        left: linkCenterX - tooltipRect.width / 2,
      },
      'top-end': {
        top: linkRect.top - margin - tooltipRect.height,
        left: linkRect.left - tooltipRect.width + linkRect.width,
      },
      right: {
        top: linkCenterY - tooltipRect.height / 2,
        left: linkRect.right + margin,
      },
      'bottom-start': {
        top: linkRect.bottom + margin,
        left: linkRect.left,
      },
      bottom: {
        top: linkRect.bottom + margin,
        left: linkCenterX - tooltipRect.width / 2,
      },
      'bottom-end': {
        top: linkRect.bottom + margin,
        left: linkRect.left - tooltipRect.width + linkRect.width,
      },
      left: {
        top: linkCenterY - tooltipRect.height / 2,
        left: linkRect.left - margin - tooltipRect.width,
      },
    };

    return {
      top: placements[placement].top + (finalOffset.top ?? 0),
      left: placements[placement].left + (finalOffset.left ?? 0),
    };
  }

  return { top: 0, left: 0 };
};

export default Tooltip;
