export const passwordMinLength = 4

// At least one uppercase letter, one lowercase letter, one number and one special character
export const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
)

export const passwordRegexError = "Password must contain lowercase, UPPERCASE, one number and one special character."