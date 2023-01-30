import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';
import axios from 'axios';


const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData);
            navigate.push('/home');
        } catch (err) {
            setErrors(err.response?.data)
        }
    };

    return (
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div>
                    <img class="mx-auto h-12 w-auto" src={Logo} alt="Snap Tap App" />
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create An Account</h2>
                </div>
                <form class="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="email-address" class="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input
                                id="password1"
                                name="password1"
                                type="password"
                                required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                value={password1}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Confirm Password</label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm">
                            <Link
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                                to='/signin'
                            >
                                <p>Already have an account?</p>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Create An Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm