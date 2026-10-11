let dashBoard=document.getElementById("dashBoard");
let inputTask=document.getElementById("inputTask");
let taskForm=document.getElementById("taskForm");
let addBtn=document.getElementById("addBtn");
let allTasks=document.getElementById("allTasks");
let selectOpt=document.getElementById("selectOpt");

let tasks=[];

function displayTasks(){
    allTasks.innerHTML = "";
    tasks.forEach((task,index)=> {
        let allTask=document.createElement("div");

        let input=document.createElement("p");
        input.innerText=task.title;

        let cat=document.createElement("p");
        cat.innerText=task.category;

        let progres=document.createElement("p");
        progres.innerText=`Progress : ${task.progress} %`;

        let incBtn=document.createElement("button");
        incBtn.innerText="+";

        let decBtn=document.createElement("button");
        decBtn.innerText="-";

        let delBtn=document.createElement("button");
        delBtn.innerText="Delete";

        delBtn.addEventListener("click",()=> {
            tasks.splice(index,1);
            displayTasks();
        });

        allTask.appendChild(input);
        allTask.appendChild(cat);
        allTask.appendChild(progres);
        allTask.appendChild(incBtn);
        allTask.appendChild(decBtn);
        allTask.appendChild(delBtn);

        allTasks.appendChild(allTask);
    });
}

taskForm.addEventListener("submit",(e)=> {
    e.preventDefault();
    if(inputTask.value.trim()===""){
        return;
    }
    let newTask={
        title:inputTask.value.trim(),
        category:selectOpt.value,
        progress:0
    }
    tasks.push(newTask);
    displayTasks();
    inputTask.value="";
});