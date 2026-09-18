import {useRecoilValue, useSetRecoilState} from "recoil";
import {tasksState} from "../States/tasksState";
import React from "react"
import {useForm} from "react-hook-form";
import {categories} from "../Utils/Categories";

export const CreateTasks = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const setTasks = useSetRecoilState(tasksState);
    const tasks = useRecoilValue(tasksState);

    const createTask = (data) => {

        let taskFound = false;
        tasks.forEach((task) => {
            if (task.name === data.taskName) {
                taskFound = true;
            }
        })
        const newTask = {
            id: Date.now(),   //broj sekundi od 1970 je timestamp
            name: data.taskName,
            category:data.category

        }
        if (taskFound) {
            setTasks(oldTasks => [...oldTasks, newTask]);
        }
    }
    return <>
        <form className="taskCreateForm" onSubmit={handleSubmit(createTask)}>
            <select {...register('category')}>
                {categories.map(category => {
                    return (
                        <option key={category} value={category}>{category}</option>
                )
                })}
            </select>
            {errors.taskName && <p>{errors.taskName.message} </p>}
            <input {...register('taskName', {
                required: "Task name is required."
            })} type="text" placeholder="Enter title of task"/>
            <button>Create task</button>
        </form>
    </>
}