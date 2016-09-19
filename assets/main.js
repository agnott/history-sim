var rand = new Random();

var LANG = new Language(Math.floor(rand.uniform(0,Number.MAX_SAFE_INTEGER)));


var ELEMENTS = [];
for(var i=0; i<rand.uniform(10,15); i++){
  ELEMENTS.push( new Element(Math.floor(rand.uniform(0,Number.MAX_SAFE_INTEGER))) );
  document.getElementById('elements').innerHTML += ELEMENTS[i].html();
}

var GEOGRAPHY = new Geography(Math.floor(rand.uniform(0,Number.MAX_SAFE_INTEGER)), {
  target: 'map',
  dim: [500,500]
});

var CITY = new City(Math.floor(rand.uniform(0,Number.MAX_SAFE_INTEGER)), {
  map: GEOGRAPHY
});

var STATE = {
  populations: (function(){
    var NUM = Math.floor(rand.uniform(10,15));
    var arr = [];

    for(var i=0; i<NUM; i++){
      arr.push( new Population(Math.floor(rand.uniform(0,Number.MAX_SAFE_INTEGER))) );
    }

    return arr;
  })()
};

console.log(ELEMENTS);
console.log(GEOGRAPHY);
console.log(CITY);
console.log(STATE);
