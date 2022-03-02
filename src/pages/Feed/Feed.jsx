import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import AddGame from "../../components/AddGame/AddGame";
import GameFeed from "../../components/GameFeed/GameFeed";
import * as gamesAPI from "../../utils/gameApi";
import * as likesAPI from "../../utils/likeApi";
import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleSignUpOrLogin }) {
  const [games, setGames] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // C create in Crud for Likes
  async function addLike(gameId) {
    try {
      const data = await likesAPI.create(gameId);
      console.log(data, " this is from addLike");
      getGames(); // < - will get all the posts and update the state, with our like added to the post
    } catch (err) {
      console.log(err.message);
    }
  }

  
  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getGames(); // < - will get all the posts and update the state, with our like added to the post
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  
  async function handleAddGame(game) {
    try {
      setLoading(true);
      const data = await gamesAPI.create(game); 
      console.log(data, " this is response from the server, in handleAddGame");
      setGames([data.game, ...games]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getGames() {
    try {
      const data = await gamesAPI.getAll();
      console.log(data, " this is data,");
      setGames([...data.games]);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 750 }}>
          <AddGame handleAddGame={handleAddGame} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 750 }}>
          <GameFeed
            games={games}
            numPhotosCol={3}
            isProfile={false}
            user={user}
            addLike={addLike}
            loading={loading}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
