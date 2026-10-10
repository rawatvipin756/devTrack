let dashBoard=document.getElementById("dashBoard");
let inputTask=document.getElementById("inputTask");
let taskForm=document.getElementById("taskForm");
let addBtn=document.getElementById("addBtn");
let allTasks=document.getElementById("allTasks");

let tasks=[];

function displayTasks(){
    allTasks.innerHTML = "";
    tasks.forEach((task,index)=> {
        let allTask=document.createElement("div");
        let input=document.createElement("p");
        input.innerText=task;

        let delBtn=document.createElement("button");
        delBtn.innerText="Delete";

        delBtn.addEventListener("click",()=> {
            tasks.splice(index,1);
            displayTasks();
        });

        allTask.appendChild(input);
        allTask.appendChild(delBtn);

        allTasks.appendChild(allTask);
    });
}

taskForm.addEventListener("submit",(e)=> {
    e.preventDefault();
    if(inputTask.value.trim()===""){
        return;
    }
    tasks.push(inputTask.value.trim());
    displayTasks();
    inputTask.value="";
});