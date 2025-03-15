import { Flex, Row, Col } from 'antd'
import GeneralInformationStatistic from './GeneralInformationStatistic'

function StatisticCol({ children }) {
  return (
    <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
      {children}
    </Col>
  )
}

function GeneralInformation({ user }) {
  return (
    <Flex vertical style={{ paddingBottom: 32 }}>
      <Row justify="center" gutter={[16, 16]} style={{ paddingBottom: 16 }}>
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
      <Row justify="center" gutter={[16, 16]} style={{ paddingBottom: 16 }}>
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
