import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './index.css';
import { calcTranslate, checkBoundingBox } from './utils';

type ContentType = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => ReactNode;
export type PopupProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  isOpen?: boolean;
  children: ({
    show,
    setShow,
  }: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactNode;
  content: ContentType;
  zIndex?: number;
  innerStyle?: React.CSSProperties;
  position?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | Array<'left' | 'right' | 'top' | 'bottom'>;
  align?: 'center' | 'start' | 'end';
  outerPadding?: number;
  reposition?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export interface ContentProps {
  content: ContentType;
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
  align: 'center' | 'start' | 'end';
  reposition: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

const Content: React.FC<ContentProps> = ({
  content,
  iStyles,
  className,
  position,
  childNode,
  outerPadding = 0,
  align,
  reposition,
  setShow,
  show,
  ...props
}) => {
  const popupContentRef = useRef<HTMLDivElement | null>(null);

  let finalPosition: 'left' | 'right' | 'top' | 'bottom';
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

      if (!reposition) {
        if (typeof position === 'string') {
          finalPosition = position;
        }
        finalPosition = position[0] as 'left' | 'right' | 'top' | 'bottom';
      } else {
        if (typeof position === 'string' || position.length === 1) {
          if (Array.isArray(position)) {
            position = position[0];
          }
          const { top, left } = calcTranslate(
            size,
            childSize,
            position,
            outerPadding,
            align
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

        if (Array.isArray(position)) {
          const availablePositions = position.filter((pos) => {
            if (popupContentRef.current) {
              const { top, left } = calcTranslate(
                size,
                childSize,
                pos,
                outerPadding,
                align
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
      }
      const { top, left } = calcTranslate(
        size,
        childSize,
        finalPosition,
        outerPadding,
        align
      );

      popupContentRef.current.style.transform = `translate(${left}px, ${top}px)`;
    }
  }, []);

  const contentNode = content({ setShow, show });
  return (
    <div
      className={'popup-content' + (className ? className : '')}
      style={iStyles}
      {...props}
      ref={popupContentRef}
    >
      {contentNode}
    </div>
  );
};

export const Popup: React.FC<PopupProps> = ({
  children,
  isOpen = false,
  content,
  zIndex = 100,
  className,
  innerStyle,
  position = ['left', 'right', 'top', 'bottom'],
  outerPadding,
  align = 'center',
  reposition = true,
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
          content={content}
          iStyles={iStyles}
          className={className}
          position={position}
          childNode={childNodeRef}
          outerPadding={outerPadding}
          align={align}
          reposition={reposition}
          setShow={setShow}
          show={show}
          {...props}
        />
      ) : null}
      <div className="popup-children" ref={childNodeRef}>
        {childNode}
      </div>
    </div>
  );
};
