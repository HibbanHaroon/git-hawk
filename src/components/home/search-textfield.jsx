import { useSearch } from '../../hooks'

function SearchTextfield() {
  const { setSearch, handleSearch } = useSearch()

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <input
      type="text"
      id="search"
      name="search"
      placeholder="Search a name"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchTextfield
