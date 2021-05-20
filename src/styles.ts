import { CSSProperties } from 'react';

export const modalStyles: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
};

export const modalCenterStyles: CSSProperties = {
  minWidth: '200px',
  minHeight: '200px',
};

export const popupStyles: CSSProperties = {
  position: 'relative',
  verticalAlign: 'middle',
};

export const popupContentStyles: CSSProperties = {
  width: 'auto',
  height: 'auto',
  position: 'absolute',
};
