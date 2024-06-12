//min username length and error message
export const usernameMinLength = 4
export const usernameMinError = "Username must be at least 4 characters."

//max username length
export const usernameMaxLength = 12
export const usernameMaxError = "Username must be no more than 12 characters."

//min password length
export const passwordMinLength = 4

// At least one uppercase letter, one lowercase letter, one number and one special character
export const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
)

//regex error message
export const passwordRegexError = "Password must contain lowercase, UPPERCASE, one number and one special character."

