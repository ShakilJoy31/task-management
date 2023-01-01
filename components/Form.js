import { useState, useEffect } from "react";
import Success from "./Success";
import { BiBlock, BiUserPlus } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { addUser } from '../components/lib/helper';
import { updateUser, getUser } from "./lib/helper";
import axios, { Axios } from "axios";

export default function Form({ isDataChanged, setIsDataChanged, isFormActive, setIsFormActive, setGotData, isEditButtonPressed, setIsEditButtonPressed, pressedUserId }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');
    const [photo, setImage] = useState('');
    const [userPhoto, setUserPhoto] = useState({});
    const [formSuccess, setFormSuccess] = useState(false);
    const [previousUser, setPreviousUser] = useState([]);
    const [previousUserData, setPreviousUserData] = useState([]);
    // const [isAddEmployeeButtonActive, setIsEmployeeButtonActive] = useState(false); 
    const name = firstName + ' ' + lastName;
    const user = { name: name, email: email, photo: photo, salary: salary, date: date };

    useEffect(() => {
        const data = getUser().then(res => res.find(singleUser => {
            if (singleUser._id === pressedUserId) {
                setPreviousUserData(singleUser);
                console.log('Data is send');
            }

        }));
        // console.log(data); 
    }, [pressedUserId])

    const handleAddEmployeeButton = () => {
        setPreviousUserData([]);
        if (name && email && salary && date && photo) {
            const postUserSuccess = addUser(user);
            if (postUserSuccess) {
                const myTimeout = setTimeout(() => setFormSuccess(true), 50);
                setIsDataChanged('Changes Made');
                if (myTimeout) {
                    setTimeout(() => setFormSuccess(false), 2500);
                }
            }
        }

        const imageStorageKey = '20a45e701a94d129c21a22bb89df026c';
        const formData = new FormData();
        formData.append('photo', photo);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        // Axios successfull
        // axios.post(
        //     'https://v2.convertapi.com/upload',
        //     {formData}
        // )
        // .then(res => {
        //     setUserPhoto(res); 
        //     console.log(typeof res); 
        // })
        // .catch(error => {
        //     console.log(error); 
        // })


        // axios.post(
        //     url,
        //     {formData}
        // )
        // .then(res => {
        //     setUserPhoto(res); 
        //     console.log(typeof res); 
        // })
        // .catch(error => {
        //     console.log(error); 
        // })



        // fetch(url, {
        //     method: 'POST',
        //     body: { formData }
        // })
        //     .then(res => {
        //         console.log(res); 
        //         res.json()
        //     })
        //     .then(result => {
        //         if (result) {
        //             console.log(result);
        //             const hostedImage = result?.data?.display_url
        //             // console.log(result?.data?.display_url);
        //             console.log(hostedImage);
        //         }
        //     })

        // Couldn't Upload the Image to imagebb.
    }

    const handleUpdateEmployee = () => {
        if (name && email && salary && date && photo) {
            setGotData(user);
            // if (postUserSuccess) {
            //     const myTimeout = setTimeout(() => setFormSuccess(true), 50);
            //     setIsDataChanged('Changes Made');
            //     if (myTimeout) {
            //         setTimeout(() => setFormSuccess(false), 2500);
            //     }
            // }

            const userId = pressedUserId;
            const formData = user;
            const upDatedUser = updateUser(userId, formData).then(res => setPreviousUser(res));
            console.log(previousUser);
        }
    }

    if(userPhoto.length !== 0){
        console.log(userPhoto); 
    }

    return (
        <>
            {
                formSuccess && <div className="mt-4"><Success message={'Action Made Successfully.'}></Success></div>
            }

            <h1 className='flex justify-center my-12 text-4xl font-bold text-accent'>Employee Management</h1>
            {
                !isDataChanged || !isFormActive ? <button onClick={() => {
                    setIsDataChanged(true)
                    setIsFormActive(true)
                    setIsEditButtonPressed(false)
                }} className="mb-6 btn btn-active btn-accent">Add Employee <span className="ml-2"><BiUserPlus size={25}></BiUserPlus></span></button> : <button onClick={() => {
                    setIsDataChanged(false)
                    setIsFormActive(false)
                    setPreviousUserData([])
                }} className="mb-6 btn btn-active btn-accent">Cancel<span className="ml-2"><BiBlock size={25}></BiBlock></span></button>
            }
            {/* setIsDataChanged(true);
            setIsFormActive(true); */}
            {
                (isDataChanged || isFormActive) && <div className="flex justify-between">

                    <div>
                        <div className='flex mb-6 gap-x-8'>

                            <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder={((previousUserData.length !== 0) || (!name && !email && !date && !photo && !salary)) ? previousUserData?.name?.split(' ')[0] : 'First Name'} className="max-w-xs w-80 input focus:outline-none" />

                            <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder={((previousUserData.length !== 0) || (!name && !email && !date && !photo && !salary)) ? previousUserData?.name?.split(' ')[1] : 'Last Name'} className="max-w-xs w-80 input focus:outline-none" />
                        </div>

                        <div className='flex mb-6 gap-x-8'>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder={((previousUserData.length !== 0) || (!name && !email && !date && !photo && !salary)) ? previousUserData?.email : 'Your Email'} className="max-w-xs w-80 input focus:outline-none" />
                            <input onChange={(e) => setSalary(e.target.value)} type="text" placeholder={((previousUserData.length !== 0) || (!name && !email && !date && !photo && !salary)) ? previousUserData?.salary : 'Salary'} className="max-w-xs w-80 input focus:outline-none" />
                        </div>

                        <div className='flex mb-6 gap-x-8'>
                            <input onChange={(e) => setDate(e.target.value)} type="date" placeholder={((previousUserData.length !== 0) || (!name && !email && !date && !photo && !salary)) ? previousUserData?.date : 'Date of Birth'} className="max-w-xs w-80 input focus:outline-none" />

                            <input onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} type="file" className="max-w-xs w-80 file-input file-input-accent focus:outline-none" />

                        </div>

                        {
                            (isDataChanged && isFormActive && !isEditButtonPressed) ? <button onClick={handleAddEmployeeButton} className="mb-8 btn btn-outline btn-accent">Add this employee <span className="ml-2"><BiUserPlus size={25}></BiUserPlus></span></button> : <button onClick={handleUpdateEmployee} className="mb-8 btn btn-outline btn-accent">Update<span className="ml-2"><GrUpdate size={25} color={'white'}></GrUpdate></span></button>
                        }
                    </div>

                    {
                        photo && <div className="">
                            <span className="ml-[5px] text-2xl text-accent">Your Photo</span>
                            {
                                <img className='w-32 rounded' src={photo} alt="" />
                            }
                        </div>
                    }

                </div>
            }
        </>
    )
}

// https://i.pinimg.com/736x/ea/2a/fe/ea2afea9c6a63773dff0291b0aab5878.jpg