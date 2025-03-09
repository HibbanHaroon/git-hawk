import { useSearch } from '../../hooks'
import './styles/search-textfield.css'

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
      className="textfield"
      name="search"
      placeholder="GitHub username"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchTextfield
