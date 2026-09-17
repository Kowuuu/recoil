import './App.css';
import {RecoilRoot} from "recoil";
import {Login} from "./Components/Login";
import UserData from "./Components/UserData";
import {Tasks} from "./Components/Tasks";


export const App = () => {
    return (
        <RecoilRoot>
            <Tasks/>
            <UserData/>
            <Login/>
        </RecoilRoot>
    )
}

export default App;
