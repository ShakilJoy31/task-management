const baseUrl = "http://localhost:3000";

// Get all the user from the database
export const getUser = async () =>{
        const response = await fetch(`${baseUrl}/api/users`)
    const json = await response.json(); 
    return json;
}

// Posting new user
export const addUser = async (formData) => {
    async function getStaticProps(context){
        try{
            const Options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(`${baseUrl}/api/users`, Options); 
            const json = await response.json(); 
            return json; 
        }catch(error){
            return(error)
        }
    }
    getStaticProps(); 
}

// Update User
export async function updateUser (userId, formData) {
    try{
        console.log(userId, formData); 
        const Options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch(`${baseUrl}/api/users/?userId=${userId}`, Options)
            const json = await response.json(); 
            return json; 
        }catch(error){
            return (error);  
        }
}

// Delete user
export async function deleteUser (userId){
    console.log(userId); 
    async function getStaticProps(context){
        try{
        const Options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/api/users/?userId=${userId}`, Options)
        const json = await response.json(); 
        return json;
    }catch(error){
        return(error); 
    }
    }
    return getStaticProps(); 
}


















// const baseUrl = "http://localhost:3000";

// // Get all the user from the database
// export const getUser = async () =>{
//     const response = await fetch(`${baseUrl}/api/users`)
//     const json = await response.json(); 
//     return json; 
// }

// // Posting new user
// export const addUser = async (formData) => {
//     try{
//         const Options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         }
//         const response = await fetch(`${baseUrl}/api/users`, Options); 
//         const json = await response.json(); 
//         return json; 
//     }catch(error){
//         return(error)
//     }
// }

// // Update User
// export async function updateUser (userId, formData) {
//     try{
//         const Options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         }
//         const response = await fetch(`${baseUrl}/api/users/${userId}`, Options)
//         const json = await response.json(); 
//         return json; 
//     }catch(error){
//         res.status(404).json({error: 'Failed to update the user'}); 
//     }
// }

// // Delete user
// export async function deleteUser (userId){
//     try{
//         const Options = {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         const response = await fetch(`${baseUrl}/api/users/${userId}`, Options)
//         const json = await response.json(); 
//         return json; 
//     }catch(error){
//         res.status(404).json({error: 'Failed to delete the user.'})
//     }
// }