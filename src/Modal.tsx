import React, { ReactNode, useEffect, useState } from 'react';
import './index.css';
export type ModalProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  isOpen?: boolean;
  outerStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  children: ReactNode;
  zIndex?: number;
  backOpacity?: number;
  onOpen?: () => void;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  outerStyle,
  innerStyle,
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

  const oStyle: React.CSSProperties = {
    ...outerStyle,
    zIndex,
    opacity: backOpacity,
  };
  return show ? (
    <div
      className={'react-tiny-modal' + (className ? className : '')}
      style={oStyle}
      {...props}
    >
      <div
        className={'modal-center'}
        style={innerStyle ? innerStyle : undefined}
      >
        {children}
      </div>
    </div>
  ) : null;
};
