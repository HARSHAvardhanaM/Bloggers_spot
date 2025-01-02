import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
    let [post, setPost] = useState(null);
    const userData = useSelector((state) => (state.auth.userData));
    const isAuthor = post && userData.$id === post.userId;
    const { slug } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((res) => {
                    if (res) {
                        setPost(res);
                    }
                    else navigate("/")
                })
        }
        else {
            navigate("/")
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/");
            }
        })
    };

    return post ? (
        <div className="py-8">
            <Container className="flex flex-col justify-center items-center">
                <div className="w-3/4  flex justify-center align-middle mb-4 relative border rounded-xl p-2">
                    <div className="mx-auto">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-xl" />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" textColor="white" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    </div>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>) : null
}

export default Post
