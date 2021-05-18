import React, { ReactNode, useEffect, useState } from 'react';
import './index.css';
export interface ModalProps {
  active: boolean;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, active = false }) => {
  const [show, setShow] = useState<boolean>(active);
  useEffect(() => {
    setShow(active);
  }, [active]);

  return show ? (
    <div className="react-tiny-modal">
      <div className="modal-center">{children}</div>
    </div>
  ) : null;
};
