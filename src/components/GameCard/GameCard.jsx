import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react'
import { Link } from "react-router-dom";



function GameCard({game, isProfile, user, addLike, removeLike}){

    const likedIndex = game.likes.findIndex(like => like.username === user.username)

    const likeColor = likedIndex > -1 ? 'red' : 'grey';

    const clickHandler = likedIndex > -1 ? () => removeLike(game.likes[likedIndex]._id) : () => addLike(game._id)

    return (
        <Card key={game._id} raised>
        {isProfile ? (
          ""
        ) : (
          <Card.Content textAlign="left">
            <Card.Header>
              <Link to={`/${game.user.username}`}>
                <Image
                  size="large"
                  avatar
                  src={
                    game.user.photoUrl
                      ? game.user.photoUrl
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                  }
                />
                {game.user.username}
              </Link>
            </Card.Header>
          </Card.Content>
        )}
        <Image src={`${game.photoUrl}`} wrapped ui={false} />
        <Card.Content>
          <Card.Description>{game.description}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
          <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler}/>
          {game.likes.length} Likes
        </Card.Content>
      </Card>
      )
    }
    
export default GameCard; 