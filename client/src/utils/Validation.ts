export function isPasswordStrong(password: string): boolean {
    if (!password) {
        return false;
    }
    return /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(password);
}