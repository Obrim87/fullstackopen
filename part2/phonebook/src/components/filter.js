const Filter = ({ setSearch }) => {
  return (
    <div>
      Search: <input onChange={(e) => setSearch(e.target.value)}/> 
    </div>
  )
}

export default Filter