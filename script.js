var tasks = [] ;

const newTask = document.querySelector('.taskCreate') ;
const taskbtn = document.querySelector('#task_btn') ;
const list = document.querySelector('#taskList') ;
const ongoing_btn = document.querySelector('#ongoing') ;
const all_btn = document.querySelector('#all_tasks') ;
const fin_btn = document.querySelector('#done') ;

//Add new task
taskbtn.addEventListener('click' , () =>{

    if( newTask.value.length>0  ){

        let obj = { task : newTask.value , done : false } ;
        tasks.push(obj) ;

        sortTasks() ;


        //console.log(tasks) ;
        add_task(obj.task) ;

        //complete() ;



        if(tasks.length>1) {
            sortListDir();
        }

    }

}) ;






function taskItem(task , index){

    let html = `
        
        <div id="item-${index}" class="item">

                <i class="large tasks icon"></i>
        
                <div class="content">
                     
                     <div id="des-${index}" class="description">${task}</div>
        
                     <div class="description">
                            <label>Done</label>
                            <input id="chk${index}" type="checkbox"  />
                     </div>
                     
                     <div class="row two column">
                         
                         <div style="position: relative ; left: 100px; bottom: 30px"  
                         id="edit-${index}" onclick="edit(this)" class="col ui button positive">Edit</div>
                         
                          <div style="position: relative ; left: 100px; bottom: 30px"  
                         id="delete-${index}" onclick="del_task(this)" class="col ui button negative">Delete</div>
                         
                         
                     </div>
                     
                 </div>

        </div>`  ;

    return html ;


}



function del_task(btn){

    let index = btn.id.charAt(7) ;

    let itm = document.querySelector(`#item-${index}`) ;



    //Index of child node
    let ind = Array.prototype.indexOf.call( list.children , itm );
    //Delete corresponding task in array
    tasks.splice(ind , 1) ;

    list.removeChild(itm) ;



    sortTasks();

    if(tasks.length>1) {
        sortListDir();
    }





}



//Add listeners to checkboxes
function addCheckboxlistener(number){

    //console.log(tasks[number-1]) ;
    //console.log('Length = ' + tasks.length+ "  Number = " + number) ;


    let checkbox = document.querySelector(`#chk${number}`) ;

    checkbox.addEventListener('change' , function(){
        //console.log(tasks) ;

        tasks[number-1].done = checkbox.checked ;
    })  ;


}






//Return html from a string
function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}



function sortTasks(){

    tasks.sort( (a,b) =>{
        if(a.task> b.task)
            return 1 ;
        if(a.task < b.task)
            return -1
    }) ;

    var all_divs = document.querySelectorAll('.item') ;

    all_divs.forEach(div =>{
        //console.log(div.id) ;
    })


}




function edit(btn){

    let id = btn.id.charAt(5) ;

    let itm = document.querySelector('#item-'+id) ;
    let des = document.querySelector('#des-'+id) ;

    let oldText = itm.innerHTML ;

    //itm.innerHTML = "" ;

    itm.classList.add('disabled') ;


    var frm = fragmentFromString(editWindow(des.textContent , id)) ;


    //itm.appendChild(frm) ;
    itm.parentNode.insertBefore(frm , itm.nextSibling) ;




   // var referenceNode = document.querySelector('#some-element');

    // Insert the new node before the reference node
   // referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);


}

function editWindow(task, index){

    let html = `<div id="win-${index}" class="ui segment compact">
        <div class="ui input">
            <input id="edt-${index}" type="text" placeholder=${task}>
        </div>


        <div class="ui grid">
            <div style="margin-top: 10px" class="row two column">
               
                <div style="margin-left: 13px" class="col ui button positive"
                onclick="save(${index})">Save</div>
                
                <div style="margin-left: 25px" class="col ui button negative"
                onclick="cancel(${index})">Cancel</div>
                
            </div>
        </div>

    </div>`;


    return html ;
}

function save(index){

    let editWnd = document.querySelector(`#win-${index}`)  ;

    let edittextBox = document.querySelector(`#edt-${index}`)  ;

    let text =  edittextBox.value ;

    if(text.length > 0) {

        let descr = document.querySelector(`#des-${index}`);

        descr.textContent = text;

        let itm = document.querySelector('#item-' + index);

        itm.classList.remove('disabled');

        list.removeChild(editWnd);


        //Modifying the array
        //var child = document.getElementById('my_element');
        //var parent = child.parentNode;
        // The equivalent of parent.children.indexOf(child)
        //var index = Array.prototype.indexOf.call(parent.children, child);
        let ind = Array.prototype.indexOf.call( list.children , itm );

        console.log(ind) ;

        tasks[ind].task = text ;


        sortTasks();

        if(tasks.length>1) {
            sortListDir();
        }


    }else{

    }


}

function cancel(index){

    let editWnd = document.querySelector(`#win-${index}`)  ;

    let itm = document.querySelector('#item-' + index)  ;

    itm.classList.remove('disabled')    ;

    list.removeChild(editWnd)   ;

}




function ongoing(){

    var checkBoxes = document.querySelectorAll('input[type=checkbox]')  ;

    checkBoxes.forEach(box =>{

        let id = box.id.charAt(3) ;

        let item = document.querySelector(`#item-${id}`) ;

        if(box.checked===true)
            item.style.display = "none" ;

        if(box.checked===false)
            item.style.display = "block" ;

    });


}

function finished(){

    var checkBoxes = document.querySelectorAll('input[type=checkbox]')  ;

    checkBoxes.forEach(box =>{

        let id = box.id.charAt(3) ;

        let item = document.querySelector(`#item-${id}`) ;

        if(box.checked===false)
            item.style.display = "none" ;

        if(box.checked===true)
            item.style.display = "block" ;

    });


}

function all(){

    var checkBoxes = document.querySelectorAll('input[type=checkbox]')  ;

    checkBoxes.forEach(box =>{

        let id = box.id.charAt(3) ;

        let item = document.querySelector(`#item-${id}`) ;

        item.style.display = "block" ;

        console.log(item.style.display) ;

    });

}

all_btn.addEventListener('click' , all) ;

ongoing_btn.addEventListener('click' , ongoing ) ;

fin_btn.addEventListener('click' , finished ) ;






function complete(){


    list.innerHTML = "";


    tasks.map(item => {

        let index = tasks.indexOf(item);

        let html = taskItem(item.task, index);

        let fragment = fragmentFromString(html);
        list.appendChild(fragment);

        /*
        var checkBox = document.getElementById(`chk${index}`) ;
        checkBox.addEventListener('change' , function(){
            item.done = checkBox.checked ;
        })
        */


    }) ;




}



function add_task(task){

    let index = tasks.length ;
    let html = taskItem(task, index) ;
    let fragment = fragmentFromString(html) ;
    list.appendChild(fragment) ;
    addCheckboxlistener(tasks.length) ;
//console.log(tasks) ;

}


//Sort List Items
function sortListDir(){




    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {

        var i1 = a.id.charAt(5) ;
        var i2 = b.id.charAt(5) ;

        //console.log("id 1 = "+ i1+"  id 2 = "+ i2) ;

        var d1 = document.querySelector(`#des-${i1}`) ;
        var d2 = document.querySelector(`#des-${i2}`) ;

        //console.log("Task d1 = " + d1.textContent + "  Task d2 = " + d2.textContent) ;


        return  d1.textContent.toLowerCase() === d2.textContent.toLowerCase()
            ? 0
            : (d1.textContent.toLowerCase() > d2.textContent.toLowerCase() ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }





}

function showModal(){
    $('.ui.basic.modal')
        .modal('show')

}





//Checkbox
/*
let chk = document.querySelector('.ch').checked ;
console.log(chk) ;




*/


/*
    let html = `
        <div id="item-${index}" class="item">


                <i class="large tasks icon"></i>

                <div class="content">
                    <div id="des-${index}" class="description">${task}</div>

                     <div class="description">
                            <label>Done</label>
                            <input id="chk${index}" type="checkbox" />
                     </div>

                     <div style="position: relative ; left: 100px; bottom: 30px"
                     id="edit-${index}" onclick="edit(this)" class="ui button positive">Edit</div>



                 </div>

        </div>`  ;
        */
