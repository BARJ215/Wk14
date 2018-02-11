Backendless.initApp("1F116359-9934-2652-FF41-EC23042C0400","B59AA48F-500F-B1E8-FF7B-EACAB3399500");

$(document).on("pageshow","#pageone",onPageShow);
$(document).on("click","#addTaskButton",onAddTask);

function onPageShow(){
    console.log("page shown");
    Backendless.Data.of("Tasks").find().then(processResults).catch(error);
}

function processResults(tasks){
    //display the first task in an array of tasks/
    //alert(tasks[0].Task);
    $('#taskList').empty();
    //add each new tasks
    for(var i=0; i<tasks.length;i++){
        $('#taskList').append("<li>"+tasks[i].Task+"</li>");        
    }
    //refresh the listview
    $('#taskList').listview('refresh');
}
  
function onAddTask(){
    console.log("add task button clicked");
    var taskText=$('addTaskText').val();
    console.log(taskText);
    //Create newtask object
    var newTask={};
    newTask.Task=taskText;
    //Save new object
    Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);   
}

function saved(savedTask){
    console.log("new Contact instance has been saved" + savedTask);
}
    
function error(err){
    alert(err);   
}
