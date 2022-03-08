import React from "react";
import HistoryList from "./HistoryList";
import css from './historyContainer.module.css';
import { loadOrdersToStorage } from "../../helpFunctions/helpFunctions";

const HistoryContainer = () => {

    let historyList = loadOrdersToStorage();

    return (
        <div className={css.historyContainer}>
            <HistoryList historyList={historyList}  />
        </div>
    )
}

export default HistoryContainer;