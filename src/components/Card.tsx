// import React from 'react';
type CardPropType = {
    title:string,
    description: string
}
export default function Card(props:CardPropType) {
    return (
        <>
            {props.title}
            {props.description}
        </>
    );
}