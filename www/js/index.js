Backendless.initApp("1F116359-9934-2652-FF41-EC23042C0400","B59AA48F-500F-B1E8-FF7B-EACAB3399500");

$(document).on("pageshow","#pageone",onPageShow);
$(document).on("click","#addTaskButton",onAddTask);
$(document).on("click","#removeTaskButton",onDeleteTask);

function onPageShow(){
    console.log("page shown");
    Backendless.Data.of("Tasks").find().then(processResults).catch(error);
    login();
}

function processResults(tasks){
    //display the first task in an array of tasks/
    //$('#taskList').empty();
    $('#taskTable tr').remove();
    $('#taskTable').append("<tr><th>Task</th><th>Due Date</th><th>Completed</th></tr>");
    $('#removeTaskSelect').empty();
    
    //add each new tasks
    for(var i=0; i<tasks.length;i++){
        //$('#taskList').append("<li>"+tasks[i].Task+"</li>");
        $('#taskTable').append("<tr><td>"+tasks[i].Task+"</td><td>"+new Date(tasks[i].DueDate)+"</td><td>"+tasks[i].Completion+"</td></tr>");
        $('#removeTaskSelect').append("<option value="+tasks[i].objectId+">"+tasks[i].Task+"</option>");
    }
    //refresh the listview
    $('#taskList').listview('refresh');
}
  
function onAddTask(){
    console.log("add task button clicked");
    var taskText=document.getElementById("addTaskText").value;
    var taskDate=document.getElementById('addTaskDate').value;
    var taskConfirm=document.getElementById('addTaskCompleted').checked;
    console.log(taskText);
    //Create newtask object
    var newTask={};
    newTask.Task=taskText;
    newTask.DueDate=taskDate;
    newTask.Completion=taskConfirm;
    //Save new object
    Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);
    
}

function onDeleteTask(){
    console.log("delete task button clicked");
    var selectID =$( "#removeTaskSelect option:selected" ).val();
    //Remove Object by ID
    Backendless.Data.of("Tasks").remove(selectID).then(removed).catch(error);
}

function login(){
    Backendless.UserService.login("example@email.com","password",false).then(userRegistered).catch(error);
}

function userRegistered(){
    console.log("User logged in");
}

function saved(savedTask){
    console.log("new object instance has been saved" + savedTask);
    onPageShow();
}

function removed(removedTask){
    console.log("object instance has been removed" + removedTask);
    onPageShow();
}
    
function error(err){
    alert(err);   
}
