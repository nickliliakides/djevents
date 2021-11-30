import { useEffect, useContext, useRef } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'
import MetaLayout from '@/components/MetaLayout'
import { FaUser } from 'react-icons/fa'

const RegisterPage = () => {
	const usernameInputRef = useRef()
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const passwordConfirmInputRef = useRef()

  const {register, error} = useContext(AuthContext)

	useEffect(() => error && toast.error(error))

	const handleSubmit = e => {
		e.preventDefault()
		if (
			passwordInputRef.current.value !==
			passwordConfirmInputRef.current.value
		) {
			toast.error('Passwords do not match!')
			return
		}
		register({
			email: emailInputRef.current.value,
			username: usernameInputRef.current.value,
			password: passwordInputRef.current.value
		})
	}

	return (
		<MetaLayout title="User Registration">
			<ToastContainer />
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							ref={usernameInputRef}
						/>
					</div>
					<div>
						<label htmlFor="email">Email Address</label>
						<input type="email" name="email" ref={emailInputRef} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							ref={passwordInputRef}
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							ref={passwordConfirmInputRef}
						/>
					</div>
					<input type="submit" value="Register" className="btn" />
				</form>
				<p>
					Already have an account?{' '}
					<Link href="/account/login">Sign In</Link>
				</p>
			</div>
		</MetaLayout>
	)
}

export default RegisterPage
