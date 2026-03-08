
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

// insert Product to API
export  function insertUser(user: CreateUserInput){
    const data =  fetch("https://api.escuelajs.co/api/v1/users/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)
    }
    )
    return data;
}