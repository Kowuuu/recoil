import {useForm} from "react-hook-form";
import React from "react";

const CommentForm=({task, callbackPostComment})=>{
    const{
        register,handleSubmit
        }=useForm();

    const postComment=(data)=>{
        callbackPostComment
    }
    return(
        <form onSubmit={handleSubmit(postComment)}>
            <input {...register("comment")} type="text" placeholder="unesite vas komentar" />
            <input {...register("taskId")} type="hidden" defaultValue={task.id}/>
            <button type="button">Post comment</button>
        </form>
    )
}
export default CommentForm