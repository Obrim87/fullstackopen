import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) return <div className='empty'></div>
  return <div className='notification'>{notification}</div>
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

export default Notification
