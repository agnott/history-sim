var Population = function(seed, args){
  var ret = {
    seed: seed,
    attrs: {}
  };
  var rand = new Random(seed);

  //Physical properties
  var fn = null;
  var args = null;
  for(var i=0; i<CONFIG.ATTRS.length; i++){
    if( 'Population' in CONFIG.ATTRS[i].attrof ){
      fn = CONFIG.ATTRS[i].attrof.Population.fn;
      args = CONFIG.ATTRS[i].attrof.Population.args;
      ret.attrs[CONFIG.ATTRS[i].name] = FUNCTIONS[fn](rand, args || {});
    }
  }

  return ret;
}
