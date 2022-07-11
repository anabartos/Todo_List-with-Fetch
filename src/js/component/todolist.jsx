import React, { useState, useEffect } from "react";
const url = 'https://assets.breatheco.de/apis/fake/todos/user/abartos';

const TodoList = () => {

    const [text, setText] = useState("");
    const [task, setTask] = useState([]);


    useEffect(() => {
        getTask()
    }, []);

    const handleText = (event) => {
        setText(event.target.value)
    }

    const createUser = () => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify([{label:"test", done:false}]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("usuario no existe")
                return response.json()
            })
            .then(response => getTask())
            .catch(error => {
                console.log(error)
                
            })
        

    }
    const getTask = () => {

        fetch(url, {
            method: "GET",

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("usuario no existe")
                return response.json()
            })
            .then(response => {
                setTask([...response])
                console.log("Se han descargado las tareas")
            })
            .catch(error => {
                console.log(error)
                createUser()   
            })

    }

    const addTask = async () => {
        if (text) {
            const obj = { label: text, done: false }
            let auxList = ([...task, obj])
            setTask([...task, obj])
            console.log(task)
            setText("")
            await fetch(url, {
                method: "PUT",
                body: JSON.stringify(auxList),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }
    
    const deleteTask = (index) => {
        const newTask = task.filter((element, position) => position != index)
        setTask(newTask)
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {

                console.log(data.result); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });
    }

    const deleteAllTask = (done) => {
        
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                createUser()

                console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                console.log(error);
            });
    }

    return (
        <div>
            <div className="input-group mb-3 border-4">
                <input type="text"
                    placeholder="What needs to be done?"
                    className="form-control"
                    aria-describedby="inputGroup-sizing-default"
                    value={text}
                    onChange={handleText}
                    onKeyUp={e => {
                        e.preventDefault()
                        e.keyCode == 13 && addTask()} } />
            </div>
            <ul>
                {task ?
                    <ul>
                        {task.map((value, index) => {
                            return <li key={index}>{value.label}<button className="button border-0 text-muted bg-transparent" onClick={() => { deleteTask(index) }}><i className="fa-solid fa-trash-can"></i></button>
                            </li>
                        })
                        }
                    </ul> : ""}
                {task.length != 0 ? <div className="label"><label>{task.length} item left</label></div> : <div className="no-task">No pending task</div>}{task.length ? (
                    <div className="deleteAll">
                        <button className="button blue" onClick={() => { deleteAllTask() }}>
                            Delete all done
                        </button>
                    </div>
                ) : null}
            </ul>
        </div>

    )
}

export default TodoList;
