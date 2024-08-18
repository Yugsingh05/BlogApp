import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import './style.css'
import Like from "../components/Like";

 function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(userData)
    

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
        
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 bg-black w-full ">
            <Container>
                <div className="w-2/5  mb-4 relative flex  align-items-center  justify-center border rounded-xl p-2 po  bg-lime-300   ">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                <div className="like"><Like  postId = {post.featuredImage} userId = {userData.$id}/></div>
                    <h1 className=" font-extrabold text-3xl ml-5  text-yellow-300">{post.title}</h1>
                    
                </div>
                <div className="browser-css text-2xl text-white">
                    {parse(post.content)}
                    </div>

            </Container>
        </div>
    ) : null;
}
export default memo(Post);