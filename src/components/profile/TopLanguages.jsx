import { Flex, Row, Space, Typography, theme } from 'antd'

const { Text } = Typography
const { useToken } = theme

function TopLanguages({ languages }) {
  const { token } = useToken()

  const pairs = []
  for (let i = 0; i < languages.length; i += 2) {
    pairs.push(languages.slice(i, i + 2))
  }

  return (
    <Flex
      vertical
      style={{
        padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
        borderRadius: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: token.colorSecondary,
      }}
    >
      <Flex vertical justify="center" align="middle" gap={24}>
        <Text
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            color: token.colorAccent,
          }}
        >
          Your Top Languages
        </Text>
        {pairs.map((pair, idx) => (
          <Row
            key={idx}
            justify="space-evenly"
            align="middle"
            style={{
              paddingBottom:
                idx === pairs.length - 1 ? 0 : 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            {pair.map((langObj, subIdx) => {
              const [lang, icon] = Object.entries(langObj)[0]
              return (
                <Row key={subIdx} span={8} style={{ width: '50%' }}>
                  <Space style={{ gap: 16 }}>
                    <img
                      src={
                        icon !== 'default'
                          ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`
                          : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg`
                      }
                      alt={`${lang} Icon`}
                      style={{
                        width: 'clamp(48px, 6vw, 64px)',
                        height: 'auto',
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Montserrat',
                        fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
                        fontWeight: 400,
                        color: token.colorAccent,
                      }}
                    >
                      {lang}
                    </Text>
                  </Space>
                </Row>
              )
            })}
          </Row>
        ))}
      </Flex>
    </Flex>
  )
}

export default TopLanguages
