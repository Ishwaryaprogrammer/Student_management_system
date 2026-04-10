const API="/api";

let page=1, sort="name", searchText="";

// DOM
const name = document.getElementById("name");
const age = document.getElementById("age");
const dept = document.getElementById("dept");
const email = document.getElementById("email");
const id = document.getElementById("id");

const u = document.getElementById("u");
const p = document.getElementById("p");

const tb = document.getElementById("tb");
const count = document.getElementById("count");
const toast = document.getElementById("toast");

const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");
const err = document.getElementById("err");

// LOGIN
async function login(){
    const res=await fetch(API+"/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({u:u.value,p:p.value})
    });

    if(res.ok){
        loginBox.style.display="none";
        app.style.display="block";
        load();
    } else err.innerText="Invalid Credentials";
}

// LOAD
async function load(){
    const res = await fetch(`${API}/students?page=${page}&sort=${sort}&search=${searchText}`);
    const r = await res.json();

    // ❌ if error
    if(!res.ok){
        toastMsg(r.msg || "Server error",1);
        return;
    }

    // safety check
    if(!r.data){
        toastMsg("No data received",1);
        return;
    }

    count.innerText = r.count || 0;

    tb.innerHTML = r.data.map(s=>`
        <tr>
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.dept}</td>
        <td>${s.email}</td>
        <td>
        <button class="btn btn-warning btn-sm" onclick="edit('${s._id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="del('${s._id}')">Delete</button>
        </td>
        </tr>
    `).join("");
}
// SAVE
async function save(){

    const student={
        name:name.value.trim(),
        age:Number(age.value),
        dept:dept.value,
        email:email.value.trim()
    };

    const reg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!student.name || !student.email || !student.age){
        return toastMsg("Fill all fields",1);
    }

    if(student.age<=0){
        return toastMsg("Invalid age",1);
    }

    if(!reg.test(student.email)){
        return toastMsg("Invalid email",1);
    }

    let res;

    if(id.value){
        res=await fetch(API+"/students/"+id.value,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        });
    } else {
        res=await fetch(API+"/students",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        });
    }

    const data=await res.json();

    if(!res.ok){
        return toastMsg(data.msg,1);
    }

    toastMsg("Saved");
    clearForm();
    load();
}

// EDIT
async function edit(i){
    const s=await (await fetch(API+"/students/"+i)).json();
    id.value=s._id;
    name.value=s.name;
    age.value=s.age;
    dept.value=s.dept;
    email.value=s.email;
}

// DELETE
async function del(i){
    if(confirm("Delete?")){
        await fetch(API+"/students/"+i,{method:"DELETE"});
        toastMsg("Deleted");
        load();
    }
}

// SEARCH
function search(t){
    searchText=t;
    page=1;
    load();
}

// SORT
function changeSort(s){
    sort=s;
    load();
}

// PAGINATION
function next(){ page++; load(); }
function prev(){ if(page>1){page--; load();} }

// FILTER (frontend only)
function filterDept(d){
    document.querySelectorAll("#tb tr").forEach(r=>{
        r.style.display=!d || r.children[2].innerText==d ? "" : "none";
    });
}

// EXPORT
function exportCSV(){
    let csv="Name,Age,Dept,Email\n";

    document.querySelectorAll("#tb tr").forEach(r=>{
        let c=r.children;
        csv+=`${c[0].innerText},${c[1].innerText},${c[2].innerText},${c[3].innerText}\n`;
    });

    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([csv]));
    a.download="students.csv";
    a.click();

    toastMsg("Exported");
}

// TOAST
function toastMsg(msg,err=0){
    toast.innerText=msg;
    toast.style.background=err?"red":"green";
    toast.style.display="block";
    setTimeout(()=>toast.style.display="none",2000);
}

// DARK MODE (FIXED)
function toggleMode(){
    document.body.classList.toggle("dark");
}

// LOGOUT
function logout(){ location.reload(); }
