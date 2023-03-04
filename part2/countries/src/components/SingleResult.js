const SingleResult = ({ data }) => {
  let languageArr = Object.values(data[0].languages)
  return (
    <div>
      <h1>{data[0].name.common}</h1>
      <p>Capital: {data[0].capital.join(', ')}</p>
      <p>Total Area: {data[0].area}</p>
      <h3>Languages</h3>
      <ul>
        {languageArr
          .map(l => 
            <li key={l}>{l}</li>)}
      </ul>
      <img src={data[0].flags.png} alt={data[0].flags.alt} />
    </div>
  )
}

export default SingleResult