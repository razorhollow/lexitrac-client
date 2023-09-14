/** @jsxImportSource @emotion/react */
import{ jsx, css } from '@emotion/react'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import Lottie from 'lottie-react'
import logo from '../../assets/legal-document.json'
import { Button, Input, FormGroup } from '../../components/lib'
import {Modal, ModalContents, ModalOpenButton} from '../../components/modal'
import LoginPage from '../Login/Login'

// services
import * as authService from '../../services/authService'

function LoginForm({ submitButton, handleAuthEvt }) {
  const navigate = useNavigate()

  const [message, setMessage] = React.useState('')
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = event => {
    setMessage('')
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    console.log(formData)
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }  

  React.useEffect(() => {
    console.log(formData)
  })
  
  return (
    <form
    autoComplete='off'
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
        <Input id="username" onChange={handleChange} type='text' value={email} name='email'/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" onChange={handleChange} value={password} name='password'/>
      </FormGroup>
      <div>{React.cloneElement(submitButton, {type: 'submit', disabled: isFormInvalid() })}</div>
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

