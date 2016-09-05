var Language = function(seed){
  var ret = {
    seed: seed
  };
  var rand = new Random(seed);

  //Physical properties
  for(var i=0; i<CONFIG.LANGUAGE.BUILD.length; i+=2){
    ret[CONFIG.LANGUAGE.BUILD[i]] = LANGUAGE_FUNCTIONS[CONFIG.LANGUAGE.BUILD[i+1]['fn']](rand, CONFIG.LANGUAGE.BUILD[i+1]['args'] || {})
      || FUNCTIONS[CONFIG.LANGUAGE.BUILD[i+1]['fn']](rand, CONFIG.LANGUAGE.BUILD[i+1]['args'] || {});
  }

  ret.getName = function(keywords){
    if(keywords.length > 1){
      return LANGUAGE_FUNCTIONS['prefixmorph'](rand) +
             FUNCTIONS['choice'](rand, { options: ret[FUNCTIONS['choice'](rand, { options: keywords } ) ] } ) +
             FUNCTIONS['choice'](rand, { options: ret[FUNCTIONS['choice'](rand, { options: keywords } ) ] } );
    }else if(keywords.length === 1){
      return LANGUAGE_FUNCTIONS['prefixmorph'](rand) +
             FUNCTIONS['choice'](rand, { options: ret[FUNCTIONS['choice'](rand, { options: keywords } ) ] } );
    }
    return 'NO NAME';
  };

  return ret;
};
