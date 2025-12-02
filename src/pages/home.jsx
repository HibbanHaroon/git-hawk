import { useRef } from 'react'
import { Flex, Typography, Input, theme } from 'antd'
import { useTextReveal } from '../hooks'
import { ASSETS } from '../constants'
import { SearchTextfield, SemiCirclesContainer } from '../components'

const { Text } = Typography
const { useToken } = theme

function Home() {
  const { token } = useToken()

  const githubIconRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const textfieldRef = useRef(null)

  const { containerRef } = useTextReveal(
    [githubIconRef, titleRef, descriptionRef, textfieldRef],
    { delay: 0.5 }
  )

  return (
    <Flex
      ref={containerRef}
      justify="center"
      align="center"
      vertical
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: token.colorPrimary,
      }}
    >
      <Flex justify="center" align="center" vertical style={{ zIndex: '10' }}>
        <img
          ref={githubIconRef}
          src={ASSETS.GITHUB_ICON}
          alt="Github Icon"
          style={{ opacity: 0 }}
        />
        <Text
          ref={titleRef}
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            lineHeight: 'normal',
            color: token.colorAccent,
            marginBlock: '12px 16px',
            opacity: 0,
          }}
        >
          Hawk your Git
        </Text>
        <Text
          ref={descriptionRef}
          style={{
            fontFamily: 'Montserrat',
            fontSize: 'clamp(0.7rem, 1.2vw, 1.2rem)',
            marginTop: '1rem',
            lineHeight: 'normal',
            textAlign: 'center',
            color: token.colorAccent,
            opacity: 0,
          }}
        >
          A minimalist platform where you can look for your GitHub stats.
        </Text>
        <div ref={textfieldRef} style={{ opacity: 0 }}>
          <SearchTextfield />
        </div>
      </Flex>
      <SemiCirclesContainer />
    </Flex>
  )
}

export default Home
