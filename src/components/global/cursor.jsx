import { forwardRef } from 'react'
import './styles/cursor.css'

const Cursor = forwardRef((props, ref) => {
  return <div ref={ref} className="cursor"></div>
})

Cursor.displayName = 'Cursor'

export default Cursor
