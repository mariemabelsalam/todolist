var taskInput = document.getElementById('task')
var form = document.querySelector('form')
var addBtn = document.getElementById('add')
var updateBtn = document.getElementById('update')

var allTasks = []
if (localStorage.getItem('task') != null) {
    allTasks = JSON.parse(localStorage.getItem('task'))
    display()
}
function addProduct() {
    var task = {
        name: taskInput.value
    }
    if (taskInput.value.length == 0) {
        return;
    }
    else {
        allTasks.push(task);
        localStorage.setItem('task', JSON.stringify(allTasks))
        console.log(task.name)
        display()
        clearInput()
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    addProduct()
})

function clearInput() {
    taskInput.value = ''
}

function display() {
    var items = ' '
    for (var i = 0; i < allTasks.length; i++) {
        items += `<tr>
                        <th>${i + 1}</th>
                        <td>${allTasks[i].name}</td>
                        <td class="text-warning"><i class="fa-solid fa-pen-nib" onclick="setUpdate(${i})"></i></td>
                            <td class="text-danger" class="delte" onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></td>
                    </tr>`
    }
    document.getElementById('items').innerHTML = items;
}

function deleteTask(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success m-3",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            allTasks.splice(index, 1)
            localStorage.setItem('task', JSON.stringify(allTasks))
            display()
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}
var currIndex;
function setUpdate(index) {
    currIndex = index;
    taskInput.value = allTasks[index].name;
    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}

function update() {
    var task = {
        name: taskInput.value
    }
    allTasks.splice(currIndex, 1, task)
    localStorage.setItem('task' , JSON.stringify(allTasks))
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    display()
    clearInput()
}

updateBtn.addEventListener('click' , function() {
    update()
})