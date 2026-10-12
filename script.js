let dashBoard=document.getElementById("dashBoard");
let inputTask=document.getElementById("inputTask");
let taskForm=document.getElementById("taskForm");
let addBtn=document.getElementById("addBtn");
let allTasks=document.getElementById("allTasks");
let selectOpt=document.getElementById("selectOpt");

let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(){
    let Total=tasks.length;
    let Complete=tasks.filter(task=> task.progress===100).length;
    let Pending=Total-Complete;

    document.getElementById("totalTask").innerText = Total;
    document.getElementById("compTask").innerText = Complete;
    document.getElementById("pendingTask").innerText = Pending;

    allTasks.innerHTML = "";
    tasks.forEach((task,index)=> {

        // console.log(task);
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

        incBtn.addEventListener("click",()=> {
            task.progress=Math.min(task.progress+10,100);
            saveTasks();
            displayTasks();
        });

        decBtn.addEventListener("click",()=> {
            task.progress=Math.max(task.progress-10,0);
            saveTasks();
            displayTasks();
        });

        delBtn.addEventListener("click",()=> {
            tasks.splice(index,1);
            saveTasks();
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
    saveTasks();
    displayTasks();
    inputTask.value="";
});

displayTasks();