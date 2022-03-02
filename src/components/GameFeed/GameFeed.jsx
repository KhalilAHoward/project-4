import React from 'react';
import { Card, Dimmer, Segment, Image } from "semantic-ui-react";
import GameCard from '../GameCard/GameCard';
import Loader from '../Loader/Loader';

export default function GameFeed({games, numPhotosCol, isProfile, user, addLike, removeLike, loading}) {

    if(!games.length){
        return <span>There are no games</span>
    }

    return (

        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {games.map((game) => {
          return (
            <GameCard
              game={game}
              key={game._id}
              isProfile={isProfile}
              user={user}
              removeLike={removeLike}
              addLike={addLike}
            />
          );
        })}
      </Card.Group>
    );
    }