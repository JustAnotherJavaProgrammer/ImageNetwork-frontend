import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "./constants";
import { User, UserCreate } from "../context/LoginContext";

const commonRequestOptions: AxiosRequestConfig= {
    headers: {
        "x-requested-with": "XMLHttpRequest", // Prevents the browser from showing native login prompt
    },
    responseType: "json",
    withCredentials: true
}

export async function getCurrentUser(auth?: AxiosRequestConfig["auth"]) {
    return await axios.get(api + "/user", {
        ...commonRequestOptions,
        auth,
    }) as AxiosResponse<User, any>;
}

export async function createUser(userCreate: UserCreate) {
    return (await axios.post(api + "/user", userCreate, {
        ...commonRequestOptions
    }) as AxiosResponse<number, any>).data;
}

export function logout() {
    return axios.get(api + "/logout", {
        ...commonRequestOptions
    });
}