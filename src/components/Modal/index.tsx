import Icon from 'components/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TRenderLink = {
  onOpen: () => void;
};

type TRenderContent = {
  onClose: () => void;
};

type Props = {
  width?: number;
  withCloseIcon?: boolean;
  disableClickBackdrop?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  renderLink?: React.FC<TRenderLink>;
  renderHeader?: React.FC;
  renderContent?: React.FC<TRenderContent>;
  renderFooter?: React.FC<TRenderContent>;
} & React.HTMLProps<HTMLElement>;

const Modal: React.FC<Props> = ({
  className,
  width = 650,
  withCloseIcon = true,
  disableClickBackdrop = false,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderHeader,
  renderContent,
  renderFooter,
}) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef<HTMLDivElement>(null);
  const $clickableOverlayRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback(() => setStateOpen(true), []);

  const onClose = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose?.();
    }
  }, [isControlled, tellParentToClose]);

  useEffect(() => {
    $clickableOverlayRef?.current?.scrollIntoView();
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  return (
    <>
      {!isControlled && renderLink?.({ onOpen })}

      <AnimatePresence>
        {isOpen && (
          <>
            {createPortal(
              <div className={`modal${className ? ` ${className}` : ''}`}>
                <motion.div
                  className="modal-overlay"
                  ref={$clickableOverlayRef}
                  onClick={!disableClickBackdrop ? onClose : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                >
                  <motion.div
                    className="modal-container"
                    ref={$modalRef}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{ maxWidth: `${width}px` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isOpen ? 'open' : 'close'}
                    variants={{
                      open: { scale: [0, 1.1, 1], opacity: [0, 1] },
                      closed: { scale: [1, 1.1, 0], opacity: [1, 0] },
                    }}
                    exit={{ scale: [1, 1.1, 0], opacity: [1, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {withCloseIcon && (
                      <Icon
                        clickable
                        className="modal-close"
                        component="div"
                        icon={
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.8906 0.401337L6.94046 5.35034L1.99146 0.401337L0.341797 2.051L5.2908 7L0.341797 11.949L1.99146 13.5987L6.94046 8.64967L11.8906 13.5987L13.5403 11.949L8.5913 7L13.5403 2.051L11.8906 0.401337Z"
                              fill="url(#paint0_linear_732_6768)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_732_6768"
                                x1="6.94105"
                                y1="24.5525"
                                x2="6.94105"
                                y2="0.401337"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#E40086" />
                                <stop offset="1" stopColor="#3D0088" />
                              </linearGradient>
                            </defs>
                          </svg>
                        }
                        onClick={onClose}
                      />
                    )}
                    {renderHeader && (
                      <div className="modal-header">{renderHeader({})}</div>
                    )}
                    {renderContent && (
                      <div className="modal-content">
                        {renderContent({ onClose })}
                      </div>
                    )}
                    {renderFooter && (
                      <div className="modal-footer">
                        {renderFooter({ onClose })}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>,
              document.querySelector('body')!,
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
