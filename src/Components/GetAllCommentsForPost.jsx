import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {tasksState} from "../States/tasksState";

const GetAllCommentsForPost=(comments,taskId)=>{
    const taskData=useRecoilValue(tasksState);
    const setTaskData=useSetRecoilState(tasksState);

    const deleteComment=(comment,taskId)=>{
        const tasksWithComments = taskData.map(task => {
            if (task.id === parseInt(taskId)) {
                task.comments.map(taskComment=>{
                    if(taskComment===comment){
                        const updatedComments=task.comments.filter(taskComment=>taskComment!==comment);
                        return{
                            ...task,
                            comments:updatedComments
                        }
                    }
                })
            }
            return task;
        });
        setTaskData(tasksWithComments);
    }
    return(
        <>
            {comments.map((comment)=>(
                <div key={comment} >
                <p>{comment}</p>
                    <button onClick={()=>deleteComment(comment,taskId)}>Delete comments</button>
                </div>
            ))}
        </>
    );
}

export default GetAllCommentsForPost;