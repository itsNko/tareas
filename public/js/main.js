window.onload = () => {
    let input = document.getElementById("newTask")
    let list = document.getElementById("task_list")
    let deleteBTN = document.getElementById("deleteAll")

    let printList = () => {
        list.innerHTML = ''
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if(tasks != null) {
            tasks.task_list.map(task => {
                let elm = document.createElement('li')
                elm.textContent = task
                list.appendChild(elm)
            })
        }
    }

    printList()

    //Insert element (enter press in input):
    input.addEventListener("keydown", e =>
    {
        if(e.key === 'Enter'){
            let tasks = localStorage.getItem('tasks')
            if(tasks == null) {
                tasks = {
                    "task_list": []
                }
            }
            else
                tasks = JSON.parse(tasks)
            tasks.task_list.push(input.value)

            localStorage.setItem('tasks', JSON.stringify(tasks))
            input.value = ""
            printList()
        }
    })

    //Delete all from local:
    deleteBTN.addEventListener('click', e => {
        localStorage.removeItem("tasks")
        list.innerHTML = ''
    })
}

