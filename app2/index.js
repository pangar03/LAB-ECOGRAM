// document.getElementById("get-btn").addEventListener("click", getUsers);

// function getUsers() {
//   fetch("http://localhost:5050/users")
//     .then((response) => response.json())
//     .then((data) => console.log("get response", data))
//     .catch((error) => console.error("Error:", error));
// }


// ---- GET USERS ----
const getUsersBtn = document.getElementById("get-users");
const usersContainer = document.getElementById("users-container");

getUsersBtn.addEventListener("click", () => {
  const users = fetch("http://localhost:5050/users", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      usersContainer.innerHTML = "";
      data.forEach((user) => {
        console.log(user);
        const userElement = document.createElement("li");
        userElement.classList.add("user-item");
        userElement.innerHTML = `<h3>${user.username}</h3>`;
        usersContainer.appendChild(userElement);
      })
  })
  .catch((error) => console.error("Error:", error));
});

// ---- GET POSTS ----
const getPostsBtn = document.getElementById("get-posts");
const postsContainer = document.getElementById("posts-container");

getPostsBtn.addEventListener("click", () => {
  const posts = fetch("http://localhost:5050/posts", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      postsContainer.innerHTML = "";
      data.forEach((post) => {
        console.log(post);
        const postElement = document.createElement("li");
        postElement.classList.add("post-item");
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>            
        `;

        if(post.img !== "") {
          const imgElement = document.createElement("img");
          imgElement.src = post.img;
          postElement.appendChild(imgElement);
        }

        postsContainer.appendChild(postElement);
      })
  })
  .catch((error) => console.error("Error:", error));
});