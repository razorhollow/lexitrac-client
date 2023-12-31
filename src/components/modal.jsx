/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import * as React from 'react'
import { VisuallyHidden } from '@reach/visually-hidden';

import {Dialog, CircleButton} from './lib'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog 
      isOpen={isOpen} 
      onDismiss={() => setIsOpen(false)} 
      css={{
        padding: '3rem',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
        width: '100%',
        backgroundColor: 'rgba(1, 1, 1, 0.85)',
      }}
      {...props} 
    />
  )
}

function ModalContents({title, children, ...props}) {
  return (
    <ModalContentsBase {...props}>
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
