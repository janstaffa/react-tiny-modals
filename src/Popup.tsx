import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './index.css';
import { calcTranslate, checkBoundingBox } from './utils';
export type ModalProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  isOpen?: boolean;
  children: ({
    show,
    setShow,
  }: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
  content: ReactNode;
  zIndex?: number;
  innerStyle?: React.CSSProperties;
  position:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | Array<'left' | 'right' | 'top' | 'bottom'>;
  outerPadding?: number;
  onOpen?: () => void;
  onClose?: () => void;
};

export interface ContentProps {
  iStyles: React.CSSProperties;
  className: string | undefined;
  position:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | Array<'left' | 'right' | 'top' | 'bottom'>;
  childNode: React.MutableRefObject<HTMLDivElement | null>;
  outerPadding?: number;
}

const Content: React.FC<ContentProps> = ({
  children,
  iStyles,
  className,
  position,
  childNode,
  outerPadding = 0,
  ...props
}) => {
  const popupContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (popupContentRef.current) {
      const size = {
        width: popupContentRef.current.getBoundingClientRect().width,
        height: popupContentRef.current.getBoundingClientRect().height,
      };

      const childSize = {
        width: childNode.current?.getBoundingClientRect().width || 0,
        height: childNode.current?.getBoundingClientRect().height || 0,
      };

      if (typeof position === 'string') {
        const { top, left } = calcTranslate(
          size,
          childSize,
          position,
          outerPadding
        );
        const invalidBoundingBox = checkBoundingBox(
          popupContentRef.current,
          top,
          left
        );

        if (!Array.isArray(position) && invalidBoundingBox) {
          position = ['left', 'right', 'top', 'bottom'];
        }
      }

      let finalPosition: string;
      if (Array.isArray(position)) {
        const availablePositions = position.filter((pos) => {
          if (popupContentRef.current) {
            const { top, left } = calcTranslate(
              size,
              childSize,
              pos,
              outerPadding
            );
            return !checkBoundingBox(popupContentRef.current, top, left);
          }
          return true;
        });

        if (availablePositions.length > 0) {
          finalPosition = availablePositions[0];
        } else {
          finalPosition = position[0];
        }
      } else {
        finalPosition = position;
      }

      const { top, left } = calcTranslate(
        size,
        childSize,
        finalPosition,
        outerPadding
      );
      popupContentRef.current.style.transform = `translate(${left}px, ${top}px)`;
    }
  }, []);
  return (
    <div
      className={'popup-content' + (className ? className : '')}
      style={iStyles}
      {...props}
      ref={popupContentRef}
    >
      {children}
    </div>
  );
};

export const Popup: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  content,
  zIndex = 100,
  className,
  innerStyle,
  position,
  outerPadding,
  onOpen,
  onClose,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(isOpen);

  const childNode = children({ show, setShow });
  const childNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) onOpen?.();
    if (!isOpen) onClose?.();
    setShow(isOpen);
  }, [isOpen]);

  const iStyles: React.CSSProperties = {
    ...innerStyle,
    zIndex,
  };
  return (
    <div className="react-tiny-popup">
      {show ? (
        <Content
          iStyles={iStyles}
          className={className}
          position={position}
          childNode={childNodeRef}
          outerPadding={outerPadding}
          {...props}
        >
          {content}
        </Content>
      ) : null}
      <div className="popup-children" ref={childNodeRef}>
        {childNode}
      </div>
    </div>
  );
};
