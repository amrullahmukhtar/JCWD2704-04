import { Role } from '@prisma/client';
import { Request } from 'express';


export function validateUser (req:Request){

    if (req.user.role !== "user")
       throw new Error("bukan user") 
}