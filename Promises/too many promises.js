const posts =[];
const user = {
    username: "user123",
    lastActivityTime: null
};

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            resolve();
        }, 1000);
    });
}

function updateLastUserActivityTime(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            user.lastActivityTime = new Date();
            resolve();
        }, 1000);
    });
}

function deleteLastPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost.title);
            } else {
                reject("No posts to delete");
            }
        }, 1000);
    });
}

// Promise.all([createPost({ title: "Post One" }), updateLastUserActivityTime(user)])
//     .then(() => {
//         console.log("Posts:", posts);
//         console.log("Last Activity Time:", user.lastActivityTime);

//         deleteLastPost().then(deletedPost => {
//             console.log("Deleted Post:", deletedPost);
//             console.log("Updated Posts:", posts);
//         })
//         .catch(error => {
//         console.log("Error:", error);
//         })
//     });

const mainFunction = async () => {
    try {
        await Promise.all([createPost({ title: "Post One" }), updateLastUserActivityTime(user)]);
        console.log("Posts:", posts);
        console.log("Last Activity Time:", user.lastActivityTime);

        const deletedPost = await deleteLastPost();
        console.log("Deleted Post:", deletedPost);
        console.log("Updated Posts:", posts);
    } catch (error) {
        console.log("Error:", error);
    }
};

mainFunction();