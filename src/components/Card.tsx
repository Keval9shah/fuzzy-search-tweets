// import React from 'react';
import { CardType } from "../types";
import './card.css';

export default function Card(props:CardType) {
    return (
        <>
            <div className="card">
                <span className="title-parent">
                    <div title={props.title} className="title">
                        {
                            props.title.split("").map((letter,index) => {
                                return props.indexes.includes(index + 1)
                                ? <span key={index} className="found">{letter}</span>
                                : letter
                            })
                        }
                    </div>
                </span>
                <div className="border-bottom"></div>
                <div className="description">
                    {
                        props.description.split("").map((letter,index) => {
                            return props.indexes.includes(props.title.length + 2 + index)
                            ? <span key={index} className="found">{letter}</span>
                            : letter
                        })
                    }
                </div>
            </div>
        </>
    );
}