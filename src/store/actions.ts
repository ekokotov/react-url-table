import React from 'react';
import {load} from "../services/http";
import {Action} from "./reducer";

export const loadDataFromUrl = async (url: string, dispatch: React.Dispatch<Action>): Promise<void> => {
    if (url) {
        const data: any[] = await load(url);
        dispatch({type: 'SET_DATA', payload: {data}})
    }
};
