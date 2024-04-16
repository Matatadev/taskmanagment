firebase.initializeApp({
    apiKey: "AIzaSyCxcieIq8G6SGTUahsXERCUKSQji7GF_8g",
    authDomain: "plpweb-38089.firebaseapp.com",
    projectId: "plpweb-38089",
    storageBucket: "plpweb-38089.appspot.com",
    messagingSenderId: "599891532557",
    appId: "1:599891532557:web:82d68d2f0ad34d86646e44"
  

});
const db = firebase.firestore();


function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}


function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}


db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});



function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
}