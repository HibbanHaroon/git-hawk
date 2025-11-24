import { Flex, theme } from 'antd'
import './styles/loader.css'

const { useToken } = theme

/**
 * The circle has a fade effect from left to right using a conic gradient mask.
 */
function Loader() {
  const { token } = useToken()

  return (
    <Flex
      className="loader"
      align="center"
      justify="center"
      style={{
        backgroundColor: token.colorPrimary,
      }}
    >
      <div className="loader-circles-container">
        <div
          className="loader-circle"
          style={{
            width: '60px',
            height: '60px',
            borderColor: token.colorText,
          }}
        />
      </div>
    </Flex>
  )
}

export default Loader
