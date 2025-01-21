import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setPosts} from "../store/postSlice"

function Home() {
    const { slug } = useParams();
    let user = useSelector((state) => state.auth.userData);
    let posts = useSelector((state)=> state.posts.allPosts);
    let dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPosts().then((postArr) => {
            if (postArr) {
                dispatch(setPosts(postArr.documents));
            }
        })
    }, [user,navigate])

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

    else if(user && posts.length === 0){
        return (
            <div className="w-full h-96 py-8 mt-4 text-center">
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

    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                        <div className="p-2 w-full">
                            <p>Credentials</p>
                            <p>email : test@test.com</p>
                            <p>password : test1234 </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
    
}

export default Home
