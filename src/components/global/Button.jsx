import { useState } from 'react'
import { theme } from 'antd'

const { useToken } = theme

function Button({ icon, alt, onClick }) {
  const { token } = useToken()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      style={{
        width: 'clamp(40px, 5vw, 56px)',
        height: 'clamp(40px, 5vw, 56px)',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: isHovered ? token.colorPrimary : token.colorSecondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={icon}
        alt={alt}
        style={{
          width: '50%',
          height: '50%',
          filter: isHovered
            ? 'brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(0%) hue-rotate(159deg) brightness(96%) contrast(87%)'
            : 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(25%) hue-rotate(159deg) brightness(107%) contrast(96%)',
          transition: 'filter 0.2s ease',
        }}
      />
    </button>
  )
}

export default Button
