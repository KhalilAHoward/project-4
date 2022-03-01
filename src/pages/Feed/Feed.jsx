import React from 'react';
import Header from '../../components/Header/Header'
import AddGame from '../../components/AddGame/AddGame'
import GameFeed from '../../components/GameFeed/GameFeed'

export default function Feed(){
    return(
        <>
            <Header />
            <AddGame />
            <GameFeed />
        </>
    )
}