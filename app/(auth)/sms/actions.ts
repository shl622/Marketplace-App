"use server"

import { z } from "zod"
import validator from "validator"
import { redirect } from "next/navigation"

const phoneSchema = z.string().trim().refine((phoneNumber) => 
validator.isMobilePhone(phoneNumber,"en-US"),"Please provide a valid US mobile number.")

//use coerce as formData makes into string, min digits and max same digits
const tokenSchema = z.coerce.number().min(100000).max(999999)

interface ActionState{
    token:boolean
}

export async function smsVerification(prevState: ActionState, formData: FormData){
    const phoneNumber = formData.get("phoneNumber")
    const token = formData.get("token")
    //initial state of only phone number provided=token is false
    if(!prevState.token){
        const result = phoneSchema.safeParse(phoneNumber)
        if(!result.success){
            return {
                token:false,
                error: result.error.flatten()
            }
        }else{
            return{
                token:true
            }
        }
    }  else{
        const result = tokenSchema.safeParse(token)
        if(!result.success){
            //we don't want to hide the token input
            return{
                token:true,
                error: result.error.flatten()
            }
        }else{
            //if verification true- login the user
            redirect("/")
        }
    }
}
