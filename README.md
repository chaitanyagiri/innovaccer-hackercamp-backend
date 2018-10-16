Innovaccer Hackercamp - Backend API Assignment
==============================================

### Problem Statement

Use Twitter Search/Streaming API to fetch are store the target tweets with metadata (eg: user details, tweet time, favorites and retweet counts etc ) for a recent high traffic event and create a MVP.

### Technology Stack

-   NodeJS

-   MongoDB

-   ExpressJS

-   Twitter Search API

### Instructions to install

1, Clone this repository:

git clone <https://github.com/chaitanyagiri/innovaccer-hackercamp-backend.git>

2, Change directory

cd innovaccer-hackercamp-backend

3, Install dependencies

npm install

4, Generate Consumer Key, Consumer Secret, Access token, Access Token Secret

Refer to this link - <https://apps.twitter.com/>

5, Create a .env file and add below mentioned details in it.

TWITTER_CONSUMER_KEY=YOUR_CONSUMER_KEY

TWITTER_CONSUMER_SECRET=YOUR_CONSUMER_SECRET

TWITTER_ACCESS_TOKEN=YOUR_ACCESS_TOKEN

TWITTER_ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET

QUERY_STRING=YOUR_DESIRED_QUERY_STRING

TWITTER_LANG=PREFERRED LANGUAGE (en for English)

(list of supported languages and their codes - <https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview.html> )

TWITTER_SEARCH_COUNT=20

(MAX NUMBER OF TWEET TO CAPTURE IN ONE API CALL(for first api))

6, Start the server

npm start

You should get something like this when every step has been followed correctly:

> Innovacer-HackerCamp-Submission@0.2.1 start /home/chaitanyagiri/projects/innovaccer backend-api

> node index.js

ROFL:ROFL:ROFL:ROFL

     _^___

L __/   []

LOL===__     \  APIs starting...

L   \________]

     I   I

   --------/

Updated : Server listening at port 3000

### Folder Structure:

![](https://lh5.googleusercontent.com/1mkiVvSlJbxzewP_oMPu-0vwe-DQ43gYanYNuo5GgNKwLzMeLxZ1lb3rGknupPy3n3dHcCAXy99ER4a_FKf1DfEXG04CMS9Omh9w4KEMmzB16qR8AS4n9Fy-uhUx0ETT6GVrJtnP)

API's/Endpoints
---------------

### 1\. API to trigger Twitter Search (/api1)

This API triggers twitter search and stores a curated version of the data returned by Twitter Search API. The streaming is done as per the environment variables that were passed in .env file.

API 1 - http://0.0.0.0:3000/api1 (methods supported - GET)

SUCCESS-

{"error":false,"message" : '20 tweets successfully saved in mongoDB database.'}

ERROR-

{"error" : false,"message" : "SORRY AN ERROR OCCURRED. Please check log files"}

SAMPLE REQUEST AND RESPONSE DEMONSTRATED IN POSTMAN -

### ![](https://lh4.googleusercontent.com/3nOKryj1JPZycQWoN9v-quEGQTxveCLxLRpj2Ua17OhBKF1KGYPXc9QJ7VglmHCWrYQVTD4wN4ADK5UVXqjvHWCxGdNWtZrbCximiCe6jswWqAe7YXmQ4giPE9-jAQz1rbaX48po)

### 2\. API to filter and search stored tweets (/api2)

This API fetches the data stored by the[  ](https://github.com/divyanshu1302/TweetBot#1-api-to-trigger-twitter-stream)first api based on the filters and search keywords provided and sorts them as required.

#### 2.1,  API to filter tweets according to various parameters.(/api2/filter)

This filters tweets based upon the parameters like user/screen name, retweet count, favorite count,date range, language, user follower counts, user mentions, URLs etc.

http://0.0.0.0:3000/api2/filter (methods supported - POST)

SUCCESS-

{

 "error": false,

 "message": [ {RELEVANT TWEETs DATA} ]

 }

}

ERROR-

{

 "error": true,

 "message": "SORRY AN ERROR OCCURRED. Please check log files"

}

SAMPLE REQUEST AND RESPONSE DEMONSTRATED IN POSTMAN -

![](https://lh4.googleusercontent.com/5IJHLhs-x7UEDIEy-ziOD9ExZ8NJQ2Eevf5veXj05cydp1jPC8_oqhjjn51kvMmm1NOTjRVZI3lEjalq7nq6pqgUJ6jNzC9LE6Y0j8OF_TnWvfnNjY5KhAZwiel85BiY7g1nUlG0)

#### FILTERING PARAMETERS -

Filtering parameters are passed as query along with the url. A sample request would look like:

http://0.0.0.0:3000/api2/filter?favourite_count>1&retweet_count<2&fields=tweet_id,retweet_count,screen_name,text&sort=-retweet_count

becomes the following hash:

{

 criteria: {

   favourite_count:  {$gt:1},

   retweet_count: { $lt: 2 }

 },

 options: {

   fields: { tweet_id: true, retweet_count: true, screen_name:true, text:true },

   sort: {retweet_count: -1}

 }

}

### Field selection

The fields argument is a comma separated list of field names to include in the results. For example fields=name,age results in a option.fields value of {'name':true,'age':true}. If no fields are specified then option.fields is null, returning full documents as results.

The omit argument is a comma separated list of field names to exclude in the results. For example omit=name,age results in a option.fields value of {'name':false,'age':false}. If no fields are specified then option.fields is null, returning full documents as results.

Note that either fields or omit can be used. If both are specified then omit takes precedence and the fields entry is ignored. Mongo will not accept a mix of true and false fields

### Sorting

The sort argument is a comma separated list of fields to sort the results by. For example sort=name,-age results in a option.sort value of {'name':1,'age':-1}. If no sort is specified then option.sort is null and the results are not sorted.

### Filtering

Any query parameters other then fields, omit, sort, offset, and limit are interpreted as query criteria. For example name=john&age>21 results in a criteria value of:

{\
 'name': 'john',\
 'age': { $gt: 21 }\
}

-   Supports standard comparison operations (=, !=, >, <, >=, <=).

-   Numeric values, where Number(value) != NaN, are compared as numbers (ie., field=10 yields {field:10}).

-   Values of true and false are compared as booleans (ie., {field:true})

-   Values that are[  dates](http://www.w3.org/TR/NOTE-datetime) are compared as dates (except for YYYY which matches the number rule).

-   Multiple equals comparisons are merged into a $in operator. For example, id=a&id=b yields {id:{$in:['a','b']}}.

-   Multiple not-equals comparisons are merged into a $nin operator. For example, id!=a&id!=b yields {id:{$nin:['a','b']}}.

-   Comma separated values in equals or not-equals yeild an $in or $nin operator. For example, id=a,b yields {id:{$in:['a','b']}}.

-   Regex patterns. For example, name=/^john/i yields {id: /^john/i}.

-   Parameters without a value check that the field is present. For example, foo&bar=10 yields {foo: {$exists: true}, bar: 10}.

-   Parameters prefixed with a not (!) and without a value check that the field is not present. For example, !foo&bar=10 yields {foo: {$exists: false}, bar: 10}.

-   Supports some of the named comparision operators ($type, $size and $all). For example, foo:type=string, yeilds { foo: {$type: 'string} }.

-   Support for forced string comparison; value in single or double quotes (field='10' or field="10") would force a string compare. Allows for string with embedded comma (field="a,b") and quotes (field="that's all folks").

For more details visit <https://www.npmjs.com/package/query-to-mongo#use>

Sample request for some test cases -

1, Date range filter

http://0.0.0.0:3000/api2/filter?timestamp<Tue Oct 16 17:45:24 +0000 2018&timestamp>Wed Oct 10 17:45:24 +0000 2018

2, Less than, greater than, equal to filter in case of retweet_count

http://0.0.0.0:3000/api2/filter?retweet_count>1&retweet_count<2

3, Starts with, ends with, contains, exact match in case of screen_name(username)

Ends with

[http://0.0.0.0:3000/api2/filter?screen_name=/^ind/](http://0.0.0.0:3000/api2/filter?screen_name=/%5Eind/)

Starts with

<http://0.0.0.0:3000/api2/filter?screen_name=/ind$/>

Contains

[http://0.0.0.0:3000/api2/filter?screen_name=/^.*ind.*$/](http://0.0.0.0:3000/api2/filter?screen_name=/%5E.*ind.*$/)

Exact Match

<http://0.0.0.0:3000/api2/filter?screen_name=John>

4, Sorting by date time, tweet text

Sort ascending by date

[http://0.0.0.0:3000/api2/filter?sort=timestamp](http://0.0.0.0:3000/api2/filter?sort=-timestamp) (for descending put a -sign)

Sort descending by tweet text

<http://0.0.0.0:3000/api2/filter?sort=-text>

#### PAGINATION -

Though pagination of tweets could have easily been achieved by offset and limit values in filter api but the in this application pagination has been done from scratch to show some coding skills that would be required for the Internship.

In API2 to get responses paginated we can pass paginate parameters as raw json format in request body.

{

   "paginate":{

   "pageNo":1,

   "size":3

   }

}

### 2.2,  API to search text and username among tweets.(/api2/search)

This searches the text and username(screen_name) of the tweets and responds with tweet data matching the search. For more about this search refer to <https://docs.mongodb.com/manual/text-search/>

http://0.0.0.0:3000/api2/search (methods supported - POST)

SUCCESS-

{

 "error": false,

 "message": [ {RELEVANT TWEETs DATA} ]

 }

}

ERROR-

{

 "error": true,

 "message": "SORRY AN ERROR OCCURRED. Please check log files"

}

SAMPLE REQUEST AND RESPONSE DEMONSTRATED IN POSTMAN -

![](https://lh6.googleusercontent.com/Uh1TJBJ2NM13GwUgarzmzcs44GvtaURT_BV-lugz5z371ifptnwJCXQ8aF89wsNMvaNCCZ_DF7s63sDOUgZcKxBfnRIC_GRiSQa6w-ryznAxQXuzkJvMnJeE9947FFL_C1uLiTz_)

We can pass sorting and filtering parameters similar to the api2 to the searched data. But along with we need to pass search string in the body.

A raw format of request body will look like this:

{

   "paginate":{

   "pageNo":1,

   "size":3

   },

   "search":"Election and Explosion"

}

Note - Search and Pagination parameters are sent in the form of json as request body in order to demonstrate the knowledge of doing things with other ways also. This may look like an unwanted added complication but the intention was to show the variety in coding stye.

### 3\. API to export CSV files (/api3)

This exports the tweets in tweets.csv according the parameters passed as query along with the url as in api2.

SUCCESS-

Prompt window asking to download tweets.csv is appeared

ERROR-

Appropriate error message is displayed

Sample request to export all tweets having retweet_count>1 to a CSV file in descending order:

https://localhost:3000/api3?retweet_count>1&sort=-retweet_count

SAMPLE REQUEST AND RESPONSE DEMONSTRATED IN POSTMAN -

![](https://lh5.googleusercontent.com/nHnCY2-eDbv9HVhuNSxSn_SMfWK20mpNJ0gEUTm-hJblA99msZQTmSdeevqI2OyJlvvEkgUg3y0lYp1BdqKmvumuOdI2SzS52dsplZFNs0Mp6Z4jjqZ4BoSA5mdWzIfClqXkbmEa)

### CONTACT

Chaitanya Giri Goswami

Ph-9424108852

[Email01 -16ucco28@lnmiit.ac.in](mailto:Email-16ucco28@lnmiit.ac.in)

[Email02 ](mailto:Email-16ucco28@lnmiit.ac.in)<-girichaitanya11@gmail.com>

Website/blog - <https://chaitanyagiri.ga>