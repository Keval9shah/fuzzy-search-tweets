// import React from 'react';
import { CardType, SearchResult } from "../types";
import './card.css';

export default function Card({ title, description, indexes }: Omit<SearchResult, "wholeWordsFound">) {

    function wholeDescription() {
        let newIndexes = indexes.map(i => i-title.length-2).filter(i => i>0);
        if(!newIndexes.length) {
            return description;
        }
        let retArr: any[] = [description.slice(0,newIndexes[0])];
        for(let i=0; i<newIndexes.length; i++){
            if(newIndexes.length>1){
                retArr.push(<span key={i} className="found">{description[newIndexes[i]]}</span>);
                let notSearched = description.slice(newIndexes[i]+1,newIndexes[i+1]);
                notSearched.length && retArr.push(notSearched);
            }
        }
        return retArr;
    }

    return (
        <>
            <div className="card">
                <div className="title-parent">
                    <div title={title} className="title">
                        {
                            title.split("").map((letter,index) => {
                                return indexes.includes(index + 1)
                                ? <span key={index} className="found">{letter}</span>
                                : letter
                            })
                        }
                    </div>
                    <div className="border-bottom"></div>
                </div>
                <div className="description">
                    {
                        // description.split("").map((letter,index) => {
                        //     return indexes.includes(title.length + 2 + index)
                        //     ? <span key={index} className="found">{letter}</span>
                        //     : letter
                        // })
                        wholeDescription()
                    }
                </div>
            </div>
        </>
    );
}