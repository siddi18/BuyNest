// import React, { useEffect, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useLoginMutation } from '../slices/userApiSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { setCredentials } from '../slices/userSlice'
// import { toast } from 'react-toastify'
// import { useForgotPasswordMutation } from "../slices/userApiSlice"
// import { BACKEND_URL } from '../constants'
// import { FcGoogle } from "react-icons/fc";

// export default function LoginScreen() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const { userInfo } = useSelector(state => state.user)

//     const { search } = useLocation()
//     const sp = new URLSearchParams(search)
//     const redirect = sp.get("redirect") || "/";

//     useEffect(() => {
//         if (userInfo) {
//             navigate(redirect, { replace: true });
//         }
//     }, [navigate, redirect, userInfo]);


//       useEffect(() => {
//         if (userInfo) {
//           if (userInfo.isAdmin) {
//             navigate("/admin"); // Redirect to Admin Dashboard if admin
//           } else {
//             navigate("/"); // Redirect normal users to home
//           }
//         }
//       }, [userInfo, navigate]);

//     const [login, { isLoading }] = useLoginMutation()
//     const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation()

//     const handleLogin = async e => {
//         e.preventDefault()
//         try {
//             const res = await login({ email, password }).unwrap()
//             dispatch(setCredentials({ ...res }))
//             navigate("/")
//             toast.success("Login Successful")
//         } catch (error) {
//             toast.error(error?.data?.message || error?.error)
//         }
//     }

//     const handleForgotPassword = async () => {
//         if (!email) alert("Please enter your email")
//         else {
//             try {
//                 const res = await forgotPassword({ email }).unwrap()
//                 toast.success(res.message)
//             } catch (err) {
//                 toast.error(err?.data?.message || err.error)
//             }
//         }
//     }
//     const handleGoogleAuth =()=>{
//         try{
//             console.log('handle google auth')
//             window.location.href = `${BACKEND_URL}/auth/google/callback`
//         }catch(err){
//             console.log('error')
//             toast.error(err?.data?.message || err.error)
//         }
//     }

   
//     return (
//         <div className="container mx-auto mt-8 mb-28 p-4 max-w-md ">
//             <h2 className="text-2xl font-semibold mb-4">Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="text-gray-700">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="text-gray-700">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <p className="mt-1">
//                     Forgot Password?{' '}
//                     <span className="text-blue-500 cursor-pointer" onClick={handleForgotPassword}>
//                     Click here
//                     </span>
//                 </p>
//                 {isLoadingPassword && <h2 className='text-blue-700'>Loading..</h2>}
//                 <div className="flex items-center space-x-3 mt-4">
//     <button
//         type='submit'
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         onClick={handleLogin}
//         disabled={isLoading}
//     >
//         Login
//     </button>
//     <button
//         type='button'
//         className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
//         onClick={handleGoogleAuth}
//     >
//         <FcGoogle size={24} />
//     </button>
// </div>

//                 {isLoading && <h2 className='text-blue-700'>Loading</h2>}
//             </form>
//             <p className="mt-4">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
//             </p>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/userSlice';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from "../slices/userApiSlice";
import { BACKEND_URL } from '../constants';
import { FcGoogle } from "react-icons/fc";

export default function LoginScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userInfo } = useSelector(state => state.user);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                navigate("/admin");
            } else {
                navigate(redirect);  // ✅ Redirect correctly after login
            }
        }
    }, [userInfo, navigate, redirect]);

    const [login, { isLoading }] = useLoginMutation();
    const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);  // ✅ Redirect to correct page
            toast.success("Login Successful");
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) alert("Please enter your email");
        else {
            try {
                const res = await forgotPassword({ email }).unwrap();
                toast.success(res.message);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleGoogleAuth = () => {
        try {
            console.log('handle google auth');
            window.location.href = `${BACKEND_URL}/auth/google/callback`;
        } catch (err) {
            console.log('error');
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto mt-8 mb-28 p-4 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <p className="mt-1">
                    Forgot Password?{' '}
                    <span className="text-blue-500 cursor-pointer" onClick={handleForgotPassword}>
                        Click here
                    </span>
                </p>
                {isLoadingPassword && <h2 className='text-blue-700'>Loading..</h2>}
                <div className="flex items-center space-x-3 mt-4">
                    <button
                        type='submit'
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        Login
                    </button>
                    <button
                        type='button'
                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                        onClick={handleGoogleAuth}
                    >
                        <FcGoogle size={24} />
                    </button>
                </div>

                {isLoading && <h2 className='text-blue-700'>Loading</h2>}
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>.
            </p>
        </div>
    );
}

