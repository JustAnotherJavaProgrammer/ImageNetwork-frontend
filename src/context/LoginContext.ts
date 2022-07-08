import React from "react";

const printWarning = () => {console.warn("You are using the defult value of LoginContext!");};

const LoginContext = React.createContext<LoginData>({
    loggedIn: false,
    user: null,
    login: (email, password) => new Promise((res) => {printWarning();res(false);}),
    logon: (userCreate) => new Promise((res) => {printWarning();res(false);}),
    logout: () => {printWarning();},
    detectSession: () => new Promise((res) => {printWarning();res(false);}),
    });

export type LoginData = {
    loggedIn: boolean,
    user: User | null | undefined,
    login: (email:string, password:string) => Promise<boolean>,
    logon: (user: UserCreate) => Promise<boolean>,
    logout: () => void,
    detectSession: () => Promise<boolean>
};

export type User = {
    id: number,
    name: string,
    email: string,
    nickname: string,
    createdAt: Date,
    updatedAt: Date,
    role: "ADMIN" | "USER",
    deleted: boolean
};

export type UserCreate = Omit<User, "id" | "createdAt" | "updatedAt" | "deleted" | "role"> & {password: string};

export default LoginContext;