// import React from 'react';
import './App.css';
import Card from './components/Card';
import { CardType } from "./types";
import { useEffect, useState } from 'react';

export default function App() {

    const [searchResult,setSearchResult] = useState([] as CardType[]);
    let cards: CardType[] = [
        {title:"Beijing faces 'most severe Covid test' amid deaths", description:"Three deaths have been reported in Beijing where cases have been rising despite China's strict zero-Covid policy.", indexes:[]},
        {title:"Kosovo flare-up fears over car number plate row", description:"Talks at the EU fail to settle a row over Serbian number plates, fuelling Kosovo violence fears.", indexes:[]},
        {title:"Plan to India beam solar energy wirelessly from space", description:"The European Space Agency is considering the 'Solaris Initiative' plan to collect solar energy in orbit and beam electricity back to Earth.", indexes:[]},
        {title:"India", description:"5th largest economy in the world. Which is also the fastest growing large economy in the world.", indexes:[]},
        {title:"Australia make superb start against England in final ODI", description:"Follow live text and BBC Radio 5 Sports Extra commentary as England face Australia in the third of three one-day international in Melbourne.", indexes:[]}
    ];

    function search(searchPhrase: string) {
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            card.indexes = [];
            let text = (card.title+' '+card.description).toLowerCase();
            let searchIndex = 0;
            for (let index = 0; index < searchPhrase.length; index++) {
                const letter = searchPhrase[index];
                let oldIndex = searchIndex;
                searchIndex = 1 + text.slice(searchIndex).indexOf(letter);
                searchIndex = searchIndex + oldIndex;
                if(searchIndex > oldIndex) {
                    card.indexes.push(searchIndex);
                } else {
                    card.indexes.push(0);
                    break;
                }
            }
        }
        setSearchResult(cards.filter(x => x.indexes.reduce(
            (prev, current) => prev && current>0, true)));
    }

    useEffect(() => {
        search("");
    });

    return (
        <div className="App">
            <input className="searchbox" type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
            <div className='row'>
                {
                    searchResult.length>0
                    ? searchResult.map((card, index) =>
                        <Card key={index} title={card.title} description={card.description} indexes={card.indexes} />
                    )
                    : <div>No Search Results Found.</div>
                }
            </div>
        </div>
    );
}
