const Notification = ({ message }: { message: string }) => {
  const notificationStyle = {
    color: 'red'
  };

  return (
    <div style={notificationStyle}>
      {message ? <p>Error: {message}</p> : null}
    </div>
  );
};

export default Notification;
