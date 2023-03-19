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

    const formData = gotData; 

    useEffect(()=>{
     getUser().then(res => setData(res))
    }, [data])
    

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
                            <th><span className="flex justify-center">Title</span></th>
                            <th><span className="flex justify-center">Description</span></th>
                            <th><span className="flex justify-center">Date</span></th>
                            <th><span className="flex justify-center">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((singleData, index) => <tr>
                                <td>{index+1}</td>
                                <td>
                                <span className="flex justify-center">{singleData.title}</span>
                                </td>
                                <td>
                                    <span className="flex justify-center">{singleData.description}</span>
                                </td>
                                <td><span className="flex justify-center">{singleData.dueDate}</span></td>
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




