import { useDispatch } from 'react-redux'
import { filterString } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilter = e => {
    dispatch(filterString(e.target.value))
  }

  return (
    <div>
      Filter:{' '}
      <input
        type='text'
        name='filter'
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter
