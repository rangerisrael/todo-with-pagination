import React from 'react'
import { useState } from 'react'
import {faker} from '@faker-js/faker'
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import useDebounce from './useDeboubnce';


const useUsers = () => {

const [users,setUser]  = useState([]);
const [restorePoint,setRestore] = useState([]);






// rder user
useEffect(()=>{
let mounted =true;

function render(){
  let data =[];

  for (let i = 0; i < 100; i++) {
    data.push(generateUser());
    
  }

  if(mounted){
    setUser(data);
    setRestore(data);
  }
 
}
 render();

 return () => (mounted = false);

},[])

// generate user

function generateUser(){
  return {
		uuid: faker.string.uuid(),
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		address: faker.location.streetAddress(),
		profile: faker.image.avatarGitHub(),
	};
}


function deleteOne(uuid){
  let user = users.filter((list) => list.uuid != uuid);

  setUser(user);
  setRestore(user);

}

function newOne(newUser){
  let appendValue = [...users, { ...newUser }];

  setUser(appendValue);
}

function updateOne(uuid,updateUsers){
  let index = users.findIndex((list) => list.uuid == uuid);

  if(index != -1){
    let oldUser = [...users];

		oldUser[index] = Object.assign({}, oldUser[index], updateUsers);
  
    setUser(oldUser);
    setRestore(oldUser)
  }
}

const filter = useDebounce((searchTerms) => {
	if (!isEmpty(searchTerms)) {
		let filterOut = users.filter((list) => {
			return Object.values(list).some((value) => value.toString().toLowerCase().trim().includes(searchTerms.toLowerCase().trim()));
		});

		if (filterOut) {
			setUser(filterOut);
		} else {
			setUser(restorePoint);
		}
	} else {
		setUser(restorePoint);
	}
}, 500);

  return {
    users:users,
    deleteUser:deleteOne,
    createUser:newOne,
    updateUser:updateOne,
    filterUser:filter
  };

}

export default useUsers
