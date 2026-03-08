export type User ={
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
    creationAt: string
    updatedAt: string
}

export type UserResponse = {
  name: string
  email: string
  password: string
  avatar: string
}