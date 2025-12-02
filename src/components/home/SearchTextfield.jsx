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
      placeholder="Github username"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={{ fontFamily: 'Montserrat', fontSize: '14px' }}
    />
  )
}

export default SearchTextfield
