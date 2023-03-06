import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./LoginSlice";
import { useNavigate } from 'react-router-dom';
import { RootState } from 'app/redux/store';
import savingsGoals from '../../assets/savings-goals.webp';
import loader from '../../assets/loader.svg';
import logo from '../../assets/shoalLogo.svg';

import './Login.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: 'rec_cfusn4hijivemrp9k5kg', password: '',
    });
    const [isError, setIsError] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const authError = useSelector((state: RootState) => state.persistedReducer.Auth.error);
    const isLoggedIn = useSelector((state: RootState) => state.persistedReducer.Auth.isLoggedIn);
    const isLoading = useSelector((state: RootState) => state.persistedReducer.Auth.loading);

    const formSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setValues({ email: '', password: '' });
        if( values.email === '' || values.password === ''){
            setIsError(true);
            return
        }
        dispatch(login({
            email: values.email, password: values.password,
        }))
    };

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate('/Dashboard');
        }

    }, [])

    if (isLoggedIn === true) {
        navigate('/Dashboard');
    }

    // if(authError != null){
    //     setIsLoginFailed(!setIsLoginFailed)
    // }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setIsError(false)
    }

    return (
        <div className="loginWrapper">
            <div className="left-side">
                <img src={savingsGoals} alt="Earn fixed interest on your savings" className="savingsGoalsImage" />
                <h2>Earn fixed interest on your savings</h2>
                <p>It is easy to save through Shoal</p>
                <p>Just choose how much and how long you want to save for</p>
                <p>The longer you save, the higher your fixed rate of interest</p>
            </div>
            <form className="form" onSubmit={formSubmit}>
                <img src={logo} alt="Shoal - A new sustainable way to save money" className="logo" />
                <h3>Welcome to Shoal</h3>
                <p>Your savings help support a portfolio of sustainable projects, like rolling out renewable energy and providing micro-loans.</p>
                <div className="formControl">
                    <label>User Id<span className="mandatory">*</span></label>
                    <input type="text" autoComplete="off" className="formInput" value={values.email} name="email" onChange={handleChange} />
                </div>
                <div className="formControl">
                    <label>Password<span className="mandatory">*</span></label>
                    <input type="password" autoComplete="off" className="formInput" value={values.password} name="password" onChange={handleChange} />
                </div>
                <button type="submit" className='buttonPrimary'> {isLoading === true && isLoggedIn === false ? <span className="loader"><img src={loader} /> Loading</span> : 'Login'} </button>
                {isError && <p className="error">User id or password should not be empty.</p>}
                {!isLoginFailed && <p className="error">{authError}</p>}
            </form>
        </div>
    )
};

export default Login;