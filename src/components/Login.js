import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "", showPassword: false });
    const [errors, setErrors] = useState({});
    let history = useNavigate();
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleViewPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    }

    const handleClick = async () => {
        const response = await fetch("https://inotebook-server.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Logged in successfully", "success")
        } else {
            if (json.validationErrors) {
                json.validationErrors.map((err) => {
                    if (err.param === 'password') {
                        setErrors((prev) => ({ ...prev, password: err.msg }))
                    } else {
                        setErrors((prev) => ({ ...prev, email: err.msg }))
                    }
                })
            }
            if (json.error) {
                props.showAlert("Invalid Details! " + json.error, "danger")
            }
        }

    }

    return (
        <div>
            <div className='text-center mb-3'>
                <h4 className="" href="#"><span className='text-primary'>MY</span><span className='text-danger'>NO</span><span className='text-warning'>T</span><span className='text-primary'>E</span><span className='text-success'>BO</span><span className='text-danger'>OK</span></h4>
                <p>YOUR NOTES ON CLOUD </p>
            </div>

            <div className="container w-50 form">
                <h2 className="text-center"><i><b> Welcome back</b></i></h2>
                <div className="mb-4 input-container">
                    <label htmlFor="email" className="form-label"></label>
                    <input type="email" className="shadow-lg text-white bg-black rounded-0  form-control" onChange={onchange} id="email" name="email" placeholder="Enter your email here " />
                    {errors.email && <span className='error'><i className="fa fa-info-circle"></i> {errors.email}</span>}
                </div>

                <div className="mb-4 input-container">
                    <label htmlFor="password" className="form-label"></label>
                    <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="shadow-lg text-white bg-black rounded-0  form-control" onChange={onchange} id="password" name="password" placeholder='Enter password' />
                    {errors.password && <span className='error'><i className="fa fa-info-circle"></i> {errors.password}</span>}
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary bg-black text-white border-0' onClick={handleClick}>Login</button>
            </div>
            <br />
            <h3 className='text-center text-black last-para'>Don't have an account? <a href="/signup">SignUp</a> </h3>
        </div>
    )
}

export default Login;