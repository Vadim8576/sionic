import React from "react";
import HistoryItem from "./HistoryItem";
import css from './historyList.module.css';


const HistoryList = ({historyList}) => {

    return (
        <>
            {historyList &&
                historyList.map((historiItem, key) =>
                    <HistoryItem key={key} historiItem={historiItem} />
                )
            }
           
        </>
    )
}

export default HistoryList;