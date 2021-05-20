import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { modalCenterStyles, modalStyles } from './styles';

export type ModalProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  isOpen?: boolean;
  outerStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  children: ReactNode;
  zIndex?: number;
  backOpacity?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onClickOutside?: () => void;
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
  onClickOutside,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(isOpen);
  useEffect(() => {
    if (isOpen) onOpen?.();
    if (!isOpen) onClose?.();
    setShow(isOpen);
  }, [isOpen]);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (!contentRef.current?.contains(e.target as Node | null)) {
      onClickOutside?.();
    }
  };
  useEffect(() => {
    document?.addEventListener('click', handleClick);
    return () => document?.removeEventListener('click', handleClick);
  }, []);
  const oStyle: React.CSSProperties = {
    ...outerStyle,
    zIndex,
    backgroundColor: `rgba(0,0,0,${backOpacity})`,
  };
  return show ? (
    <div
      className={className ? className : ''}
      style={{ ...modalStyles, ...oStyle }}
      {...props}
    >
      <div style={{ ...modalCenterStyles, ...innerStyle }} ref={contentRef}>
        {children}
      </div>
    </div>
  ) : null;
};
