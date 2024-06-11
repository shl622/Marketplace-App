interface FormButtonProps{
    loading: boolean;
    text:string;
}

export default function FormButton({loading,text}:FormButtonProps){
    return(
        <button disabled={loading} className="primary-btn h-10 
        disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-600">
            {loading?"Loading...":text}
        </button>
    )
}