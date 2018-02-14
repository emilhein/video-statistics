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


### Solution design

A typical datapoint = ("1.2.3.4", "Google Chrome", 234, 0.0, 10.0)

-	How is the data store designed
For now the solution and database have only implemented some statistics that are made up and will not change over time. Therefore More dynamic models could be designed to create other statistics.

The datastore is build up of 4 tables (in postgres)
1. (Browsers) Just a table containing the different browsers
2. (Videos) Cointaining all the with the the length represented as a integer
3. (Records) Containing the entire datapoint
4. (VideoStats) Containing the accumulated statistics for each video, such as:
	- 	video_id
	-	unique_views
	-	video_watch_data


-	how is data pre-processed
When the system retrieves an incoming datapoint saves the data as follows:
	1. Get the browser id for the datapoint browsername
	2. Save the entire record as a datapoint in the "Record" table
	3. Get the current statistics
	4. run function to update the numbers accordingly
	5. Save updated statistics

This approach makes it "slow" to insert data, but very fast to extract data

-	how is data extracted and presented
As to how to present it, i have in the solution implemented the question a use case where you can answer the question: "Which parts of a video was watched the most?"

A bit simplified the video_watch_data field in the "VideoStats" table contains an JSON object cointaining keys from 0 to the video length.
If the video is 360 seconds long it cointains a object with 360 keys, each representing a second of the video.

Whenever a datapoint comes in, it will look at the "play_start" and "play_end" and round those to whole sencods.
This means that a view from second 10 to second 20 will increment all the keys from 10-20 with 1 in the video_watch_data object

When representing it, we just have to query one field, which already contains the data to show the views on a graph.

Same methodology can be used to calculate unique_views, which browsers they used.