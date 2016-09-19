var Element = function(seed, args){
  var ret = {
    seed: seed,
    keywords: [],
    attrs: {}
  };
  var rand = new Random(seed);

  //Physical properties
  var fn = null;
  var args = null;
  for(var i=0; i<CONFIG.ATTRS.length; i++){
    if( 'Element' in CONFIG.ATTRS[i].attrof ){
      fn = CONFIG.ATTRS[i].attrof.Element.fn;
      args = CONFIG.ATTRS[i].attrof.Element.args;
      ret.attrs[CONFIG.ATTRS[i].name] = FUNCTIONS[fn](rand, args || {});
    }
  }

  //Print function
  ret.html = function(){
    var html = '<div class="element-item">';
    var key = '';
    for(var i=0; i<Object.keys(ret.attrs).length; i++){
      key = Object.keys(ret.attrs)[i];
      html += `<div>${key}: <span style="float: right;">${
        (typeof ret.attrs[key] === 'number')? ret.attrs[key].toFixed(2) : ret.attrs[key]
      }</span></div>`
    }
    html += '</div>';
    return html;
  };

  return ret;
};
