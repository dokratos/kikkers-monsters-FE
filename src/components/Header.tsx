import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1 className='title'>Kikkers&Monsters</h1>
      <Link to={'/'}>Home</Link>
    </header>
  )
}

export default Header
