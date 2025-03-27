import React,{useState,useEffect, use} from 'react'



export default function GetPosts()
{
const[post,setPost]=useState([]);
const [newPost,setNewPost]=useState({});


const getPosts =async()=>{

 const respnse= await fetch("https://localhost:7145/api/Post",{method:"GET"})

 return respnse.json()

}


useEffect(()=>{

getPosts().then(post=>setPost(post)).catch((error)=>console.log(error));

},[newPost])

const allposts=post.map((post) => (
    <li key={post.id} className="list-group-item">
      <strong>{post.title}</strong> - by {post.user?.name}
   <strong>
     <button className="btn btn-danger" onClick={()=>handleDelete(post.id)}>Delete Post</button>
     </strong>
    </li>
  ))


const addPost=async(e)=>{

  e.preventDefault();

  try{

    const response= await fetch("https://localhost:7145/api/Post",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(newPost)
      
    })
    if(response.ok){
      alert("new post added sucessfully")
      setNewPost({title:"",content:"",user_Id:""})
    }
    else{
      alert("problem in saving post")
    }

  }
  catch(error){
    console.log(error);
  }

}
  

const handleDelete=async (id)=>{
  
  try{

    const response= await fetch(`https://localhost:7145/api/Post/${id}`,{method:"DELETE"})
    if(response.ok){
        alert("post deleted sucessfully")

        setPost(post.filter(p=>p.id !==id))
    }
    else{
      alert("Post not deleted")
    }

    console.log(id)

}catch(error)
{
console.log(error)

}

}

return(

<div className="card p-4">
      <h2 className="text-center">Posts</h2>
      <ul className="list-group">
        {allposts}
      </ul>
      <h3 className="mt-4">Add a Post</h3>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Title" 
          value={newPost.title} 
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
        />
         <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Content" 
          value={newPost.content} 
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
        />
        <input 
          type="number" 
          className="form-control mb-2"
          placeholder="User ID" 
          value={newPost.user_Id} 
          onChange={(e) => setNewPost({ ...newPost, user_Id: e.target.value })} 
        />
        <button className="btn btn-primary" onClick={addPost}>Add Post</button>
      </div>
    </div>

)

}
