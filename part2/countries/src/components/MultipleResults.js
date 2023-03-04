const MultipleResults = ({ data, setData }) => {
  if (!data || data.length === 0) return
  if (data.length > 10)
    return (
      <div>
        <p>Too many results, narrow down your search!</p>
      </div>
    )

  const showSelected = (e) => {
    let selected = e.target.attributes[0].nodeValue
    setData(data.filter(d => d.name.common === selected))
  }

  if (data.length > 1)
    return (
      <div>
        {data
          .map(d => 
            <div key={d.name.common}>
              <p style={{display: 'inline-block'}}>{d.name.common}</p>
              <button buttonid={d.name.common} onClick={showSelected}>show</button>
            </div>
        )}
      </div>
    )
}

export default MultipleResults