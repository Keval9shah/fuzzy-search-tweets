// import React from 'react';
import './App.css';
import Card from './components/Card';
import { CardType } from "./types";
import { useEffect, useState } from 'react';

export default function App() {

    const [searchResult,setSearchResult] = useState([] as CardType[]);
    let cards: CardType[] = [
        {title:"Beijing faces 'most severe Covid test' amid deaths", description:"Three deaths have been reported in Beijing where cases have been rising despite China's strict zero-Covid policy."},
        {title:"Kosovo flare-up fears over car number plate row", description:"Talks at the EU fail to settle a row over Serbian number plates, fuelling Kosovo violence fears."},
        {title:"Plan to India beam solar energy wirelessly from space", description:"The European Space Agency is considering the 'Solaris Initiative' plan to collect solar energy in orbit and beam electricity back to Earth."},
        {title:"India", description:"5th largest economy in the world. Which is also the fastest growing large economy in the world."}
    ];

    function search(searchPhrase: string) {
        setSearchResult(cards.filter(card => card.title.toLowerCase().includes(searchPhrase.toLowerCase())));
    }

    useEffect(() => {
        search("");
    }, []);

    return (
        <div className="App">
            <input className="searchbox" type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
            <div className='row'>
                {searchResult.map((card, index) =>
                    <Card key={index} title={card.title} description={card.description} />
                )}
            </div>
        </div>
    );
}
