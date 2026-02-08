import { MouseEvent, useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps { 
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const haendleKeydown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') onClose()
    } 
    document.addEventListener('keydown', haendleKeydown)
    document.body.style.overflow = 'hidden'
    return () => {
    document.removeEventListener('keydown', haendleKeydown)
    document.body.style.overflow = ''
    }
  }, [onClose])
  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) onClose()
  }
  return createPortal (
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={closeModal}>
    <div className={css.modal}>{children}</div>
  </div>, document.body)
}
