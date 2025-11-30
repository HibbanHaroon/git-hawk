import { useState, useRef } from 'react'
import { theme } from 'antd'
import { useTextReveal } from '../../hooks'
import { ASSETS } from '../../constants'

const { useToken } = theme

function Socials() {
  const { token } = useToken()
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false)
  const [isGithubHovered, setIsGithubHovered] = useState(false)
  const [isLetterboxdHovered, setIsLetterboxdHovered] = useState(false)
  const [isInstagramHovered, setIsInstagramHovered] = useState(false)

  const linkRefs = useRef([])

  const socialLinks = [
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/hibbanharoon/',
      icon: ASSETS.LINKEDIN_ICON,
      isHovered: isLinkedinHovered,
      setIsHovered: setIsLinkedinHovered,
      width: '1.3em',
      height: '1.3em',
    },
    {
      name: 'github',
      href: 'https://github.com/HibbanHaroon',
      icon: ASSETS.GITHUB_ICON,
      isHovered: isGithubHovered,
      setIsHovered: setIsGithubHovered,
      width: '2em',
      height: '2em',
    },
    {
      name: 'letterboxd',
      href: 'https://letterboxd.com/hibbanharoon/',
      icon: ASSETS.LETTERBOXD_ICON,
      isHovered: isLetterboxdHovered,
      setIsHovered: setIsLetterboxdHovered,
      width: '2em',
      height: '2em',
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/hibbanharoon/',
      icon: ASSETS.INSTAGRAM_ICON,
      isHovered: isInstagramHovered,
      setIsHovered: setIsInstagramHovered,
      width: '1.5em',
      height: '1.5em',
    },
  ]

  const { containerRef } = useTextReveal(linkRefs, {
    isMutableRef: true,
    duration: 0.5,
    overlap: 0.1,
    expectedCount: socialLinks.length, // Waiting for all 4 links to be ready
  })

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        zIndex: 1000,
      }}
    >
      {socialLinks.map((link, index) => (
        <a
          key={link.name}
          ref={(el) => {
            linkRefs.current[index] = el
          }}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => link.setIsHovered(true)}
          onMouseLeave={() => link.setIsHovered(false)}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: link.isHovered
              ? token.colorPrimary
              : token.colorSecondary,
            border: 'none',
            transition: 'background-color 0.3s ease',
            textDecoration: 'none',
            cursor: 'none',
          }}
        >
          <div
            style={{
              width: link.width,
              height: link.height,
              maskImage: `url(${link.icon})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${link.icon})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              backgroundColor: link.isHovered ? '#B3B3B3' : token.colorAccent,
              transition: 'background-color 0.3s ease',
            }}
            aria-label={`${link.name} icon`}
          />
        </a>
      ))}
    </div>
  )
}

export default Socials
