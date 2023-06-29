const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
