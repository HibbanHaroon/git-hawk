import { Flex, Grid, theme } from 'antd'
import { useParams } from 'react-router-dom'
import { useProfileData, useHistoricalEvent } from '../hooks'
import {
  CreationTime,
  FollowingFact,
  GeneralInformation,
  RandomQuote,
  TotalStars,
  UserInformation,
  DadJoke,
  OnThisDay,
  TopRepository,
  TopLanguages,
} from '../components'

const { useBreakpoint } = Grid
const { useToken } = theme

function Profile() {
  const { token } = useToken()
  const { username } = useParams()
  const { user, repositories, quote, joke, topRepository, topLanguages } =
    useProfileData(username)
  const { event } = useHistoricalEvent(user?.createdAt)
  const screens = useBreakpoint()
  const isXSDevice = !screens.sm

  if (
    !user ||
    !repositories ||
    !quote ||
    !joke ||
    (user && event == null) ||
    (repositories && !topRepository) ||
    (repositories && !topLanguages)
  ) {
    return <>Loading...</>
  }

  return (
    <Flex
      align="center"
      vertical
      style={{
        backgroundColor: token.colorPrimary,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Flex
        vertical
        style={{
          width: isXSDevice ? 'min(75vw, 650px)' : 'min(60vw, 650px)',
          height: '100%',
          gap: 48,
        }}
      >
        <UserInformation user={user} />
        <GeneralInformation user={user} />
        <RandomQuote quote={quote} />
        <CreationTime user={user} />
        <FollowingFact user={user} />
        <TotalStars repositories={repositories} />
        <DadJoke joke={joke} />
        <OnThisDay event={event} />
        <TopRepository repository={topRepository} />
        <TopLanguages languages={topLanguages} />
      </Flex>
    </Flex>
  )
}

export default Profile
