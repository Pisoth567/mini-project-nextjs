import { User } from "../type/user";

export async function getAllUsers(){
    const data = await fetch("https://api.escuelajs.co/api/v1/users");
    const users = await data.json();
    return users;
}

export async function getUserById(id: string){
    const data = await fetch("https://api.escuelajs.co/api/v1/users");
    const res:User[] = await data.json();
    const user = res.find((u)=> u.id === Number(id));
    return user;    
}