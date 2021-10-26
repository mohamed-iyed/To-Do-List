function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
[...document.querySelectorAll('button')].forEach(button => {
    button.addEventListener('click', function(e) {
        let circ = document.createElement('span');
        let diam = Math.max(button.offsetHeight, button.offsetWidth);
        let rad = diam / 2;
        circ.style.width = circ.style.height = `${diam}px`;
        circ.style.left = `${e.clientX - button.offsetLeft - rad}px`;
        circ.style.top = `${e.clientY - button.getBoundingClientRect().top - rad}px`;
        circ.classList.add('animation');
        button.appendChild(circ);
    });

})
if (storageAvailable('localStorage')) {

    let button = document.querySelector('.to-do-container button');
    let input = document.querySelector('.to-do-container input[type="text"]');
    let todos = document.querySelector('.to-do-container .todos');
    let clear = document.querySelector('.to-do-container button:last-child');
    
    //add the delete event to the todo
    function addClick(elem) {
        elem.querySelector('span:first-child').addEventListener('click', function() {
        elem.classList.add('remove-todo');
        elem.addEventListener('animationend', () => {
            localStorage.removeItem(elem.firstChild.nodeValue);
            elem.remove();
        });
        });
    }
    //add check event todo 
    function addCheckClick(todo) {
        todo.querySelector('span:last-child').addEventListener('click', function() {
            this.parentNode.classList.add('check-todo');
            this.parentNode.addEventListener('animationend', () => {
                localStorage.removeItem(this.parentNode.textContent);
                this.parentNode.remove();
            });
        });
    };

    //append todo
    let addToDo = (todoname) => {
        localStorage.setItem(todoname, todoname);
        let todo = document.createElement('li');
        todo.appendChild(document.createTextNode(todoname));
        todo.appendChild(document.createElement('span'));
        todo.appendChild(document.createElement('span'));
        todos.appendChild(todo);
        addClick(todo);
        addCheckClick(todo);
    }
    
    //check if its a valid todo
    let hand_todo = () => {
        if(input.value !== '' && input.value.trim() !== ''){
           if(!Object.keys(localStorage).includes(input.value)){
            addToDo(input.value);
            input.value = '';
           }else {
                input.value = '';
                input.setCustomValidity('the todo already exist');
                input.reportValidity();
            }
        }else {
            input.value = '';
            input.setCustomValidity('Enter a valid input');
            input.reportValidity();
        }
    };

    //append todos when window is loaded
    window.addEventListener('load', function() {
        todo_list = Object.keys(localStorage);
        for(let i = 0; i < todo_list.length; i++){
            let todo = document.createElement('li');
            todo.appendChild(document.createTextNode(todo_list[i]));
            todo.appendChild(document.createElement('span'));
            todo.appendChild(document.createElement('span'));
            todos.appendChild(todo);
            addClick(todo);
            addCheckClick(todo);
        }
    });
    
    
    //add todo using a button
    button.addEventListener('click',hand_todo);
    
    //add todo when pressing the enter key
    input.addEventListener('keydown', function(e) {
        let event = e.key || e.keyCode;
    
        if(event === '13' || event === 'Enter'){
            hand_todo();
        }
    });
    
    //clear todos button
    clear.addEventListener('click', function() {
        localStorage.clear();
        [...todos.childNodes].forEach(elem => todos.removeChild(elem));
    });
    
    
    
  }
  else {

    alert('Your Browser does not support LOCAL STORAGE API so todos will disapper after any relaod');
    let button = document.querySelector('.to-do-container button');
    let input = document.querySelector('.to-do-container input[type="text"]');
    let todos = document.querySelector('.to-do-container .todos');
    let clear = document.querySelector('.to-do-container button:last-child');
    
    //add the delete event to the todo
    function addClick(elem) {
        elem.querySelector('span:first-child').addEventListener('click', function() {
            elem.classList.add('remove-todo');
            elem.addEventListener('animationend', () => {
                localStorage.removeItem(elem.firstChild.nodeValue);
                elem.remove();
            })

        });
    }
    function deleteElement(elem) {
        elem.parentNode.remove();
    }
    //add check event todo 
    function addCheckClick(todo) {
    todo.querySelector('span:last-child').addEventListener('click', function() {
        this.parentNode.classList.add('check-todo');
        this.parentNode.addEventListener('animationend', () => {
            deleteElement(this);
            localStorage.removeItem(this.parentNode.innerText.trim());
        });
    });
};

    //append todo
    let addToDo = (todoname) => {
        let todo = document.createElement('li');
        todo.appendChild(document.createTextNode(todoname));
        todo.appendChild(document.createElement('span'));
        todos.appendChild(todo);
        addClick(todo);
        addCheckClick(todo);
    }
    
    //check if its a valid todo
    let hand_todo = () => {
        if(input.value !== '' && input.value.trim() !== ''){
           if(todos.innerText.split('\n').includes(input.value)){
            addToDo(input.value);
            input.value = '';
           }else {
                input.value = '';
                input.setCustomValidity('the todo already exist');
                input.reportValidity();
            }
        }else {
            input.value = '';
            input.setCustomValidity('Enter a valid input');
            input.reportValidity();
        }
    };
        
    //add todo using a button
    button.addEventListener('click',hand_todo);
    
    //add todo when pressing the enter key
    input.addEventListener('keydown', function(e) {
        let event = e.key || e.keyCode;
    
        if(event === '13' || event === 'Enter'){
            hand_todo();
        }
    });
    
    //clear todos button
    clear.addEventListener('click', function() {
        [...todos.childNodes].forEach(elem => elem.remove());
    });
    
    
  }

