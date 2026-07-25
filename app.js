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


    let list =
    document.getElementById("taskList");


    list.innerHTML="";



    tasks.forEach(task=>{


        let div =
        document.createElement("div");


        div.className =
        "task-item "
        +
        (task.completed?
        "completed":"");



        div.innerHTML = `

        <div class="task-left">

        <input 
        type="checkbox"
        ${task.completed?"checked":""}
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


}



// 完成任务

function toggleTask(id){


    let task =
    tasks.find(t=>t.id===id);



    task.completed =
    !task.completed;



    saveTasks();


    renderTasks();


    updateProgress();


}




// 删除任务

function deleteTask(id){


    tasks =
    tasks.filter(
        t=>t.id!==id
    );


    saveTasks();


    renderTasks();


    updateProgress();


}



// 保存任务

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



// 更新完成率

function updateProgress(){


    let total =
    tasks.length;


    let done =
    tasks.filter(
        t=>t.completed
    ).length;



    let percent =
    total===0?
    0:
    Math.round(
        done/total*100
    );



    document
    .getElementById(
        "progressBar"
    )
    .style.width =
    percent+"%";



    document
    .getElementById(
        "progressText"
    )
    .innerText =
    percent+"%";


}




// =====================
// 日记保存
// =====================


let diary =
document.getElementById("diary");



diary.addEventListener(
"input",
function(){

localStorage.setItem(
"diary",
diary.value
);

});





function loadDiary(){

let saved =
localStorage.getItem("diary");


if(saved){

document.getElementById(
"diary"
).value=saved;

}


}





if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("PWA ready"));
}

function switchPage(page, nav){


    //隐藏首页

    document.getElementById("home")
    .style.display="none";


    //隐藏其他页面

    document.querySelectorAll(".page")
    .forEach(function(item){

        item.style.display="none";

    });



    //显示目标页面

    document.getElementById(page)
    .style.display="block";



    //清除导航状态

    document.querySelectorAll(".nav-item")
    .forEach(function(item){

        item.classList.remove("active");

    });



    //添加当前状态

    nav.classList.add("active");


}
