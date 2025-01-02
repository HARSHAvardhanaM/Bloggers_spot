import React, { useCallback, useEffect } from 'react'
import { Input, RTE, Select, Logo, Button } from "../index"
import { useForm } from 'react-hook-form'
import appwriteService from "../../appwrite/config"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    let navigate = useNavigate();
    let userData = useSelector((state) => state.auth.userData);

    let submit = async (data) => {
        if (post) {
            let userImage = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (userImage) {
                await appwriteService.deleteFile(post.featuredImage[0]);
            }

            const dbPost = await appwriteService.updatePost(post.$id, { ...data, featuredImage: userImage ? userImage : undefined });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                data.featuredImage = file.$id;
                let dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        let subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        })

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    label="title" type="text" placeholder="Enter your title" {...register("title", { required: true })}
                />
                <Input
                    label="slug" placeholder="Slug" className="mb-4" {...register("slug",)}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className="mb-4"
                    {...register("status", { required: true })} />
                <Button type='submit' bgColor={post ? "bg-green-500" : undefined} >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
