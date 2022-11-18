window.onload = () => {
    let input = document.getElementById("newTask")
    let list = document.getElementById("task_list")
    let deleteBTN = document.getElementById("deleteAll")
    let downloadBTN = document.getElementById("download")
    let uploadBTN = document.getElementById("upload")

    let printList = () => {
        list.innerHTML = ''
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if(tasks != null)
            tasks.task_list.map(task => {
                let elm = document.createElement('li')
                elm.textContent = task
                list.appendChild(elm)
            })
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

    //Download from server:
    downloadBTN.addEventListener('click', e => {
        fetch("/download").then(r => r.json()).then(r => {
            if(Object.keys(r).length < 1)
                r = {
                    "task_list": []
                }
            localStorage.setItem('tasks', JSON.stringify(r))
            printList()
            console.log(r)
        })

    })

    //Upload to server:
    uploadBTN.addEventListener('click', e => {
        fetch('/upload', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: localStorage.getItem('tasks')
        })
            .then(r => r.text())
            .then(r => console.log(r))
    })
}

