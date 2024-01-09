export const isValidEmail = (email: string): boolean => {
    // Implement email validation logic (you can use a regular expression)
    // Return true if the email is valid, false otherwise
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const isStrongPassword = (password: string): any => {
    // Minimum length requirement
    if (password.length < 6) {
        return "password must be at least 6 characters!";
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "password must have at least one lowercase letter";
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "password must have at least one uppercase letter";
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
       return "password must have at least one digit";
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        return "password must have at least one special character";
    }

    // All criteria met, password is strong
    return true;
}