import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (!message) return <div className='empty'></div>

  if (type === 'error') return <div className='error'>{message}</div>

  return <div className='notification'>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification
