var FUNCTIONS = {
  wchoice: function(rand, args){
    var total = args.weights.reduce(function(a,b){ return a+b; });
    var choice = Math.floor(rand.uniform(0,total));
    var step = 0;

    for(var i=0; i<args.list.length; i++){
      if( choice < (args.weights[i] + step)){
        return args.list[i];
      }else{
        step += args.weights[i];
      }
    }
  },
  choice: function(rand, args){
    return args.list[Math.floor(rand.uniform(0,args.list.length))];
  },
  tri: function(rand, args){
    return rand.triangular(0, 100, args.mid || 50);
  }

};

var CONFIG = {
  ELEMENT: [
    'size', { fn: 'tri' },
    'mass', { fn: 'tri' },
    'abundance', { fn: 'tri' },
    'complexity', { fn: 'tri' },
    'magic', { fn: 'tri', args: { mid: 10 } },
    'radioactive', { fn: 'tri', args: { mid: 10 } },
    'electric', { fn: 'tri', args: { mid: 25 } },
    'conductive', { fn: 'tri', args: { mid: 25 } },
    'luminous', { fn: 'tri', args: { mid: 10 } },
    'magnetic', { fn: 'tri', args: { mid: 25 } },
    'state', { fn: 'wchoice', args: {
      list: ['solid', 'liquid', 'gas', 'plasma'],
      weights: [ 5, 5, 5, 1 ]
    } },
  ]
};
