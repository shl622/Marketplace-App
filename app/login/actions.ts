"use server"

export async function handleSubmit(prevState:any,formData: FormData){
    //promise to stop user from infinitely pressing login
    await new Promise((resolve) => setTimeout(resolve,3000))
    return{
        errors:['wrong password','password is too short']
    }
}