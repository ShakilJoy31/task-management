import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const SignUp = () => {
    // All states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 


    const [isPasswordVasible, setIsPasswordVasible] = useState(true);
    const [signedInUser, setSignedInUser] = useState([]);
    const [local, setLocal] = useState(false);


    const formData = { name: name, email: email, password: password};

    useEffect(() => {
        localStorage.setItem('userAn', JSON.stringify(formData));
        
        const checkLocalStorage = localStorage.getItem('userAn');
        setLocal(checkLocalStorage); 
    }, [email])

    const handleSignInButton = () => {
        if (email && ( name || password)) {
            toast.success('Sign up successful')
            router.push('/task'); 
            
    }
    else{
        toast.error('UPPS! This email is exist. Try another else.'); 
    }
    }
    return (
        <div>
            <div style={{
                backgroundColor: '#19A7CE',
                borderRadius: '5px',
                padding: '20px',
            }}>
                <h1 style={{
                    color:'#E21818'
                }} className="flex justify-center text-4xl text-white">Sign up here</h1>
                <div className="flex justify-center mt-6">
                    <div>
                        <div className='mb-8'>
                            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Type your name here' className="bg-black border-0 w-96 input focus:outline-none" />
                            <br />
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Type your email here' className="mt-6 bg-black border-0 w-96 input focus:outline-none" required />
                            <br />
                            <div className="flex items-center justify-between my-6 bg-black border-0 rounded-lg">

                                <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Type your password' className="mr-4 bg-black border-0 w-72 input focus:outline-none" />
                                {
                                    isPasswordVasible ? <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEyeInvisible size={25}></AiFillEyeInvisible></span> : <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEye size={25}></AiFillEye></span>
                                }
                            </div>


                        </div>


                        <button onClick={handleSignInButton} style={{
                            backgroundColor: '#E21818',
                            borderRadius: '5px',
                            color:'white'
                        }} className={`block w-full mx-auto text-xl normal-case border-0 mb-4 btn`}>Sign up</button>

                        {/* ${FoodProductStyle.confirmOrder} */}


                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default SignUp; 