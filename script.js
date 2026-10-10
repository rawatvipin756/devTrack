let dashBoard=document.getElementById("dashBoard");
let inputTask=document.getElementById("inputTask");
let addBtn=document.getElementById("addBtn");
let allTasks=document.getElementById("allTasks");

let tasks=[];

function displayTasks(){
    allTasks.innerHTML = "";
    tasks.forEach((task)=> {
        let input=document.createElement("p");
        input.innerText=task;
        allTasks.appendChild(input);
    });
}

addBtn.addEventListener("click",()=> {
    if(inputTask.value.trim()===""){
        return;
    }
    tasks.push(inputTask.value.trim());
    displayTasks();
    inputTask.value="";
});