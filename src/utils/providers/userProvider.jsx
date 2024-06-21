import React from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import useUsers from '../hooks/useUsers';

const initialValue = {
  users:[],
  user:{},
  deleteUser:()=>{},
  createUser:()=>{},
  updateUser:()=>{},
  filterUser:()=>{},
  toggle:false,
  action:'add'
}

export const UserContext = createContext(initialValue);


const UserProvider = ({children}) => {

  const {users,deleteUser,updateUser,createUser,filterUser} = useUsers();

  const [modal,setModal] = useState({toggle:false,action:'add',users:{}})


  return <UserContext.Provider value={{users,deleteUser,updateUser,createUser,filterUser,modal,setModal}}>{children}</UserContext.Provider>
}

export default UserProvider;
