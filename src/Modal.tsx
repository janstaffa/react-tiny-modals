import React, { ReactNode, useEffect, useState } from 'react';
import './index.css';
export type ModalProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  isOpen?: boolean;
  outerStyles?: React.CSSProperties;
  innerStyles?: React.CSSProperties;
  children: ReactNode;
  zIndex?: number;
  backOpacity?: number;
  onOpen?: () => void;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  outerStyles,
  innerStyles,
  zIndex = 100,
  className,
  backOpacity = 0.8,
  onOpen,
  onClose,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(isOpen);
  useEffect(() => {
    if (isOpen) onOpen?.();
    if (!isOpen) onClose?.();
    setShow(isOpen);
  }, [isOpen]);

  const oStyles: React.CSSProperties = {
    ...outerStyles,
    zIndex,
    opacity: backOpacity,
  };
  return show ? (
    <div
      className={'react-tiny-modal' + (className ? className : '')}
      style={oStyles}
      {...props}
    >
      <div
        className={'modal-center'}
        style={innerStyles ? innerStyles : undefined}
      >
        {children}
      </div>
    </div>
  ) : null;
};
