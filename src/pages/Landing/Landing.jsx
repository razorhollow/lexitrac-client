/** @jsx jsx */
import{jsx} from '@emotion/react'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import Lottie from 'lottie-react'
import logo from '../../assets/legal-document.json'


const Landing = ({ user }) => {
  return (
    <main>
      <Lottie animationData={logo} loop={true} style={{height: "300px"}}/>
      <h1>LexiTrac</h1>
    </main>
  )
}

export default Landing

