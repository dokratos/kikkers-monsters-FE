import './spinner.css'

interface SprinnerProps {
  newStyle: string
}

const Spinner = ({newStyle}: SprinnerProps) => {
  return (
      <div className={`loading-spinner ${newStyle}`}></div>
  )
}

export default Spinner