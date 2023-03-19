import { useState, useEffect } from "react";
import Success from "./Success";
import { BiBlock, BiUserPlus } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { addUser } from '../components/lib/helper';
import { updateUser, getUser } from "./lib/helper";
import axios, { Axios } from "axios";
import { useRouter } from "next/router";

export default function Form({ isDataChanged, setIsDataChanged, isFormActive, setIsFormActive, setGotData, isEditButtonPressed, setIsEditButtonPressed, pressedUserId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const [previousUser, setPreviousUser] = useState([]);
    const [previousUserData, setPreviousUserData] = useState([]);
    const user = { title: title, description: description, dueDate: dueDate };
    const router = useRouter(); 

    useEffect(() => {
        const data = getUser().then(res => res.find(singleUser => {
            if (singleUser._id === pressedUserId) {
                setPreviousUserData(singleUser);
            }

        }));
        // console.log(data); 
    }, [pressedUserId])

    const handleAddEmployeeButton = () => {
        setPreviousUserData([]);
        const postUserSuccess = addUser(user);
        if (postUserSuccess) {
            const myTimeout = setTimeout(() => setFormSuccess(true), 50);
            setIsDataChanged('Changes Made');
            if (myTimeout) {
                setTimeout(() => setFormSuccess(false), 3000);
            }
        }
    }

    const handleUpdateEmployee = () => {
        setGotData(user);
        const userId = pressedUserId;
        const formData = user;
        const upDatedUser = updateUser(userId, formData).then(res => setPreviousUser(res));
        console.log(previousUser);
    }
    return (
        <>
            {
                formSuccess && <div className="mt-4"><Success message={'Task Added Successfully.'}></Success></div>
            }

            <h1 className='flex justify-center my-12 text-4xl font-bold text-accent'>Task Management</h1>
            <div className="flex items-center justify-between">
                {
                    !isDataChanged || !isFormActive ? <button onClick={() => {
                        setIsDataChanged(true)
                        setIsFormActive(true)
                        setIsEditButtonPressed(false)
                    }} className="mb-6 btn btn-active btn-accent">Add Task<span className="ml-2"><BiUserPlus size={25}></BiUserPlus></span></button> : <button onClick={() => {
                        setIsDataChanged(false)
                        setIsFormActive(false)
                        setPreviousUserData([])
                    }} className="mb-6 btn btn-active btn-accent">Cancel<span className="ml-2"><BiBlock size={25}></BiBlock></span></button>
                }

                <button onClick={() => {router.push('/')}} className="mb-6 text-white bg-red-400 hover:bg-red-700 btn btn-active">Logout<span className="ml-2"> </span></button>

            </div>
            {
                (isDataChanged || isFormActive) && <div className="flex justify-between">

                    <div>
                        <div className='flex mb-6 gap-x-8'>

                            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' className="max-w-xs w-80 input focus:outline-none" />

                            <input onChange={(e) => setDueDate(e.target.value)} type="date" placeholder='Due date' className="max-w-xs w-80 input focus:outline-none" />
                        </div>

                        <div className='flex mb-6'>
                            <textarea onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className="w-full pt-3 input focus:outline-none" />
                        </div>

                        {
                            (isDataChanged && isFormActive && !isEditButtonPressed) ? <button onClick={handleAddEmployeeButton} className="mb-8 btn btn-outline btn-accent">Add this Task<span className="ml-2"><BiUserPlus size={25}></BiUserPlus></span></button> : <button onClick={handleUpdateEmployee} className="mb-8 btn btn-outline btn-accent">Update Task<span className="ml-2"><GrUpdate size={25} color={'white'}></GrUpdate></span></button>
                        }
                    </div>

                </div>
            }
        </>
    )
}