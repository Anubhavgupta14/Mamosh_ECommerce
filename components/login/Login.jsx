import React, { useState} from 'react'
import Signup from './SignupForm';
import LoginForm from './LoginForm';
import Navbar from "../common/Navbar2"
import { useRouter } from 'next/router';

const Login = () => {

	const [login, setLogin] = useState(true);
	const router = useRouter();

	return (
		<>
			{/* <Navbar/> */}
			<div className="login-cont">
			<p className='goback' onClick={()=>{router.push('/')}}>Go Back</p>
				<div className="login-left-cont" style={{ transform: login ? 'translateY(0%)' : 'translateY(-50%)' }}>
					<div className="left-one">
						<img src="https://amiri.com/cdn/shop/collections/SHOES_SPLATTER.jpg?v=1700157564&width=1980" alt='' />
					</div>
					<div className="left-one">
						<img src="https://amiri.com/cdn/shop/collections/Nav-Banner_PS24-Womens-1.jpg?v=1707516898&width=1980" alt='' />
					</div>
				</div>
				<div className="login-right-cont" style={{ transform: login ? 'translateY(-50%)' : 'translateY(0%)' }}>
				<Signup setLogin={setLogin} />
					<LoginForm setLogin={setLogin} />
				</div>
			</div>
		</>

	)
}

export default Login