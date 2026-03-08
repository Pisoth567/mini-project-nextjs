import { User, UserResponse } from "../type/user";

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

// export async function checkUserEmail(email: string){
//     const data = await fetch("https://api.escuelajs.co/api/v1/users");
//     const users:UserResponse[] = await data.json();
//     const userEmail =  users.find(e=> e.email === email)

//     console.log(userEmail);
    
//     return userEmail;
// }

export async function checkUserEmail(email: string) {
  const data = await fetch("https://api.escuelajs.co/api/v1/users");
  const users: User[] = await data.json();

  const user = users.find((u) => u.email === email);

  return user;
}