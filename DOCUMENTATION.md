# Our Super-Cool Framework with the kick-ass Name

## Features

- easy usability
- great looks
- everything is so much more simple if you use this

## Installation
```
$ npm install coolName
```

## API
```javascript
var coolName = require(./coolName);
```
## Framework Methods

- ##### coolName.get( path, callback )
Creates a route for incoming GET requests at the passed in URL, the callback takes two arguments: request and response.

  *GET requests retrieve data form the server. GET reads.*
- ##### coolName.post( path, callback )
Creates a route for incoming POST requests at the passed in URL, the callback takes two arguments: request and response.

  *POST requests are used to send data to the server. POST creates.*
- ##### coolName.patch( path, callback )
Creates a route for incoming PATCH requests at the passed in URL, the callback takes two arguments: request and response.

    *PATCH requests change data on the server. PATCH updates/modifies*
- ##### coolName.put( path, callback )
Creates a route for incoming PUT requests at the passed in URL, the callback takes two arguments: request and response.

    *PUT requests change or replace data on the server. PUT updates/replaces*
- ##### coolName.delete( path, callback )
Creates a route for incoming DELETE requests at the passed in URL, the callback takes two arguments: request and response.

    *DELETE requests delete data from the server.*

## Example
```javascript
var coolName = require( 'coolName' );

// GET Request
coolName.get( '/examplePath', (req, res) => {
  res.write ( 'you\'re looking fabulous today!' );
  res.end();
})

// PUT request
coolName.put( '/examplePath', (req,res) => {
  res.write ( 'Hello there');
  res.end();
});
```

## Dependencies

## Dev Dependencies
