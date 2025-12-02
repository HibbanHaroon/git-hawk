import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../../constants'
import Button from './Button'

function BackButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 'clamp(1.5rem, 3vw, 2.5rem)',
        left: 'clamp(1.5rem, 3vw, 2.5rem)',
        zIndex: 1000,
      }}
    >
      <Button
        icon={ASSETS.BACK_ICON}
        alt="Back to home"
        onClick={handleClick}
      />
    </div>
  )
}

export default BackButton
