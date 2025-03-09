import { Cursor } from '../components'

function CursorLayout({ children }) {
  const handleMouseMove = (e) => {
    const cursor = document.querySelector('.cursor')
    if (cursor) {
      const cursorSize = 32
      const maxX = window.innerWidth - cursorSize / 2
      const maxY = window.innerHeight - cursorSize / 2
      const x = Math.min(e.pageX, maxX)
      const y = Math.min(e.pageY, maxY)

      cursor.style.width = `${cursorSize}px`
      cursor.style.height = `${cursorSize}px`

      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`
    }
  }

  const handleMouseLeave = () => {
    const cursor = document.querySelector('.cursor')
    if (cursor) {
      cursor.style.display = 'none'
    }
  }

  const handleMouseEnter = () => {
    const cursor = document.querySelector('.cursor')
    if (cursor) {
      cursor.style.display = ''
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      <Cursor />
    </div>
  )
}

export default CursorLayout
