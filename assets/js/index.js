    // defining variables
    let taskCard = document.getElementById("taskCard")
    let date = document.getElementById("date")
    let manager = document.getElementById("manager")
    let task = document.getElementById("task")
    let team = document.getElementById("team")
    let type = document.getElementById("type")
    let inputsArr = []
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("cardInputs")) || inputsArr
    let localStorageArr = dataFromLocalStorage

    // input validation function
    let inputValidation = () => {
        let typeValidation = team.value != "" ? 0 : 1;
        let dateValidation = date.value != "" ? 0 : 1;
        let managerValidation = manager.value != "" ? 0 : 1;
        let taskValidation = task.value != "" ? 0 : 1;
        let teamValidation = type.value != "" ? 0 : 1;
        return (dateValidation + managerValidation + taskValidation + teamValidation + typeValidation)

    }


    // creating the card function
    let createTaskCard = () => {
        //    inputs object
        let inputsValue = {
            date: date.value,
            manager: manager.value,
            task: task.value,
            team: team.value,
            type: type.value,
        }
        inputValidation()
        if (inputValidation() == 0) {
            localStorageArr.push(inputsValue)
            sendToLocalStorage()
            clearInputs()
            creatingText()
        } else {
            alert("please fill all the fields")
        }
        console.log(localStorageArr)
        // getFromLocalStorage()
    }
    // creating the text
    let creatingText = () => {
        taskCard.innerHTML = ""
        if (localStorageArr != null) {
            localStorageArr.forEach((item, _index) => {
                taskCard.innerHTML += ` 
                 <div class="animate__animated animate__fadeIn task-card text-white bg-success mb-3 " style="max-width: 18rem;">
                 <div class="card-header">Deadline: ${item.date}</div>
                 <div class="card-body">
                     <h5 class="card-title">Task: ${item.task}</h5>
                     <p class="card-text">Manager: ${item.manager}</p>
                     <p class="card-text">Team: ${item.team}</p>
                     <p class="card-text">Type: ${item.type}</p>
                     <button onclick="remove(${_index})" type="button" class="btn btn-light task-button">Finished</button>           
                     </div>
                 </div>`
            });

        }
    }
    // send To Local Storage
    let sendToLocalStorage = () => {
        localStorage.setItem("cardInputs", JSON.stringify(localStorageArr))
    }

    // removes an object from localstorage and array
    let remove = (_index) => {
        localStorageArr.splice(_index,1)
        console.log(localStorageArr)
        sendToLocalStorage()
        creatingText()
    }
    // clearing all inputs
    let clearInputs = () => {
        date.value = "", manager.value = "", task.value = "", team.value = "", type.value = ""
    }
    // callling draw function
    creatingText()