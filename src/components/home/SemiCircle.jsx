import { useState, forwardRef } from 'react'

const SemiCircle = forwardRef(function SemiCircle(
  { width, height, backgroundColor, zIndex, children },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)

  let timeoutId = null

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsHovered(false)
    }, 200)
  }

  return (
    <div
      ref={ref}
      style={{
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: backgroundColor,
        borderRadius: '100%',
        zIndex: zIndex,
        transition: 'transform 0.2s ease-in-out',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseEnter}
    >
      {children}
    </div>
  )
})

SemiCircle.displayName = 'SemiCircle'

export default SemiCircle
