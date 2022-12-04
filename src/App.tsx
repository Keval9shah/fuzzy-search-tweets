// import React from 'react';
import './App.css';
import Card from './components/Card';
import { CardType, SearchResult } from "./types";
import { useEffect, useState } from 'react';
import searchIcon from './assets/search.svg';
import Logo from './assets/logo.svg';

export default function App() {

    const [searchResult,setSearchResult] = useState([] as SearchResult[]);
    let cards: CardType[] = [
        {title:"Beijing faces 'most severe Covid test' amid deaths", description:"Three deaths have been reported in Beijing where cases have been rising despite China's strict zero-Covid policy."},
        {title:"Kosovo flare-up fears over car number plate row", description:"Talks at the EU fail to settle a row over Serbian number plates, fuelling Kosovo violence fears."},
        {title:"Plan to India beam solar energy wirelessly from space", description:"The European Space Agency is considering the 'Solaris Initiative' plan to collect solar energy in orbit and beam electricity back to Earth."},
        {title:"India", description:"5th largest economy in the world. Which is also the fastest growing large economy in the world."},
        {title:"Australia make superb start against England in final ODI", description:"Follow live text and BBC Radio 5 Sports Extra commentary as England face Australia in the third of three one-day international in Melbourne."},
        {title:"Plastic Money", description:"Credit cards must be used with extra caution."},
    ];

    function add() {
        console.log("adding...");
    }

    /**
     * Returns the indexes of letters in the search string and modifies 
     * the indexes of the cards accordingly,
     * sets preference flag true if the whole word is found.
     * @param searchPhrase The substring to search for.
     */
    function search(searchPhrase: string) {
        searchPhrase = searchPhrase.toLowerCase();
        (cards as SearchResult[]).forEach(card => {
            card.indexes = [];
            card.preference = false;
        });
        searchPhrase.split(" ").forEach(
            word => searchWord(word)
        )
        setSearchResult((cards as SearchResult[]).filter(x => !x.indexes.includes(0)));
    }

    function searchWord(word: string) {
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index] as SearchResult;
            if(!word) {
                continue;
            }
            let text = (card.title+' '+card.description).toLowerCase();
            if(text.includes(word)) {
                card.indexes = card.indexes.concat(Array.from(new Array(word.length), (x, i) => i + text.indexOf(word) + 1));
                card.preference = true;
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

    let timeoutID: number;
    /**
     * delays the function call by a certain time and
     * only executes the last call in that time frame.
     * @param wait debounce time in ms.
     * @param func The function to debounce.
     * @param args Arguments of the function.
     */
    function debounce(wait: number, func: Function, ...args: any) {
        const later = () => {
            clearTimeout(timeoutID);
            func(...args);
        };
        clearTimeout(timeoutID);
        timeoutID = setTimeout(later, wait);
    };

    useEffect(() => {
        search("");
    },[]);

    return (
        <div className="App">
            {/* <TopBar /> */}
            <div className="top-bar">
                <img className='icon' src={Logo} alt="Keval's Blogs"/>
                <div className="search-parent">
                    <input className="searchbox" spellCheck="false" type="text" placeholder="Search" onChange={(e) => debounce(500, search, e.target.value)} />
                    <div className="search-icon-container"><img src={searchIcon} /></div>
                </div>
                <div className="addbox" onClick={add}><span style={{position: 'relative', top: '-11px'}}>Add </span><span style={{position: 'relative', top: '-10px', fontSize: '27px'}}>+</span></div>
            </div>
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
