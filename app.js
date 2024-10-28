import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXKwTmQHRdopHmdPV56Uypxt3yy-vm4Ls",
  authDomain: "auth-js-c349b.firebaseapp.com",
  databaseURL:"https://auth-js-c349b-default-rtdb.firebaseio.com",
  projectId: "auth-js-c349b",
  storageBucket: "auth-js-c349b.appspot.com",
  messagingSenderId: "8525102033",
  appId: "1:8525102033:web:19c8b591e44c8213ee7ef0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const redirectWithDelay = (url, delay = 1500) => {
  setTimeout(() => window.location.href = url, delay);
};

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            await set(ref(database, 'users/' + user.uid), { name, email });
            
            console.log("User signed up:", user);
            alert("Signup successful! Redirecting to login page.");
            redirectWithDelay("login.html");

        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup error: " + error.message + " (Code: " + error.code + ")");
        }
    });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            redirectWithDelay("todo.html");

        } catch (error) {
            console.error("Login error:", error.message);
            alert("Login error: " + error.message);
        }
    });
}

// Todo functionality (only runs on todo.html)
const userNameElement = document.getElementById('user-name');
const userEmailElement = document.getElementById('user-email');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const signoutBtn = document.getElementById('signout-btn');

let userId = null;

if (window.location.pathname.includes('todo.html')) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userId = user.uid;
            userNameElement.textContent = user.displayName || 'User';
            userEmailElement.textContent = user.email;

            const todosRef = ref(database, `users/${userId}/todos`);
            onValue(todosRef, (snapshot) => {
                todoList.innerHTML = '';
                snapshot.forEach((childSnapshot) => {
                    const todoData = childSnapshot.val();
                    addTodoToDOM(childSnapshot.key, todoData);
                });
            });
        } else {
            redirectWithDelay("login.html");
        }
    });

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (todoInput.value.trim() === '') return;

        const todosRef = ref(database, `users/${userId}/todos`);
        const newTodoRef = push(todosRef);
        await set(newTodoRef, { text: todoInput.value, completed: false });

        todoInput.value = '';
    });

    function addTodoToDOM(id, todoData) {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todoData.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <span>${todoData.text}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        todoItem.querySelector('.edit-btn').addEventListener('click', async () => {
            const newText = prompt("Edit your todo", todoData.text);
            if (newText !== null) {
                await update(ref(database, `users/${userId}/todos/${id}`), { text: newText });
            }
        });

        todoItem.querySelector('.delete-btn').addEventListener('click', async () => {
            await remove(ref(database, `users/${userId}/todos/${id}`));
        });

        todoList.appendChild(todoItem);
    }

    signoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            redirectWithDelay("login.html");
        } catch (error) {
            console.error("Sign out error:", error.message);
            alert("Sign out error: " + error.message);
        }
    });
}
