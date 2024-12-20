import Cookies from 'js-cookie'

export function setToken(token: string, rememberUser: boolean): void {
    const expires = new Date(new Date().getTime() +  60 * 60 * 1000); // 1h

    Cookies.set('expiration-token-time', expires.toUTCString());
    Cookies.set('token', token, { expires });
};

export function isTokenExpired(): boolean {
    const token = Cookies.get('token');
    if (!token) return true;

    const expirationDateStr= Cookies.get('expiration-token-time');
    if (!expirationDateStr) return true;

    const expirationDate = new Date(expirationDateStr);
    const currentDate = new Date();
    return currentDate >= expirationDate;
};

export function removeToken(): void {
    Cookies.remove('expiration-token-time');
    Cookies.remove('token');
}