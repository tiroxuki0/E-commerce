import styles from './styles/styles.module.scss'
import React, { useEffect, useRef } from 'react'

const Modal = (props: any) => {
  const modal = useRef<HTMLDivElement>(null)
  const overlayClickHandler = (e: any) => {
    if (e.target === modal.current) {
      props.close()
    }
  }
  useEffect(() => {
    styleHTML()
  }, [props?.status])
  const styleHTML = () => {
    if (props?.status) {
      document.getElementsByTagName('html')[0].style.overflow= "hidden"
    } else {
      document.getElementsByTagName('html')[0].style.overflow= "visible"
    }
  }

  return (
    <div className={`${styles.Modal} ${props.status === true ? styles.show : ''} ${props?.className || ''} `}
         onClick={overlayClickHandler} ref={modal}>
      <div className={`${styles.modalContainer} ${props?.fullWidth === true ? styles.fullWidth : ''} ${props?.classNameContainer || ''} ${props?.fullWidthOnPhone === true ? styles.fullWidthOnPhone : ''}`}>
        {props?.children}
      </div>
    </div>
  )
}
export default Modal