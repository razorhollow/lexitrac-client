/** @jsxImportSource @emotion/react */
import{ jsx, css } from '@emotion/react'
import * as React from 'react'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import Lottie from 'lottie-react'
import logo from '../../assets/legal-document.json'
import { Button, Input, FormGroup } from '../../components/lib'
import {Modal, ModalContents, ModalOpenButton} from '../../components/modal'
import LoginPage from '../Login/Login'

function LoginForm({onSubmit, submitButton}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }
  
  return (
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>{React.cloneElement(submitButton, {type: 'submit'})}</div>
    </form>
    )
  }


const Landing = ({ user }) => {
  const login = (formData) => {
    console.log('login', formData)
  }
  const register = (formData) => {
    console.log('register', formData)
  }

  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie animationData={logo} loop={true} style={{height: "300px"}}/>
      <h1>LexiTrac</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal
          css={{zIndex: 9999}}
        >
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </main>
  )
}

export default Landing

