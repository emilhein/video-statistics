# video-statistics
Project for show statistics of video streaming


## Get started

1. In root of project run 'docker-compose up' to start a postgress instance locally

2. Run 'npm install'
3. Run 'npm start' to start the webserver and go to http://localhost:3000/

4. Use methods in the root server.js file to seed the database (The first time you run it)
    -   // .then(() => dataFeeder.feedData())

5. Use method in the root server.js file to periodically simulate incoming datapoints (This will change the graphs every time you update the page)
    - dataFeeder.createRecordEveryXSecound(1);

![Example](showcase/example.PNG?raw=true "Example")