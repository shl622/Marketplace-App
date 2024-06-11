import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"
import { redirect } from "next/navigation"

export default function createAccount(){
    const handleSubmit = async (formData: FormData) =>{
        "use server" //only run in server
        //promise to stop user from infinitely pressing login
        await new Promise((resolve) => setTimeout(resolve,3000))
        redirect("/login")
    }
    return(
        //container use gap-10
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Welcome!</h1>
                <h2 className="text-xl">Fill in below</h2>
            </div>
            <form action={handleSubmit} className="flex flex-col gap-3">
                <FormInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]}
                />
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={[]}
                />
                <FormInput
                    name="repassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    errors={[]}
                />
                <FormButton
                    text="Create account"
                    loadMsg="Creating account..."
                />
            </form>
            <SocialLogin/>
        </div>
    )
}