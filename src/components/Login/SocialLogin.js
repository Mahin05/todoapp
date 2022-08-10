import React from 'react';
import google from '../../assets/google.png';
// import fb from '../../../Images/Social/facebook.jpg'
// import git from '../../../Images/Social/github.png'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import './SocialLogin.css';
import Loading from '../Loading/Loading';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const navigate = useNavigate();
    let errorElement;
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (error) {
        errorElement = <p className='text-danger close-color'>Error: {error?.message}</p>
    }
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        navigate(from, { replace: true });
        navigate('/')

    }
    return (
        <div>
            <h2 className='welcome'>Welcome to TODO APP</h2>
            <div style={{ 'margin-top': '60px' }} className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold login-form">Login Form</h2>
                        <form>
                            <div className='btn-style-set'>
                                <button onClick={() => signInWithGoogle()} className='btn btn-color mt-3'><img src={google} alt="" />Continue With Google</button>
                            </div>
                            <p className='mt-5'>{errorElement}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;