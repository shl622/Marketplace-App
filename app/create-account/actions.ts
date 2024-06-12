"use server"
import {z} from "zod"
//username validation
const checkUsername = (username:string)=>
    !username.includes("potato")

//password match validation
const checkPassword = ({password,confirm_password}:{password:string,confirm_password:string})=> 
    password === confirm_password

// At least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
    );

//schema "requires" fields-- put .optional() to make opt
const formSchema = z.object({
    username: z.string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required."
    }).min(3, "Username must be at least 3 characters.")
    .max(10,"Username must be less than 10 characters.")
    .toLowerCase()
    .trim()
    .refine(checkUsername, "No potatoes"),
    email:z.string().email().trim().toLowerCase(),
    password: z.string().min(4).regex(passwordRegex, "Password must contain lowercase, UPPERCASE, one number and one special character."),
    confirm_password: z.string().min(4),
}).refine(checkPassword, {
    message: "Password does not match.",
    //need to set path to tell zod which field this error belongs to
    path:["confirm_password"], 
})

export async function initAccount(prevState:any, formData:FormData){
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password")
    }
    //pasrse() needs to be try/catch but safeparse just sends
    //flatten allows for an abbreviated 
    const result = formSchema.safeParse(data)
    if(!result.success){
        return result.error.flatten()
    } else{
        console.log(result.data)
    }
}