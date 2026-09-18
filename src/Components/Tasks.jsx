import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../States/userState";
import {CreateTasks} from "./CreateTasks";
import {tasksState} from "../States/tasksState";
import React, {useEffect, useState} from "react";
import {categories} from "../Utils/Categories";
import {useForm} from "react-hook-form";
import GetAllCommentsForPost from "./GetAllCommentsForPost";

export const Tasks = () => {
    const userData = useRecoilValue(userState)
    const taskData = useRecoilValue(tasksState)
    const setTaskData = useSetRecoilState(tasksState)
    const [editTaskId, setEditTaskId] = useState()

    const {
        register,
        handleSubmit,
        formState: {errors},
        resetFormState,
    } = useForm()

    const deleteTask = (taskName) => {
        const filteredTasks = taskData.filter(task => task !== taskName);
        setTaskData(filteredTasks);
    }

    const updateTask = (data) => {
        setEditTaskId(null)
        const updateTasks = taskData.map(task => {
            if (task.id !== data.taskId) {
                return {
                    ...task,
                    taskname: data.taskName,
                    category: data.taskCategory,
                }
            }
        });
        setTaskData(updateTasks);
    }
    const newCommentPosted = (data) => {
        const tasksWithComments = taskData.map(task => {
            if (task.id === parseInt(data.taskId)) {
            let existingComments=[];
                if(Array.isArray(task.comments)){
                    existingComments=task.comments;
                }

                return({
                    ...task,
                    comments:[...existingComments, data.comment]
                }
            )
            }
            return task;
        });
        setTaskData(tasksWithComments);
    }
    useEffect(() => {
        if (editTaskId !== undefined) {
            const task = taskData.find(t => t.id === editTaskId);
            if (task) {
                resetFormState({
                    taskId: task.id,
                    taskName: task.name,
                    category: task.category,
                })
            }
        }
    }, [editTaskId, resetFormState, taskData]);

    return (
        <>
            <div>
                {userData.loggedIn && (
                    <CreateTasks/>
                )}
            </div>
            <div className="taskHolder">
                {userData.loggedIn && (
                    taskData.map(task => {
                        return (<div className="singleTask" key={task.id}>
                                {editTaskId === task.id ? (
                                    <form className="taskUpdateForm" onCubmit={handleSubmit(updateTask)}>
                                        <input {...register('taskId')} type="hidden" defaultValue={task.id}/>
                                        <select {...register('category')} defaultValue={task.category}>
                                            {categories.map(category => {
                                                return (
                                                    <option selected={category === task.category} key={category}
                                                            value={category}>{category}</option>
                                                )
                                            })}
                                        </select>
                                        <button>Update task</button>
                                    </form>
                                ) : (
                                    <div>
                                        <h3 onClick={() => setEditTaskId(task.id)}>{task.name}</h3>
                                        <p onClick={() => setEditTaskId(task.id)}>{task.category}</p>
                                        <CommentForm task={task} newCommentPosted={newCommentPosted()}/>
                                        <button onClick={() => deleteTask(task.id)} type="button">Delete task
                                        </button>
                                    </div>
                                )}
                                <GetAllCommentsForPost comments={task.comments} taskId={task.id}/>
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}