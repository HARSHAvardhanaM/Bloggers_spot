import React,{useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { Query } from 'appwrite';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/postSlice';

function AllPosts() {

    // let [posts , setPosts] = useState([]);
    const user = useSelector((state)=>state.auth.userData);
    const posts = useSelector((state)=>state.posts.allPosts);
    const dispatch = useDispatch(); 

    useEffect(()=>{
        appwriteService.getPosts([Query.equal("userId",user.$id)])
        .then((res)=>{
            if(res){
                dispatch(setPosts(res.documents))
            }})
    },[])

  if (posts.length > 0) {
  
          return (
              <div className='w-full py-8'>
                  <Container>
                      <div className='flex flex-wrap'>
                          {posts.map((post)=>{
                              return(
                                  <div key={post.$id} className='p-2 w-1/4'>
                                      <PostCard {...post} />
                                  </div>
                              )
                          })}
                      </div>
                  </Container>
              </div>
          )
      }

      else if (posts.length === 0) {
  
        return (
            <div className="w-full py-8 mt-4 text-center">
                            <Container>
                                <div className="flex flex-wrap">
                                    <div className="p-2 w-full">
                                        <h1 className="text-2xl font-bold hover:text-gray-500">
                                            No posts
                                        </h1>
                                    </div>
                                </div>
                            </Container>
                        </div>
        )
    }
}

export default AllPosts;
