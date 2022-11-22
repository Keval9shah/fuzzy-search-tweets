// import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

function App() {

    const cards = [
        {title:"Beijing faces 'most severe Covid test' amid deaths", description:"Three deaths have been reported in Beijing where cases have been rising despite China's strict zero-Covid policy."}
    ]

    return (
        <div className="App">
            <>
                <SearchBar />
                {cards.map((card)=>{
                    console.log("Hello");
                    <Card title={card.title} description={card.description} />
                })}
            </>
        </div>
    );
}

export default App;
