import { atom } from "recoil";
import { User } from "firebase/auth";

export const checkUser = atom<User | null>({
    key: 'isUser',
    default: null
})