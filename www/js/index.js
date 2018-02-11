Backendless.initApp("1F116359-9934-2652-FF41-EC23042C0400","B59AA48F-500F-B1E8-FF7B-EACAB3399500");

$(document).on("pageshow","#pageone",onPageShow);

function onPageShow(){
    console.log("page shown");
    
    Backendless.Data.of("Tasks").find().then(processResults).catch(error);
    
    function processResults(tasks){
        //display the first task in an array of tasks/
        alert(tasks[0].Task);
            
    }
    
    function error(err){
        alert(err);
        
    }
    
}
