import Cookies from 'js-cookie';

interface CookieData {
  name: string;
  email: string;
  typeUser: string;
  token: string;
}

export const persistCookie = (key: string, value: CookieData) => {
  const serializedValue = JSON.stringify(value);
  Cookies.set(key, serializedValue, { expires: 7, path: '/' });
};
export const getCookie = (key: string) => {
  const cookie = Cookies.get(key);
  return cookie ? JSON.parse(cookie) : null;
};

export const clearCookie = (key: string) => {
  Cookies.remove(key);
};