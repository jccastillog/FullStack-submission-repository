
const SearchPhone = ( props ) => {
  return (
<>
    <div>
        search: <input value={props.search} onChange={props.handleSearchChange} />
    </div>
</>
  )}

  export default SearchPhone