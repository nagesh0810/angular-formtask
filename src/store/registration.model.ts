

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth:string;
    gender:string;
    email: string;
    password: string;
    accept: string;
  }
  
  export interface UserState {
    users: User[];
    selectedUser: User| null;
  }

  export const initialState: UserState = {
    users: [],
    selectedUser: null
  };