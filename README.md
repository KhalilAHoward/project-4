Whatcha Playing?

This app can be used by you and your friends to talk about what games you're currently playing and whether you'd recommend those games to others.



![Screenshot (294)](https://user-images.githubusercontent.com/95941172/156416794-d2228ec1-12ed-49e6-8559-acc8e2afd036.png)



![Screenshot (296)](https://user-images.githubusercontent.com/95941172/156416938-eb33b9ce-17e6-4c0f-8fd9-6cef98e23d22.png)



![Screenshot (295)](https://user-images.githubusercontent.com/95941172/156416979-31e3382f-39db-46dd-9776-4ff4b40b8154.png)


![Screenshot (297)](https://user-images.githubusercontent.com/95941172/156417014-6f7ccfd6-5297-43b4-aa6b-a4bf1b0cd8fb.png)

_________________________________________________________________________________________________________________________________


Technologies Used

Node.js
Express
React
HTML/CSS
MongoDB
Semantic-ui-react
JWT for authentication
Heroku

__________________________________________________________________________________________________________________________________

Icebox

Add the IDGB api
Show games by genre, new releases
AAU, add and delete comments when signed in 

__________________________________________________________________________________________________________________________________










## Setup 

1. Clone the repo
2. Rename the folder to your Project, you can use the `mv` command like `mv mern-boilerplate yourprojectname`
3. Delete the `.git` file, when you are in the root of the file, you can press `ls` and you should see a `.git` file, then go ahead and run `rm -rf .git`


#### Setup your git repo

1. go to github and create your github and create a repo (Without a readme or liscense you can add that later!)
2.  Then follow the directions on github that says ```…or create a new repository on the command line```

it should look like this

```
git init
git add .
git commit -m "first commit"
git remote add origin git@git.generalassemb.ly:SEI-CC/test.git // this will be whatever your address will be
git push -u origin master
```

#### Setup the App

```npm install```

*DOTENV*

`touch .env`

add your variables

```
DATABASE_URL=mongodb://localhost:27017/testagramV2
BUCKET_NAME=catcollectorone
SECRET=mysecretforjwt
```

The app is configured, to use those respective key names for the database, jwt secret and aws bucket, of course you'll have your own values
