import PropTypes from 'prop-types'

const LoginForm = ({
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
	handleLogin
}) => {
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
                    Username:
					<input
						type='text'
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
                    Password:
					<input
						type='password'
						value={password}
						name='Password'
						onChange={handlePasswordChange}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm