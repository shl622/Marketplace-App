import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"

export default function createAccount(){
    return(
        //container use gap-10
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Welcome!</h1>
                <h2 className="text-xl">Login with username and password</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]}
                />
                <FormInput
                    type="password"
                    placeholder="Password"
                    required
                    errors={[]}
                />
                <FormButton
                    loading={false}
                    text="Login"
                />
            </form>
            <SocialLogin/>
        </div>
    )
}