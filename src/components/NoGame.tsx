import { Link } from 'react-router-dom'
import './noGame.css'

const NoGame = () => {
  return (
    <div className='no-game'>
      <h2>Oops... It looks like we couldn't find the cards you wanted, try with another theme!</h2>
      <Link className='back-home' to='/'>Back home</Link>
    </div>
  )
}

export default NoGame