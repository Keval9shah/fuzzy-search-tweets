// import React from 'react';
import './App.css';
import Card from './components/Card';
import { CardType } from "./types";
import { useEffect, useState } from 'react';

export default function App() {

    const [searchResult,setSearchResult] = useState([] as CardType[]);
    let cards: CardType[] = [
        {title:"Beijing faces 'most severe Covid test' amid deaths", description:"Three deaths have been reported in Beijing where cases have been rising despite China's strict zero-Covid policy.", indexes:[], preference: false},
        {title:"Kosovo flare-up fears over car number plate row", description:"Talks at the EU fail to settle a row over Serbian number plates, fuelling Kosovo violence fears.", indexes:[], preference: false},
        {title:"Plan to India beam solar energy wirelessly from space", description:"The European Space Agency is considering the 'Solaris Initiative' plan to collect solar energy in orbit and beam electricity back to Earth.", indexes:[], preference: false},
        {title:"India", description:"5th largest economy in the world. Which is also the fastest growing large economy in the world.", indexes:[], preference: false},
        {title:"Australia make superb start against England in final ODI", description:"Follow live text and BBC Radio 5 Sports Extra commentary as England face Australia in the third of three one-day international in Melbourne.", indexes:[], preference: false},
    ];

    // Add Debounce
    /**
     * Returns the indexes of letters in the search string and modifies 
     * the indexes of the cards accordingly,
     * sets preference flag true if the whole word is found.
     * @param searchPhrase The substring to search for in the string
     */
    function search(searchPhrase: string) {
        cards.forEach(card => {
            card.indexes = [];
            card.preference = false;
        });
        searchPhrase.split(" ").forEach(
            word => searchWord(word)
        )
        setSearchResult(cards.filter(x => !x.indexes.includes(0)));
    }

    function searchWord(word: string) {
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            if(!word) {
                continue;
            }
            let text = (card.title+' '+card.description).toLowerCase();
            if(text.includes(word)) {
                card.indexes = card.indexes.concat(Array.from(new Array(word.length), (x, i) => i + text.indexOf(word) + 1));
                card.preference = card.preference || true;
                continue;
            }
            card.preference = card.preference || false;
            let searchIndex = 0;
            for (let index = 0; index < word.length; index++) {
                const letter = word[index];
                searchIndex = 1 + text.indexOf(letter,searchIndex);
                if(searchIndex > 0) {
                    card.indexes.push(searchIndex);
                } else {
                    card.indexes.push(0);
                    break;
                }
            }
        }
    }
    // difference = searchIndex - card.indexes[0];
    // if(difference>(5*word.length)) { // removes irrelevant results.
    //     card.indexes.push(0);
    //     break;
    // }

    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return function mainFunction(...args:any) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    const debounceSearch = debounce(search,500);

    useEffect(() => {
        search("");
    },[]);

    return (
        <div className="App">
            <input className="searchbox" type="text" placeholder="Search" onChange={(e) => debounceSearch(e.target.value)} />
            <div className='row'>
                {
                    searchResult.length>0
                    ? [...searchResult.filter(x => x.preference),...searchResult.filter(x => !x.preference)].map((card, index) =>
                        <Card key={index} title={card.title} description={card.description} indexes={card.indexes} />
                    )
                    : <div>No Search Results Found.</div>
                }
            </div>
        </div>
    );
}
