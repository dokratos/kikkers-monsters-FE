import logo from '../assets/svg/react.svg'

const Spinner = () => {
  return (
    <span className='spinner-container'>
      <div className='loading-spinner'>
        <img src={logo} alt='Loading...'/>
      </div>
    </span>
  )
}

export default Spinner