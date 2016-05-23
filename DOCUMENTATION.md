
# Route Scout - Finds the paths for you!
A framework that handles the routing for you and makes your server-creating life much easier. Also makes you look younger and more attractive. Results may vary.

## Features

- easy to use
- simplifies using all common routing requests
- lets you create your own routing requests
- built in handler for static files
- lets add variables to your routes
- lightweight

## Is it any good?

Yes.

## Installation
```
$ npm install route-scout
```

## API
```javascript
var routescout = require('route-scout');
```
## Framework Methods

- #### routescout.get( path, callback )
Creates a route for incoming GET requests at the passed in URL, the callback takes two arguments: request and response.

  *GET requests retrieve data form the server. GET reads.*
- #### routescout.post( path, callback )
Creates a route for incoming POST requests at the passed in URL, the callback takes two arguments: request and response.

  *POST requests are used to send data to the server. POST creates.*
- #### routescout.patch( path, callback )
Creates a route for incoming PATCH requests at the passed in URL, the callback takes two arguments: request and response.

    *PATCH requests change data on the server. PATCH updates/modifies*
- #### routescout.put( path, callback )
Creates a route for incoming PUT requests at the passed in URL, the callback takes two arguments: request and response.

    *PUT requests change or replace data on the server. PUT updates/replaces*
- #### routescout.delete( path, callback )
Creates a route for incoming DELETE requests at the passed in URL, the callback takes two arguments: request and response.

    *DELETE requests delete data from the server.*

- #### routescout.createRoute( object )
Creates a route for whatever you want to create a route for at the passed in URL. The object requires three keys: URL, method  and handler. Method must be all uppercase!

- #### routescout.static( path )
Serves static objects from the folder located in path.



## Examples
```javascript
var routescout = require( 'routescout' );

// GET Request
routescout.get( '/examplePath', (req, res) => {
  res.write ( 'GET request to the homepage.' );
  res.end();
});

// POST Request
routescout.post( '/examplePath', (req, res) => {
  res.write ( 'POST request to the homepage.' );
  res.end();
});

// PATCH Request
routescout.patch( '/examplePath', (req, res) => {
  res.write ( 'PATCH request to the homepage.' );
  res.end();
});

// PUT request
routescout.put( '/examplePath', (req,res) => {
  res.write ( 'PUT request to the homepage.');
  res.end();
});

// DELETE Request
routescout.delete( '/examplePath', (req, res) => {
  res.write ( 'DELETE request to the homepage.' );
  res.end();
});

// CREATE ROUTE Request
routescout.createRoute( {
  url: '/example/path',
  method: 'HEAD',
  handler: (req, res) => {
    res.write ( 'HEAD request to the homepage.' );
    res.end();
  })
});

// Static handler
routescout.static( '/public');



```

## Options

#### URL Variables and Request Parameters
For URL you can add a variable with a : and this will pass it to the request object with a property of params.

``` javascript
// Parameters in the Request object
routescout.get( '/examplePath/:variable', (req, res) => {
  res.write ( 'Access variable' + req.params.variable );
  res.end();
});
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
