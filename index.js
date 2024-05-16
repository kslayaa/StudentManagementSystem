document.addEventListener('DOMContentLoaded',(event)=>{
    allStudents();
    let form = document.getElementById("formEle");
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        addStudent();
        resetForm();
    })
    
})

async function addStudent(){
    let rollNo=document.getElementById("rollNo").value 
    let name = document.getElementById("name").value 
    let branch = document.getElementById("branch").value 
    let section = document.getElementById("section").value 
    let id=Math.floor(Math.random()*1000).toString();
    let result = document.getElementById("result");
    result.innerHTML="";
    try{
        await axios.post("http://localhost:3000/students",{
            id,rollNo,name,branch,section
        })
       // console.log(res.data);
       allStudents();
            
        
        //console.log(data);
    }
    catch(error){
        console.log(error);
    }

}

async function allStudents(){
    try{
        let res=await axios.get("http://localhost:3000/students")
        let data=res.data
        data.forEach(student=>{
            let tr = document.createElement("tr");
            tr.innerHTML=`<td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.section}</td>
            <td><button onclick="deleteStudent(${student.id})" class="btn btn-danger">Delete</button>
            <button onclick="updateStudent(${student.id})" class="btn btn-light">Update</button>`
            result.appendChild(tr);
        })
    }
    catch(error){
        console.log(error)
    }
}
function resetForm(){
    document.getElementById("rollNo").value =''
    document.getElementById("name").value =''
    document.getElementById("branch").value =''
    document.getElementById("section").value =''
}

async function deleteStudent(id){
    try{
        await axios.delete(`http://localhost:3000/students/${id}`)
        allStudents();
    }
    catch(error){
        console.log(error)
    }
}

async function updateStudent(id){
    let rollNo=document.getElementById("rollNo").value 
    let name = document.getElementById("name").value 
    let branch = document.getElementById("branch").value 
    let section = document.getElementById("section").value 
    if(rollNo==='' || name==='' || branch === '' || section===''){
        alert("Enter all values to update")
    }
    else{
    try{
        await axios.put(`http://localhost:3000/students/${id}`,{rollNo,name,branch,section})
        allStudents();
    }
    catch(error){
        console.log(error);
    }
}
}