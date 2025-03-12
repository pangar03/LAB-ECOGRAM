// document.getElementById("get-btn").addEventListener("click", getUsers);

// function getUsers() {
//   fetch("http://localhost:5050/users")
//     .then((response) => response.json())
//     .then((data) => console.log("get response", data))
//     .catch((error) => console.error("Error:", error));
// }

// USER CLIENT

// ---- LANDING ELEMENTS ----
const landingSection = document.getElementById("landing-section");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

// ---- REGISTER ELEMENTS ----
const registerSection = document.getElementById("register-section");
const registerForm = document.getElementById("register-form");
const regUsername = document.getElementById("register-username");
const registerName = document.getElementById("register-name");
const regPassword = document.getElementById("register-password");
const regConfirmPassword = document.getElementById("register-password2");

// ---- LOGIN ELEMENTS ----
const loginSection = document.getElementById("login-section");
const loginForm = document.getElementById("login-form");
const logUsername = document.getElementById("login-username");
const logPassword = document.getElementById("login-password");

// ---- CREATE POST -----
const createSection = document.getElementById("create-post-section");

// ---- BACK BTN ----
const backBtn = document.querySelectorAll(".back-btn");
console.log(backBtn);
console.log(registerBtn);
backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        landingSection.style.display = "flex";
        registerSection.style.display = "none";
        loginSection.style.display = "none";
    });
})

// REGISTER FLOW
registerBtn.addEventListener("click", () => {
    landingSection.style.display = "none";
    registerSection.style.display = "flex";
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(`USER DATA
            ${regUsername.value}
            ${registerName.value}
            ${regPassword.value}
            ${regConfirmPassword.value}
        `);

    const username = regUsername.value;
    const name = registerName.value;
    const password = regPassword.value;
    const confirmPassword = regConfirmPassword.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    fetch("http://localhost:5050/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, password }),
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            loginSection.style.display = "flex";
            registerSection.style.display = "none";
        })
        .catch((error) => console.error("Error:", error));
});

// LOGIN FLOW
loginBtn.addEventListener("click", () => {
    landingSection.style.display = "none";
    loginSection.style.display = "flex";
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = logUsername.value;
    const password = logPassword.value;

    fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            response.json();
        })
        .then((data) => {
            console.log(data);
            
            renderCreatePost();            
        })
        .catch((error) => console.error("Error:", error));
});

// RENDER CREATE POST SECTION
const renderCreatePost = () => {
    // Hide login section, Render the creation form
    createSection.style.display = "flex";
    loginSection.style.display = "none";

    const createForm = document.createElement("form");
    createForm.id = "create-post-form";

    createForm.innerHTML = `
        <input type="text" id="post-title" placeholder="Title" required/>
        <input type="text" id="post-content" placeholder="Content" required/>
        <input type="text" id="post-img" placeholder="Image URL"/>
        <button type="submit">Create Post</button>
    `;

    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;
        const img = document.getElementById("post-img").value

        fetch("http://localhost:5050/create-post", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ title, content, img}),
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            if(data === "Post created successfully") {
                alert("Post created successfully");
            }
        }).catch((error) => console.error("Error:", error)); 
    });
    
    createSection.appendChild(createForm);
};