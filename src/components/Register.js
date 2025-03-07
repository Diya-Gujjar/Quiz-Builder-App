import React from 'react'
import "../App.css"
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../schemas'

const initialValues = { name: '', email: '', password: '', }
function Register({ setIsRegistered }) {
    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
    } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            const storedData = JSON.parse(localStorage.getItem('userRegistration'));
            const userArray = Array.isArray(storedData) ? storedData : [];
            userArray.push(values);
            localStorage.setItem("userRegistration", JSON.stringify(userArray));
            alert('Registration data saved in localStorage!');
            setIsRegistered(true);
            navigate('/signin');
        },
    });

    const handleClear = () => {
        resetForm();
    };

    return (
        <div>
            <div><h1>New User! Register Your Self</h1></div>
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='inputlbl'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            placeholder="Enter your Name"
                            name='name'
                            id='name'
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}>
                        </input>
                        {errors.name && touched.name ?
                            (<p className="form-error">{errors.name}</p>) : null}
                    </div>

                    <div className='inputlbl'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            placeholder="Enter your Email"
                            name='email'
                            id='email'
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}>
                        </input>
                        {errors.email && touched.email ?
                            (<p className="form-error">{errors.email}</p>) : null}
                    </div>

                    <div className='inputlbl'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            placeholder="Enter your Password"
                            name='password'
                            id='password'
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}>
                        </input>
                        {errors.password && touched.password ?
                            (<p className="form-error">{errors.password}</p>) : null}
                    </div>

                    <div>
                        <button type='submit'>Register</button>
                        <button type="button" onClick={handleClear}>Clear Form</button>
                    </div>

                    <div>Already a User <a href="/signin" className='clk-lnk' >SignIn</a> </div>
                </div>
            </form>
        </div>
    )
}

export default Register;