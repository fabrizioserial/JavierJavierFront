import { User, UserData } from '../users';
import axios from 'axios';
import UserService from '../../utils/userService';


const jjAxiosFollow = axios.create({
    baseURL: "https://dev.jibberjabber.cloud/follow",
    headers: {
        "Content-type": "application/json"
    }
})

const jjAxiosUser = axios.create({
    baseURL: "https://dev.jibberjabber.cloud/user",
    headers: {
        "Content-type": "application/json"
    }
})

export class UserApi implements UserData {
    getCurrentUser(): Promise<User | undefined> {
        return jjAxiosUser.get("").then(res => res.data)
    }

    getUserById(userId: string): Promise<User | undefined> {
        return jjAxiosUser.get(`/${userId}`).then(res => res.data)
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        return jjAxiosFollow.get(`/isFollowed/${userId}`).then(res => res.data)
    }

    toggleFollow(userId: string): Promise<void> {
        return jjAxiosFollow.post(`/${userId}`)
    }

    searchUser(userName: string): Promise<User> | undefined {
        return jjAxiosUser.get(`/search/${userName}`)
    }
}

jjAxiosUser.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return config;
    }
});

jjAxiosFollow.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return config;
    }
});
