var FUNCTIONS = {
  achoice: function(rand, args){
    var arr = [];

    for(var i=0; i<args.num && i<args.options.length; i++){
      arr.push(args.options[Math.floor(rand.uniform(0,args.options.length))]);
    }

    return arr;
  },
  wchoice: function(rand, args){
    var total = args.weights.reduce(function(a,b){ return a+b; });
    var choice = rand.uniform(0,total);
    var offset = 0;

    for(var i=0; i<args.options.length; i++){
      if( choice < (args.weights[i] + offset)){
        return args.options[i];
      }else{
        offset += args.weights[i];
      }
    }
  },
  choice: function(rand, args){
    return args.options[Math.floor(rand.uniform(0,args.options.length))];
  },
  tri: function(rand, args){
    return rand.triangular(args.min || 0, args.max || 100, args.mid || 50);
  },
  itri: function(rand, args){
    return Math.floor(rand.triangular(args.min || 0, args.max || 100, args.mid || 50));
  }
};

var CONFIG = {
  /*
    name: NAME, type: n/s/...
  */
  ATTRS: [{
    name: 'size',
    attrof: {
      Element: {
        fn: 'tri',
        args: {
          min: 1,
          mid: 50,
          max: 350
        }
      },
      Population: {
        fn: 'itri',
        args: {
          min: 10,
          mid: 1000,
          max: 10000
        }
      }
    }
  },{
    name: 'rare',
    attrof: {
      Element: {
        fn: 'tri'
      }
    }
  },{
    name: 'science',
    attrof: {
      Population: {
        fn: 'tri'
      }
    }
  },{
    name: 'violent',
    attrof: {
      Population: {
        fn: 'tri'
      }
    }
  },{
    name: 'culture',
    attrof: {
      Population: {
        fn: 'tri'
      }
    }
  },{
    name: 'education',
    attrof: {
      Population: {
        fn: 'tri'
      }
    }
  },{
    name: 'complex',
    attrof: {
      Element: {
        fn: 'tri'
      }
    }
  },{
    name: 'radioactive',
    attrof: {
      Element: {
        fn: 'tri',
        args: {
          mid: 5
        }
      }
    }
  },{
    name: 'magnetic',
    attrof: {
      Element: {
        fn: 'tri'
      }
    }
  },{
    name: 'state',
    attrof: {
      Element: {
        fn: 'wchoice',
        args: {
          options: ['solid', 'liquid', 'gas', 'plasma'],
          weights: [10, 7, 6, 1]
        }
      }
    }
  }],
  LANGUAGE: {
    ALPHABET: [
      'a','b','c','d','e','f','g','h','i','j','k','l','m',
      'n','o','p','q','r','s','t','u','v','w','x','y','z'
    ],
    SOUNDS: {
      CONSONANT: [
        'b','c','d','f','g','h','j','k','l','m',
        'n','p','q','r','s','t','v','w','x','y','z',
        'bl','fl','gl','pl','br',
        'cr','dr','fr','gr','pr',
        'tr','sk','sl','sp','st',
        'sw','spr','str','ch','sh',
        'th','wh','ng','nk','zh'
      ],
      VOWEL: [
        'a','e','i','o','u',
        'ea','ie','ou','oo','ee',
        'ai','ue','io','oe',
      ]
    },
    BUILD: [
      'size', { fn: 'morphlist' },
      'bright', { fn: 'morphlist' },
      'mass', { fn: 'morphlist' },
      'magic', { fn: 'morphlist' },
      'complexity', { fn: 'morphlist' },
      'abundance', { fn: 'morphlist' },
      'radioactive', { fn: 'morphlist' },
      'magnetic', { fn: 'morphlist' },
      'solid', { fn: 'morphlist' },
      'liquid', { fn: 'morphlist' },
      'gas', { fn: 'morphlist' },
      'plasma', { fn: 'morphlist' },
    ]
  }
};

console.log(CONFIG);

var LANGUAGE_FUNCTIONS = {
  prefixmorph: function(rand){
    var structures = [
      'cv', 'v'
    ];
    var type = FUNCTIONS['choice'](rand, { options: structures });
    var word = '';

    for(var j=0; j<type.length; j++){
      switch(type[j]){
        case 'c':
          word += FUNCTIONS['choice'](rand, { options: CONFIG.LANGUAGE.SOUNDS.CONSONANT });
          break;
        case 'v':
          word += FUNCTIONS['choice'](rand, { options: CONFIG.LANGUAGE.SOUNDS.VOWEL });
          break;
      }
    }
    return word;
  },
  morphlist: function(rand, args){
    var arr = [];
    var structures = [
      'cv', 'c'
    ];
    var type = '';

    for(var i=0; i<(args.num || 2); i++){
      arr.push('');

      type = FUNCTIONS['choice'](rand, { options: structures });

      for(var j=0; j<type.length; j++){
        switch(type[j]){
          case 'c':
            arr[i] += FUNCTIONS['choice'](rand, { options: CONFIG.LANGUAGE.SOUNDS.CONSONANT });
            break;
          case 'v':
            arr[i] += FUNCTIONS['choice'](rand, { options: CONFIG.LANGUAGE.SOUNDS.VOWEL });
            break;
        }
      }
    }
    return arr;
  }
};
