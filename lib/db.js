const sander = require('sander');

const books = Object.create(null);
const dir = 'data';
const path = dir + '/';

books.create = function(obj){

  obj.id = generateId();
  const newPath = path + obj.id + '.json';
  const objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then( () =>{
    return obj;
  });
};

books.read = function(idArray) {

  if (idArray.length < 1) {
    // Given an empty array, returns a list of ids
    return sander.readdir(path).
    then( fileNames => fileNames.map( e => e.slice(0, -5)));
  } else {
    return sander.readdir(path)
    .then( totalArray => {
      return totalArray.filter(item => {
        var inArray = false;
        for (var x = 0; x < idArray.length; x++){
          if (idArray[x] === item.slice(0, -5)) {
            inArray = true;
          }
        }
        return inArray;
      });
    })
    .then(idArray => idArray.map( e => path + e))
    .then(filePaths => {
      return filePaths.map( p => {
        return sander.readFile(p, {encoding: 'utf-8'});
      });
    })
    .then(filePromises => Promise.all(filePromises))
    .then(jsonItems => jsonItems.map( j => JSON.parse(j)));
  }
};

books.update = function(id, obj){

  const origPath = path + id + '.json';
  const newPath = path + obj.id + '.json';
  const objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then(sander.unlink(origPath))
  .then( () =>{
    return obj;
  });

};

books.delete = function(id){

  const origPath = path + id + '.json';
  return sander.unlink(origPath)
  .then( () => {
    return {message:'deleted ' + id};
  });
};

function generateId(){
  sander.readdir(path)
    .then(fileNames => {
      console.log(fileNames);
      if (fileNames.length == 0) {
        return 1;
      }
      return Math.max.apply(...fileNames) + 1;
    });
}

module.exports = books;
