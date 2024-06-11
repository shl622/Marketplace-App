"use client" //needs

import { useFormStatus } from "react-dom";

interface FormButtonProps{
    text:string
    loadMsg:string
}

export default function FormButton({text,loadMsg}:FormButtonProps){
    //useFormstatus is a React hook tells what is happening with backend
    //can be only used by child of the form
    const {pending} = useFormStatus()
    return(
        <button disabled={pending} className="primary-btn h-10 
        disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-600">
            {pending?loadMsg:text}
        </button>
    )
}