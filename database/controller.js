import Users from "../model/user"

export async function getUsers (req, res) {
    try{
        const users = await Users.find({}); 
        if(!users){
            return res.status(404).json({error: 'Data not found'})
        }
        console.log(users); 
        res.status(200).json(users)
    }catch(error){
        res.status(404).json({error: 'Error while fetching data from the database.'})
    }
}

// For the post user
export async function postUsers (req, res) {
    try{
        const formData = req.body; 
        if(!formData){
            return res.status(404).json({error: 'Form data is not provided....!'}); 
        }
        Users.create(formData, (error, data)=>{
            return res.status(200).json(data); 
        })
    }catch(error){
        return res.status(404).json({error: 'Operation failed'}); 
    }
}

// For the PUT user
export async function putUsers (req, res) {
    try{
        const {userId} = req.query; 
        const formData = req.body; 
        if(userId && formData){
            const user = await Users.findByIdAndUpdate(userId, formData)
            res.status(200).json(user); 
        }
        res.status(404).json({error: 'User is not selected...!'}); 
    }catch(errors){
        return res.status(404).json({error: 'Operation failed to update the data....!'}); 
    }
}

// For delete the user
export async function deleteUser (req, res){
    try{
        const {userId} = req.query; 
        if(userId){
            const user = await Users.findByIdAndDelete(userId); 
            return res.status(200).json({deleted: user}); 
        }
        res.status(404).json({error:'User id is not selected'}); 
    }catch(error){
        res.status(404).json({error: 'Operation failed to delete the data....!'})
    }
}

// For getting the specific user
export async function getUser(req, res) {
    try{
        const {userId} = req.query; 
        if(userId){
            const user = await Users.findById(userId); 
            return res.status(200).json(user); 
        }
        res.status(404).json({error: 'User id is not found.'}); 
    }catch(error){
        res.status(404).json({error: 'Operation failed to get a specific user.'}); 
    }
}
