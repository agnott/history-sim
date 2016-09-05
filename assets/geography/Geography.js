var Geography = function(seed, args){
  var ret = {
    seed: seed,
    dim: args.dim || [500,500],
    points: []
  };
  var rand = new Random(seed);
  var svg = SVG(args.target).width(ret.dim[0]).height(ret.dim[1]);

  var step = 5;
  var maxDeltaXY = step/2;
  var maxDeltaZ = 500;
  var water = -10;

  //Create all points
  for(var x=0; x<ret.dim[0]; x+=step){
    var row = [];
    for(var y=0; y<ret.dim[1]; y+=step){
      row.push({
        x: rand.uniform(x-maxDeltaXY, x+maxDeltaXY),
        y: rand.uniform(y-maxDeltaXY, y+maxDeltaXY),
        z: rand.uniform(-maxDeltaZ, maxDeltaZ)
      });
    }
    ret.points.push(row);
  }

  var smooth = function(points, scale, iterations){
    for(var i=0; i<iterations; i++){
      var sum = 0;
      var count = 0;
      for(var x=0; x<points.length; x++){
        for(var y=0; y<points[x].length; y++){
          sum = points[x][y].z;
          count = 1;
          if( points[x-1] ){
            sum += scale*points[x-1][y].z;
            count += scale;
          }
          if( points[x+1] ){
            sum += scale*points[x+1][y].z;
            count += scale;
          }
          if( points[x][y-1] ){
            sum += scale*points[x][y-1].z;
            count += scale;
          }
          if( points[x][y+1] ){
            sum += scale*points[x][y+1].z;
            count += scale;
          }
          points[x][y].z = sum/count;
        }
      }
    }      var zAvg = 0;
  };
  var erode = function(points, iterations){
    var above = 0;
    var below = 0;
    var aDiff = 0;
    var bDiff = 0;

    for(var i=0; i<iterations; i++){
      for(x=1; x<points.length-1; x++){
        for(y=1; y<points[x].length-1; y++){
          above = 0;
          below = 0;
          aDiff = 0;
          bDiff = 0;

          if( points[x-1][y].z > water ){
            aDiff += points[x-1][y].z;
            above++;
          }else{
            bDiff += points[x-1][y].z;
            below++;
          }
          if( points[x+1][y].z > water ){
            aDiff += points[x+1][y].z;
            above++;
          }else{
            bDiff += points[x+1][y].z;
            below++;
          }
          if( points[x][y-1].z > water ){
            aDiff += points[x][y-1].z;
            above++;
          }else{
            bDiff += points[x][y-1].z;
            below++;
          }
          if( points[x][y+1].z > water ){
            aDiff += points[x][y+1].z;
            above++;
          }else{
            bDiff += points[x][y+1].z;
            below++;
          }

          if( above > below && points[x][y].z < water ){
            points[x][y].z = (points[x][y].z + aDiff)/(above+1);
          }else if( below >= above && points[x][y].z > water  ){
            points[x][y].z = (points[x][y].z + bDiff)/(below+1);
          }

        }
      }
    }
  }

  smooth(ret.points, 5, 10);

  var polygon = null;
  for(var x=0; x<ret.points.length-1; x++){
    for(var y=0; y<ret.points.length-1; y++){
      var ul = ret.points[x][y];
      var ur = ret.points[x+1][y];
      var lr = ret.points[x+1][y+1];
      var ll = ret.points[x][y+1];

      var z = (ul.z + ur.z + lr.z + ll.z)/4;

      polygon = svg.polyline([
        [ul.x, ul.y],
        [ur.x, ur.y],
        [lr.x, lr.y],
        [ll.x, ll.y]
      ])
      .stroke({
        color: 'rgba('+ Math.round( -25 + 5*z ) +','+ Math.round( 60 + 3*z ) +',0,1)'
      })
      .fill('rgba('+ Math.round( -25 + 5*z ) +','+ Math.round( 60 + 3*z ) +',0,1)');

      if(z < water){
        polygon.stroke({
          color: 'rgba(0,0,'+ Math.round( 250 + 2*z ) +',1)'
        })
        .fill('rgba(0,0,'+ Math.round( 250 + 2*z ) +',1)')
      }
    }
  }


  return ret;
};
