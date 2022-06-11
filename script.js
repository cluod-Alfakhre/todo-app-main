const tasksContent=document.querySelector('.tasks .content');
const theForm=document.querySelector('form.form');
const validationMassege=document.querySelector('form.form .validation');
const AllBtn=document.querySelector('.categories li.all');//this button when it's clicked will invoke the createElements function
const themeBtn=document.querySelector('nav .theme');

let dragedItem;
let tasksArray=[
    {id:1,text:'hello teacher tell me',complete:false},
    {id:2,text:'my name is hasan mahmode',complete:true},
    {id:3,text:'i do programing alot',complete:false},
];

let completedArray=tasksArray.filter( item => item.complete);

theForm.addEventListener('submit',(event)=>{
    addTask(theForm);
    event.preventDefault();
})

new Sortable(tasksContent, {
    animation: 150,
    ghostClass: 'ghost-item',
});
themeBtn.addEventListener('click',()=>{

    themeBtn.classList.toggle('active');
    document.body.classList.toggle('light-theme');

})
function addTask(form){
    let taskText=form.querySelector('.task-input').value.trim();
    
    if(taskText != '' && !tasksArray.some(item=>item.text == taskText)){
        tasksArray.push({
            id:Date.now(),
            text:taskText,
            complete:false
        })
        
        createSingleElement(tasksArray[tasksArray.length - 1]);
    }else{
        validationMassege.style.display='block';
        setTimeout(() => {
            validationMassege.classList.add('active')
        }, 3);
        setTimeout(() => {
            validationMassege.classList.remove('active')
        }, 3000);
    }
    
}

function createElements(array,theClickedLi){
    tasksContent.innerHTML=''

    array.forEach(el => {
        createSingleElement(el)
    });

    document.querySelectorAll('.categories li').forEach(el=>el.classList.remove('active'));
    theClickedLi.classList.add('active');//theClickedLi is the li that is now clicked
}

function createSingleElement(el){
    const div=document.createElement('div');
    div.classList.add('list-group-item')
    div.setAttribute('draggable','true')
        div.innerHTML=`
        <div class="task ${ el.complete? 'complete' : '' } " id="${el.id}">
            <div class="check" onClick="completeTask(${el.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            </div>
            <p>${el.text}</p>
            <div class="delete" onClick="deleteItem(${el.id},this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>
        </div>
        `;
    tasksContent.appendChild(div);
    document.querySelector('.count-items').innerHTML=`${tasksArray.length} Items`;//to show the number of items
    addToLocalStorage();
}

function deleteItem(id,e){
    tasksArray=tasksArray.filter( item=> item.id != id );
    e.parentElement.parentElement.style.opacity='0';
    setTimeout(() => {
        e.parentElement.parentElement.remove()
    }, 200);

    addToLocalStorage();
}

function completeTask(id){

    tasksArray.filter( item => item.id == id?item.complete=!item.complete:'' );
    completedArray=tasksArray.filter( item => item.complete);

    document.querySelectorAll('.tasks .content .task').forEach((el)=>{
        el.id==id?el.classList.toggle('complete'):'';
    })

    addToLocalStorage();
}

function showCompleted(completedArray,theClickedLi){
    completedArray.length != 0? createElements(completedArray,theClickedLi):'';
}

function clearComplete(){
    tasksArray.filter( item => item.complete=false );
    completedArray=[];
    AllBtn.click();//this click will invoke the createElements function
}

function addToLocalStorage(){
    localStorage.setItem('tasksArray',JSON.stringify(tasksArray))
}

document.addEventListener("DOMContentLoaded", function(){
    localStorage.getItem(tasksArray)? tasksArray=JSON.parse(localStorage.getItem('tasksArray')):'';
    AllBtn.click();//this click will invoke the createElements function
    
});