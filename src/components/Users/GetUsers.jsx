
import React,{useState,useEffect} from "react";

export default function GetUsers(){

 const [data,setData]=useState([])   
   
  const getUsers=async ()=>{

    const respnse= await fetch("https://localhost:7145/api/User",{method:"GET"})

    return await respnse.json();
  }  


  useEffect(()=>{
    getUsers().then(data=> setData(data))

  },[])


  const allusers=data.map((user) => (
    <li key={user.id} className="list-group-item">
      <strong>{user.name}</strong> - {user.age}
    </li>
  ))

 


return(
    <div className="card p-4">
    <h2 className="text-center">Users</h2>
    <ul className="list-group">
    {
        allusers
    }
      </ul>
    </div>
)


}

