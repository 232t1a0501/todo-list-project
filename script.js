document.addEventListener("DOMContentLoaded",loadTasks);

function addTask(){

let input=document.getElementById("taskInput");
let text=input.value.trim();

if(text===""){
alert("Please enter a task");
return;
}

let task={
id:Date.now(),
text:text
};

createTask(task);
saveTask(task);

input.value="";
}

function createTask(task){

let li=document.createElement("li");

let span=document.createElement("span");
span.textContent=task.text;

span.onclick=function(){
span.classList.toggle("completed");
};

let delBtn=document.createElement("button");
delBtn.textContent="Delete";
delBtn.className="delete-btn";

delBtn.onclick=function(){
li.remove();
removeTask(task.id);
};

li.appendChild(span);
li.appendChild(delBtn);

document.getElementById("taskList").appendChild(li);
}

function saveTask(task){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.push(task);

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.forEach(task=>{
createTask(task);
});
}

function removeTask(id){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks=tasks.filter(task=>task.id!==id);

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function clearAll(){

localStorage.removeItem("tasks");

document.getElementById("taskList").innerHTML="";
}

document.getElementById("taskInput")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addTask();
}

});