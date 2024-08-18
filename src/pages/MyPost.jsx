// import React, { useState, useEffect, memo } from "react";
// import { Container, PostCard } from "../components";
// import appwriteService from "../appwrite/config";
// import { useSelector } from "react-redux";

// function MyPost() {
//   const [posts, setPosts] = useState([]);
//   const [post,setPost] = useState([]);
//   const userData = useSelector((state) => state.auth.userData);


//   useEffect(() => {

//     appwriteService.getPosts([]).then((posts) => {

//       if (posts) {
        
//         // console.log(isAuthor)
//         // const post  = posts.documents.map((post) => {
//         //   const mainPost = [...posts.documents]
//         //   setPost ({ userId: posts.documents[].userId })
//         //   const isAuthor =   post && userData ? post.userId === userData.$id : false;
//         //   console.log(post)
//         //     (isAuthor && setPosts[posts.documents[0].userId])  
         

//         const postlength = posts.total -1;
//         console.log(postlength)
//         for (var i = postlength; i >=0 ; i--) {
//           const data = posts.documents[i];
//           const isAuthor =   data && userData ? data.userId === userData.$id : false;
//           if (isAuthor) {
//             console.log(isAuthor)
//             console.log(data)
//              setPosts([...data])
            
//           }
         
//           console.log(data.userId)
//         }

        
    
//         //
        
        
//         console.log(post)
//         // console.log(userData.$id)
            
//       }
//     });
//   }, []);

//   return (
//     <div className="w-full py-2 bg-purple-700">
//       <Container>
//         <div className="flex flex-wrap  gap-12 mt-3 justify-center align-items-center">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-1 mt-4 mb-4 w-1/4">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default memo(MyPost);

import React, { useState, useEffect, memo } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPosts([]).then((postsResponse) => {
      if (postsResponse) {
        const userPosts = [];
        for (var i = postsResponse.total - 1; i >= 0; i--) {
          const data = postsResponse.documents[i];
          const isAuthor = data && userData ? data.userId === userData.$id : false;
          if (isAuthor) {
            userPosts.push(data);
          }
        }
        setPosts(userPosts);
      }
    });
  }, []);

  return (
    <div className="w-full py-2 bg-purple-700">
      <Container>
        <div className="flex flex-wrap gap-12 mt-3 justify-center align-items-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-1 mt-4 mb-4 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default memo(MyPost);