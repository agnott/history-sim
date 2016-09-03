var Element = function(seed){
  var ret = {
    seed: seed
  };
  var rand = new Random(seed);

  //Physical properties
  for(var i=0; i<CONFIG.ELEMENT.length; i+=2){
    ret[CONFIG.ELEMENT[i]] = FUNCTIONS[CONFIG.ELEMENT[i+1]['fn']](rand, CONFIG.ELEMENT[i+1]['args'] || {});
  }

  return ret;
};
