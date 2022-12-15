import '../components/ButtonFuel.css'

const ButtonFuel = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default ButtonFuel
