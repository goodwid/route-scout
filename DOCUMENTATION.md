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
Does something that gets things. Totally.
- ##### coolName.post( path, callback )
Does something that gets things. Totally
- ##### coolName.patch( path, callback )
Does something that gets things. Totally
- ##### coolName.put( path, callback )
Does something that gets things. Totally
- ##### coolName.delete( path, callback )
Does something that gets things. Totally

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
