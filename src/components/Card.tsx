// import React from 'react';
import { CardType, SearchResult } from "../types";
import './card.css';

export default function Card({ title, description, indexes }: SearchResult) {
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
                        description.split("").map((letter,index) => {
                            return indexes.includes(title.length + 2 + index)
                            ? <span key={index} className="found">{letter}</span>
                            : letter
                        })
                    }
                </div>
            </div>
        </>
    );
}