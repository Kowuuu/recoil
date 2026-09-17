import {userState} from "../States/userState";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";

export const Login=()=>{
    const setUserState=useSetRecoilState(userState)
    const userData=useRecoilValue(userState)
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()

    const handleLogin=(data)=>{
        if(data.email!=="admin@admin.com"||data.password!=="123456"){
            setError("error.Data",{
                type:"manual",
                message:"uneti podaci nisu tacni"
            })
            return;
        }
        setUserState({
            "loggedIn":true,
            "email":data.email
        })
    }
    const logoutUser=()=>{
        setUserState({})
    }
    return(
        !userData.loggedIn ? (
        <form onSubmit={handleSubmit(handleLogin)}>
            {errors.errorData && <p>{errors.errorData.message}</p>}
            <input { ...register("email")} type="text" placeholder="Enter your email"/>
            <input { ...register("password")} type="password" placeholder="Enter your password"/>
            <button>Login</button>
        </form>
        ):(
            <button type="button" onClick={logoutUser}>Logout</button>
        )
    )
}