// =====================
// 我的工作台 App
// =====================


// 获取数据

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];


// 页面加载

window.onload = function(){

    renderTasks();

    loadDiary();

    updateProgress();

};



// 显示新增任务窗口

function showAddTask(){

    document
    .getElementById("taskBox")
    .classList
    .remove("hidden");

}



// 关闭窗口

function closeTask(){

    document
    .getElementById("taskBox")
    .classList
    .add("hidden");

}



// 添加任务

function addTask(){

    let input =
    document.getElementById("taskInput");


    let name =
    input.value.trim();



    if(name===""){
        return;
    }



    tasks.push({

        id:Date.now(),

        name:name,

        completed:false

    });



    saveTasks();


    input.value="";


    closeTask();


    renderTasks();


    updateProgress();

}



// 显示任务

function renderTasks(){
console.log(
    "taskList:",
    document.getElementById("taskList")
);

console.log(
    "allTasks:",
    document.getElementById("allTasks")
);

    let lists = [
        document.getElementById("taskList"),
        document.getElementById("allTasks")
    ];


    // 清空两个列表

    lists.forEach(list => {

        if(list){

            list.innerHTML="";

        }

    });



    tasks.forEach(task=>{


        lists.forEach(list=>{


            if(!list){
                return;
            }



            let div =
            document.createElement("div");


            div.className =
            "task-item "
            +
            (task.completed ?
            "completed" :
            "");



            div.innerHTML = `

            <div class="task-left">

            <input 
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onclick="toggleTask(${task.id})">


            <span>
            ${task.name}
            </span>


            </div>


            <div 
            class="delete"
            onclick="deleteTask(${task.id})">

            删除

            </div>

            `;



            list.appendChild(div);


        });


    });


}
