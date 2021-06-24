import axios from "axios";

async function getAllPosts() {
   return await axios.get("https://jsonplaceholder.typicode.com/posts");
}

async function createPost(post) {
   return await axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
}

async function updatePost(postId, post) {
   return await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, post);
}

async function removePost(postId) {
   return await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

export default {
   getAllPosts,
   createPost,
   updatePost,
   removePost,
};
