import { atom } from "recoil";
import { User } from "firebase/auth";

export const checkUser = atom<User | null>({
    key: 'checkUser',
    default: null
})

export const userNameState = atom<string>({
    key: 'userNameState',
    default: ''
})