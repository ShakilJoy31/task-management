import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const router = useRouter();
    const handleLoginButton = () => {
        toast.success('Welcome back to Our Restaurant!');
        router.push('/task');
    }

    return (
        <div style={{
            backgroundColor: '#19A7CE',
            borderRadius: '5px',
            padding: '20px',
            height: '370px'
        }}>
            <h1 style={{
                color: '#E21818'
            }} className="flex justify-center text-4xl text-white">Login here</h1>
            <div className="flex justify-center mt-12">
                <div>
                    <div className='gap-8 mb-8'>

                        <input type="email" placeholder='Type your email here' className="bg-black border-0 w-96 input focus:outline-none" required />
                        <br />

                        <div className="flex items-center justify-between my-10 bg-black border-0 rounded-lg">
                            <input type='text' placeholder='Type your password' className="mr-4 bg-black border-0 w-72 input focus:outline-none" />
                            {/* {
                                    isPasswordVasible ? <span onClick={()=>setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEyeInvisible size={25}></AiFillEyeInvisible></span> : <span onClick={()=>setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEye size={25}></AiFillEye></span>
                                } */}
                        </div>
                    </div>


                    <button onClick={handleLoginButton} style={{
                        backgroundColor: '#E21818',
                        borderRadius: '5px',
                        color: 'white'
                    }} className={`block w-full mx-auto text-xl normal-case border-0 mb-4 btn`}>Log in</button>


                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;