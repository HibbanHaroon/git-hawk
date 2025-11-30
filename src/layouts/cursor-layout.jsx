import { useEffect, useRef } from 'react'
import '../components/global/styles/cursor.css'

function CursorLayout({ children }) {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current || document.querySelector('.cursor')
    if (!cursor) return

    cursorRef.current = cursor
    const cursorSize = 32

    cursor.style.width = `${cursorSize}px`
    cursor.style.height = `${cursorSize}px`
    cursor.style.opacity = '0'

    const handleMouseMove = (e) => {
      if (!cursor) return

      // Check if mouse is over textfield
      const element = document.elementFromPoint(e.clientX, e.clientY)
      const isOverTextfield = element?.closest('.textfield') !== null

      // Using clientX/clientY for viewport coordinates
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursor.style.opacity = isOverTextfield ? '0' : '1'
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Also handle focus/blur for textfield
    const attachTextfieldListeners = () => {
      const textfield = document.querySelector('.textfield')
      if (textfield) {
        const handleFocus = () => {
          if (cursor) cursor.style.opacity = '0'
        }
        const handleBlur = () => {
          if (cursor) cursor.style.opacity = '1'
        }
        textfield.addEventListener('focus', handleFocus)
        textfield.addEventListener('blur', handleBlur)
      }
    }

    // Attach immediately and with delays to catch textfield that loads later
    attachTextfieldListeners()
    const timeout1 = setTimeout(attachTextfieldListeners, 100)
    const timeout2 = setTimeout(attachTextfieldListeners, 500)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [])

  return (
    <div>
      {children}
      <div ref={cursorRef} className="cursor"></div>
    </div>
  )
}

export default CursorLayout
