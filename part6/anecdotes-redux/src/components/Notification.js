import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: '1px solid',
    marginBottom: 10,
    padding: 10
  }
  return <div style={style}>{notification}</div>
}

export default Notification
