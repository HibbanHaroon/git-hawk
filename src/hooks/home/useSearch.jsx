import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../constants'

function useSearch() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    // TODO: Can I use ProfileRoute and can it pick up value somehow
    navigate(`${HOME_ROUTE}${search}`)
  }

  return {
    setSearch,
    handleSearch,
  }
}

export default useSearch
