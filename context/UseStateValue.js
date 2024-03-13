import { useContext } from "react";
import { StateContext } from "./StateContext";

export const useStateValue = () => {
    return useContext(StateContext)
}