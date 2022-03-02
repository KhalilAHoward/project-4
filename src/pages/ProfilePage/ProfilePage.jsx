import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import GameFeed from "../../components/GameFeed/GameFeed";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import * as likesAPI from "../../utils/likeApi";

export default function ProfilePage(props) {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // grab the param from the browser
  // we defined username in the app.js /:username
  const { username } = useParams();

  console.log(username, " <----- this username");
  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " <- data");

      setLoading(() => false);
      setGames(() => data.games);
      setUser(() => data.user);
    } catch (err) {
      console.log(err);
      setLoading(() => false);
      setError("Profile Does not exist!");
    }
  }

  async function addLike(gameId) {
    try {
      const data = await likesAPI.create(gameId);
      console.log(data, " this is from addLike");
      getProfile(); // < - will get all the games and update the state, with our like added to the post
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  // we will invoke these functions when the heart is clicked in the post card,
  // so we need to pass the function down to the postCard in order for it to use it
  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getProfile(); // < - will get all the games and update the state, with our like added to the post
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  // this gets called when the component
  // mounted to the dom

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Header />
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <GameFeed
            isProfile={true}
            games={games}
            numPhotosCol={3}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}