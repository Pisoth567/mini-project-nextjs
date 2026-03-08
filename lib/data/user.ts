import {UserResponse } from "../type/user";

// insert Product to API
export async function insertUser(user: UserResponse){
    const data = await fetch("https://api.escuelajs.co/api/v1/users/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    })
    const res = await data.json()
    return res;
}

