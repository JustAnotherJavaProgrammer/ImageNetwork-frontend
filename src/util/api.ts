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

export type Post = {
    id: number;
    userId: number;
    title: string;
    image: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
};

export async function getPost(id: number) {
    return await axios.get(api + "/post/" + id, {
        ...commonRequestOptions
    }) as AxiosResponse<Post, any>;
}

export type Paginated<T> = {
    total: number;
    perPage: number;
    data: T[];
    currentPage: number;
    moreAvailable: boolean;
    loadMore: () => Promise<T[]>;
}

type Page<T> = {
    content: T[],
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        }
        offset: number;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
        paged: boolean;
    },
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    },
    numberOfElements: number;
    first: boolean;
    empty: boolean;
};

export async function getPosts(perPage=20):Promise<Paginated<Post>> {
    const pageOne = (await axios.get(api + "/posts", {...commonRequestOptions, params: {size: perPage}}) as AxiosResponse<Page<Post>, any>).data;
    const paginated:Partial<Paginated<Post>> = {
        total: pageOne.totalElements,
        perPage: pageOne.size,
        currentPage: pageOne.number,
        moreAvailable: !pageOne.last,
        data: pageOne.content,
    };
    paginated.loadMore = (async function loadMore(this: Paginated<Post>) {
        const page = (await axios.get(api + "/posts", {...commonRequestOptions, params: {size: perPage, page: this.currentPage + 1}}) as AxiosResponse<Page<Post>, any>).data;
        paginated.currentPage = page.number;
        paginated.moreAvailable = !page.last;
        paginated.total = page.totalElements;
        this.data.push(...page.content);
        return page.content;
    }).bind(paginated as Paginated<Post>);
    return paginated as Paginated<Post>;
}

export type PostCreate = Pick<Post, "title" | "image" | "comment"> & Partial<Pick<Post, "userId">>;

export async function createPost(params:PostCreate): Promise<number> {
    return (await axios.post(api + "/post", params, {...commonRequestOptions}) as AxiosResponse<number, any>).data;
}