import { Flex, Row, Col, theme } from 'antd'
import GeneralInformationStatistic from './GeneralInformationStatistic'

function StatisticCol({ children }) {
  return <Col span={8}>{children}</Col>
}

const { useToken } = theme

function GeneralInformation({ user }) {
  const { token } = useToken()

  return (
    <Flex
      vertical
      style={{
        padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
        borderRadius: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: token.colorSecondary,
      }}
    >
      <Row
        justify="space-evenly"
        align="middle"
        style={{ paddingBottom: 'clamp(1.5rem, 4vw, 3.5rem)' }}
      >
        <StatisticCol>
          <GeneralInformationStatistic
            title={'Public Repos'}
            value={user.publicRepos}
          />
        </StatisticCol>
        <StatisticCol>
          <GeneralInformationStatistic title={'Private Repos'} value={0} />
        </StatisticCol>
      </Row>
      <Row justify="space-evenly" align="middle">
        <StatisticCol>
          <GeneralInformationStatistic
            title={'Followers'}
            value={user.followers}
          />
        </StatisticCol>
        <StatisticCol>
          <GeneralInformationStatistic
            title={'Following'}
            value={user.following}
          />
        </StatisticCol>
      </Row>
    </Flex>
  )
}

export default GeneralInformation
