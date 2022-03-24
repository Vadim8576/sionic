import React from "react";
import HistoryItem from "./HistoryItem";
import { HistoriItemType } from '../../types/types';

interface HistoryListProps {
    historyList: HistoriItemType[]
}



const HistoryList: React.FC<HistoryListProps> = ({historyList}) => {

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