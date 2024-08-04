import { Request } from 'express';


export function validateUser (req:Request){

    if (req.user.role !== "user")
       throw new Error("bukan user") 
}
export function validateAdmin (req:Request){

    if (req.user.role !== "admin")
       throw new Error("bukan admin") 
}