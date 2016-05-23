# Route Lout - The rowdy router

# Route Scout - Finds the paths for you!
A framework that handles the routing for you and makes your server-creating life much easier. Also makes you look younger and more attractive. Results may vary.

## Features

- easy to use
- simplifies using all common routing requests
- lets you create your own routing requests
- lightweight

## Is it any good?

Yes.

## Installation
```
$ npm install coolName
```

## API
```javascript
var coolName = require(./coolName);
```
## Framework Methods

- #### coolName.get( path, callback )
Creates a route for incoming GET requests at the passed in URL, the callback takes two arguments: request and response.

  *GET requests retrieve data form the server. GET reads.*
- #### coolName.post( path, callback )
Creates a route for incoming POST requests at the passed in URL, the callback takes two arguments: request and response.

  *POST requests are used to send data to the server. POST creates.*
- #### coolName.patch( path, callback )
Creates a route for incoming PATCH requests at the passed in URL, the callback takes two arguments: request and response.

    *PATCH requests change data on the server. PATCH updates/modifies*
- #### coolName.put( path, callback )
Creates a route for incoming PUT requests at the passed in URL, the callback takes two arguments: request and response.

    *PUT requests change or replace data on the server. PUT updates/replaces*
- #### coolName.delete( path, callback )
Creates a route for incoming DELETE requests at the passed in URL, the callback takes two arguments: request and response.

    *DELETE requests delete data from the server.*

## Example
```javascript
var coolName = require( 'coolName' );

// GET Request
coolName.get( '/examplePath', (req, res) => {
  res.write ( 'GET request to the homepage.' );
  res.end();
})

// POST Request
coolName.post( '/examplePath', (req, res) => {
  res.write ( 'POST request to the homepage.' );
  res.end();
})

// PATCH Request
coolName.patch( '/examplePath', (req, res) => {
  res.write ( 'PATCH request to the homepage.' );
  res.end();
})

// PUT request
coolName.put( '/examplePath', (req,res) => {
  res.write ( 'PUT request to the homepage.');
  res.end();
});

// DELETE Request
coolName.delete( '/examplePath', (req, res) => {
  res.write ( 'DELETE request to the homepage.' );
  res.end();
})
```

## Dependencies

None. We're independent that way :)

## Dev Dependencies

- [chai](https://www.npmjs.com/package/chai)
- [chai-http](https://www.npmjs.com/search?q=chai-http)
- [eslint](https://www.npmjs.com/package/eslint)
- [mocha](https://www.npmjs.com/package/mocha)
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [gulp-mocha](https://www.npmjs.com/package/gulp-mocha)
