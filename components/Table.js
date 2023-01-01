import { useState } from "react"
import { BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { getUser, deleteUser, updateUser } from "./lib/helper";
import { useQuery } from "react-query";
import { useEffect } from "react";


export default function Table({setIsDataChanged, setIsFormActive, gotData, setIsEditButtonPressed, setPressedUserId}) {
    const [isDelete, setIsDelete] = useState(false);
    const [edit, setEdit] = useState();
    const [data, setData] = useState([]);
    const [deletedUserId, setDeletedUserId] = useState('');
    // const [isLoading, setIsLoading] = useState('');
    // const [isError, setIsError] = useState('');
    // const [error, setError] = useState('');
    // const { isLoading, isError, data, error } = useQuery('users', getUser)
    // if(isDataChanged){
    //     const { isLoading, isError, data, error } = useQuery('users', getUser)
    //     setIsLoading(isLoading)
    //     setIsError(isError)
    //     setError(error)
    //     setData(data)
    // }
    // if(isLoading) { 
    //     return <div>Employee is loading</div>;
    // } 
    // if(isError) { 
    //     return <div>Got error {error}</div>; 
    // }

    const formData = gotData; 

    useEffect(()=>{
     getUser().then(res => setData(res))
    }, [data])

    // useEffect(()=>{
    //     if(formData){
    //         const user = updateUser(userId, formData).then(res => console.log(res));
    //         console.log(user); 
    //     }
    // },[])
    

    const handleSuccessDelate = (userId) => {
        const goneUser = deleteUser(userId).then(res => console.log(res));
        // console.log(goneUser);
    }

    const handleEditUser = (userId) => {
        if(userId){
            setPressedUserId(userId); 
            setIsDataChanged(true);
            setIsFormActive(true); 
            setIsEditButtonPressed(true); 
        }
    }
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="table w-full ">

                    <thead>
                        <tr>
                            <th>Srl No.</th>
                            <th><span className="flex justify-center">Name with Photo</span></th>
                            <th><span className="flex justify-center">Email</span></th>
                            <th><span className="flex justify-center">Salary</span></th>
                            <th><span className="flex justify-center">Date of birth</span></th>
                            <th><span className="flex justify-center">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((singleData, index) => <tr>
                                <td>{index+1}</td>
                                <td>
                                    <div className="">
                                        <div className="flex justify-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-8 h-8 mask mask-squircle">
                                                    <img src={singleData.photo} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className=""><span className="block mx-auto font-bold">{singleData.name}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="flex justify-center">{singleData.email}</span>
                                </td>
                                <td><span className="flex justify-center">{singleData.salary}</span></td>

                                <td><span className="flex justify-center">{singleData.date}</span></td>
                                <th>
                                    <div className="flex justify-center">
                                        <label onClick={() => {
                                            setDeletedUserId(singleData._id)
                                            setIsDelete(true)
                                        }
                                        } htmlFor="my-modal-4" className="btn-xs cursor"><span><BiTrash size={25} color={'rgba(243, 6, 6, 0.803)'}></BiTrash></span></label>

                                        <button onClick={() => handleEditUser(singleData._id)} className="btn-xs cursor"><span><AiOutlineEdit size={25} color={'rgba(127, 255, 212, 0.662)'}></AiOutlineEdit></span></button>
                                    </div>

                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {isDelete && <div>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="cursor-pointer modal">
                    <label className="relative modal-box" htmlFor="">
                        <h3 className="flex justify-center text-2xl font-bold text-red-600 ">Are you sure to Delate this Employee</h3>
                        <p className="flex justify-center py-4">This action will make the employee delate from database.</p>

                        <div className="flex justify-center">
                            <button onClick={() => {
                                handleSuccessDelate(deletedUserId)
                                setIsDelete(false)
                            }} className="w-32 ml-2 text-white btn btn-error">Yes</button>

                            <button onClick={() => setIsDelete(false)} className="w-32 ml-2 text-white btn btn-success">No</button>
                        </div>
                    </label>
                </label>
            </div>

            }

        </>
    )
}




