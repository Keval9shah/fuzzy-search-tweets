// import React from 'react';
import { CardType } from "../types";
import './card.css';

export default function Card(props:CardType) {
    return (
        <>
            <div className="card">
                <div className="title">{props.title}</div>
                <div className="border-bottom"></div>
                <div className="description">{props.description}</div>
            </div>
        </>
    );
}