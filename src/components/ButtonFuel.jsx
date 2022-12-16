import '../components/ButtonFuel.css'

const ButtonFuel = ({ text, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}

export default ButtonFuel
