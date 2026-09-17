import {atom} from "jotai";
import {localStorageEffect} from "../Effects/localStorageEffect";

export const userState=atom({
    key: "userData",
    default:{},
    effects_UNSTABLE:[
        localStorageEffect("userData")
    ],
});