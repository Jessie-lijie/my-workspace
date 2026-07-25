// =====================
// 我的工作台 App
// =====================


// 获取任务数据

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];




// 页面加载

window.onload = function(){

    renderTasks();

    loadDiary();

    updateProgress();

};




// =====================
// 弹窗控制
// =====================


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





// =====================
// 添加任务
// =====================


function addTask(){


    let input =
    document.getElementById("taskInput");


    let name =
    input.value.trim();



    if(name===""){

        return;

    }



    let priority =
    document.getElementById("taskPriority")
    .value;



    let date =
    document.getElementById("taskDate")
    .value;



    tasks.push({


        id:Date.now(),


        name:name,


        priority:priority,


        date:date,


        completed:false


    });



    saveTasks();



    input.value="";


    document
    .getElementById("taskDate")
    .value="";



    closeTask();


    renderTasks();


    updateProgress();


}






// =====================
// 显示任务
// =====================


function renderTasks(){


    let lists = [


        document.getElementById("taskList"),


        document.getElementById("allTasks")


    ];



    lists.forEach(function(list){


        if(list){

            list.innerHTML="";

        }


    });




    tasks.forEach(function(task){



        lists.forEach(function(list){



            if(!list){

                return;

            }




            let div =
            document.createElement("div");



            div.className =
            "task-item "
            +
            (
                task.completed
                ?
                "completed"
                :
                ""
            );





            div.innerHTML = `


            <div class="task-left">


            <input

            type="checkbox"

            ${task.completed ? "checked" : ""}

            onclick="toggleTask(${task.id})"


            >




            <span>


            ${task.name}


            <br>


            <small>


            ${task.priority ? "🏷️ "+task.priority : ""}


            ${task.date ? "　📅 "+task.date : ""}


            </small>



            </span>



            </div>





            <div

            class="delete"

            onclick="deleteTask(${task.id})"

            >

            删除


            </div>



            `;




            list.appendChild(div);



        });



    });



}






// =====================
// 完成任务
// =====================


function toggleTask(id){



    let task =
    tasks.find(function(item){


        return item.id === id;


    });




    if(task){


        task.completed =
        !task.completed;


    }



    saveTasks();


    renderTasks();


    updateProgress();



}







// =====================
// 删除任务
// =====================


function deleteTask(id){



    tasks =
    tasks.filter(function(task){



        return task.id !== id;



    });




    saveTasks();


    renderTasks();


    updateProgress();



}







// =====================
// 保存任务
// =====================


function saveTasks(){



    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );



}







// =====================
// 更新完成率
// =====================


function updateProgress(){



    let total =
    tasks.length;



    let done =
    tasks.filter(function(task){



        return task.completed;



    }).length;





    let percent =

    total===0

    ?

    0

    :

    Math.round(

        done / total * 100

    );





    let bar =
    document.getElementById(
        "progressBar"
    );



    let text =
    document.getElementById(
        "progressText"
    );





    if(bar){


        bar.style.width =
        percent+"%";


    }




    if(text){


        text.innerText =
        percent+"%";


    }




}








// =====================
// 日记保存
// =====================


let diary =
document.getElementById("diary");



if(diary){


    diary.addEventListener(

    "input",

    function(){


        localStorage.setItem(

            "diary",

            diary.value

        );


    }


    );


}






function loadDiary(){



    let saved =
    localStorage.getItem("diary");



    let diaryBox =
    document.getElementById("diary");



    if(saved && diaryBox){


        diaryBox.value =
        saved;


    }



}







// =====================
// 页面切换
// =====================


function switchPage(page, nav){



    let home =
    document.getElementById("home");



    if(home){


        home.style.display="none";


    }





    document
    .querySelectorAll(".page")
    .forEach(function(item){


        item.style.display="none";


    });





    let target =
    document.getElementById(page);



    if(target){


        target.style.display="block";


    }





    document
    .querySelectorAll(".nav-item")
    .forEach(function(item){



        item.classList.remove("active");



    });





    if(nav){


        nav.classList.add("active");


    }



}







// =====================
// PWA
// =====================


if ("serviceWorker" in navigator) {


    navigator.serviceWorker.register(
        "service-worker.js"
    )

    .then(function(){


        console.log("PWA ready");


    });


}
