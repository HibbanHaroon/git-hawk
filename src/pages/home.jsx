import { Flex, Typography, Input } from 'antd'
import { ASSETS, HOME_ROUTE } from '../constants'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography
const { Search } = Input

function Home() {
  const navigate = useNavigate()
  const handleSearch = (value) => {
    // TODO: Can I use ProfileRoute and can it pick up value somehow
    navigate(`${HOME_ROUTE}${value}`)
  }
  return (
    <Flex justify="center" align="center" vertical>
      <img src={ASSETS.GITHUB_ICON} alt="Github Icon" />
      <Text>Search for github users like Hawk. You'll love it too.</Text>
      <Search
        size="large"
        placeholder="Search a name"
        onSearch={handleSearch}
      />
    </Flex>
  )
}

export default Home
