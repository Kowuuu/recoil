import {userState} from "../States/userState";
import {useRecoilValue} from "recoil";

export const UserData=()=>{
    const userData=useRecoilValue(userState);
    return(
        <p>{userData.email}</p>
    )
}
export default UserData;