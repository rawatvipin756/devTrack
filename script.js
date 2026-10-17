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
        allTask.className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-4";

        let input=document.createElement("p");
        input.innerText=task.title;
        input.className="text-lg font-semibold text-slate-800";

        let cat=document.createElement("p");
        cat.innerText=task.category;
        cat.className="text-sm text-blue-600 font-medium mt-1";

        let progres=document.createElement("p");
        progres.innerText=`Progress : ${task.progress} %`;
        progres.className="text-sm text-slate-500 mt-3";

        let progressWrapper = document.createElement("div");
        progressWrapper.className = "w-full bg-slate-200 rounded-full h-2.5 mt-2";

        let progressFill = document.createElement("div");
        progressFill.className = "bg-blue-600 h-2.5 rounded-full transition-all duration-300";

        progressFill.style.width = `${task.progress}%`;
        progressWrapper.appendChild(progressFill);

        let incBtn=document.createElement("button");
        incBtn.innerText="+";
        incBtn.className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition";

        let decBtn=document.createElement("button");
        decBtn.innerText="-";
        decBtn.className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition";

        let delBtn=document.createElement("button");
        delBtn.innerText="Delete";
        delBtn.className ="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition";

        let btnContainer = document.createElement("div");
        btnContainer.className = "flex gap-2 mt-4";

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
        allTask.appendChild(progressWrapper);
        
        btnContainer.appendChild(incBtn);
        btnContainer.appendChild(decBtn);
        btnContainer.appendChild(delBtn);

        allTask.appendChild(btnContainer);

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