import { AnimatePresence, motion } from 'framer-motion';
import useOutsideClick from 'hooks/useOutsideClick';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Position } from 'types';

type Start = 'start';
type End = 'end';

type Placement = `${Position}-${Start}` | Position | `${Position}-${End}`;

type Offset = Partial<Record<Position, number>>;

type RenderLinkProps = {
  ref: React.RefObject<HTMLElement>;
  onClick: () => void;
};

type RenderContentProps = {
  onClose: () => void;
};

type Props = {
  placement?: Placement;
  offset?: Offset;
  width?: string | number;
  renderLink?: React.FC<RenderLinkProps>;
  renderContent?: React.FC<RenderContentProps>;
} & React.HTMLAttributes<HTMLElement>;

const Popover: React.FC<Props> = ({
  className,
  placement = 'bottom',
  offset = { top: 0, left: 0 },
  width,
  renderLink,
  renderContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef<HTMLElement>(null);
  const $popoverRef = useRef<HTMLDivElement>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useOutsideClick([$popoverRef, $linkRef], isOpen, onClose);

  useEffect(() => {
    if (!width && isOpen) {
      const rect = $linkRef.current?.getBoundingClientRect();

      if (rect && $popoverRef.current) {
        $popoverRef.current.style.minWidth = `${rect.width}px`;
      }
    }
  }, [isOpen, width]);

  useEffect(() => {
    const setPosition = () => {
      const { top, left } = calcPosition(
        offset,
        placement,
        $popoverRef,
        $linkRef,
      );

      if ($popoverRef.current) {
        $popoverRef.current.style.top = `${top}px`;
        $popoverRef.current.style.left = `${left}px`;
      }
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
      {renderLink?.({
        ref: $linkRef,
        onClick: isOpen ? onClose : onOpen,
      })}

      <AnimatePresence>
        {isOpen && (
          <>
            {createPortal(
              <motion.div
                className={`fixed p-5 bg-white rounded z-[9999] shadow-md max-w-fit${
                  className ? ` ${className}` : ''
                }`}
                ref={$popoverRef}
                style={{
                  width: typeof width === 'number' ? `${width}px` : width,
                }}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
              >
                {renderContent?.({ onClose })}
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
  $popoverRef: React.RefObject<HTMLElement>,
  $linkRef: React.RefObject<HTMLElement>,
) => {
  const margin = 10;
  const finalOffset = { ...offset };

  if ($popoverRef.current && $linkRef.current) {
    const popoverRect = $popoverRef.current.getBoundingClientRect();
    const linkRect = $linkRef.current.getBoundingClientRect();

    const linkCenterY = linkRect.top + linkRect.height / 2;
    const linkCenterX = linkRect.left + linkRect.width / 2;

    const placements = {
      'top-start': {
        top: linkRect.top - margin - popoverRect.height,
        left: linkRect.left,
      },
      top: {
        top: linkRect.top - margin - popoverRect.height,
        left: linkCenterX - popoverRect.width / 2,
      },
      'top-end': {
        top: linkRect.top - margin - popoverRect.height,
        left: linkRect.left - popoverRect.width + linkRect.width,
      },
      'right-start': {
        top: linkCenterY - margin,
        left: linkRect.right + margin,
      },
      right: {
        top: linkCenterY - popoverRect.height / 2,
        left: linkRect.right + margin,
      },
      'right-end': {
        top: linkCenterY - popoverRect.height + margin,
        left: linkRect.right + margin,
      },
      'bottom-start': {
        top: linkRect.bottom + margin,
        left: linkRect.left,
      },
      bottom: {
        top: linkRect.bottom + margin,
        left: linkCenterX - popoverRect.width / 2,
      },
      'bottom-end': {
        top: linkRect.bottom + margin,
        left: linkRect.left - popoverRect.width + linkRect.width,
      },
      'left-start': {
        top: linkCenterY - margin,
        left: linkRect.left - popoverRect.width - margin,
      },
      left: {
        top: linkCenterY - popoverRect.height / 2,
        left: linkRect.left - margin - popoverRect.width,
      },
      'left-end': {
        top: linkCenterY - popoverRect.height + margin,
        left: linkRect.left - popoverRect.width - margin,
      },
    };

    return {
      top: placements[placement].top + (finalOffset.top ?? 0),
      left: placements[placement].left + (finalOffset.left ?? 0),
    };
  }
  return { top: 0, left: 0 };
};

export default Popover;
