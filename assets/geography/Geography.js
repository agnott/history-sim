var Geography = function(seed, args){
  var ret = {
    seed: seed,
    dim: args.dim || [500,500],
    points: {}
  };
  var rand = new Random(seed);
  var svg = SVG(args.target).width(ret.dim[0]).height(ret.dim[1]);
  var numPoints = 1000;

  //Create a beginning point
  ret.points = {
    x: ret.dim[0]/2,
    y: ret.dim[0]/2,
    neighbors: [],
    iAngle: null
  };

  var maxDeltaXY = 25;
  var genNeighbors = function(point, level){
    if( level === 0 ){
      return;
    }
    var angle = 0;
    for(var i=0; i<2; i++){
      angle = (!point.iAngle)?
        rand.uniform(0, 360) :
        rand.uniform(point.iAngle + 180 - 90, point.iAngle + 180 + 90);
      point.neighbors.push({
        x: point.x + maxDeltaXY*Math.cos(2*Math.PI / 180 * angle),
        y: point.y - maxDeltaXY*Math.sin(2*Math.PI / 180 * angle),
        neighbors: [],
        iAngle: angle
      });
      genNeighbors(point.neighbors[i], level - 1);
    }
  };

  genNeighbors(ret.points, 3);

  console.log(ret.points);

  var traverse = function(point, cb){
    cb(point);
    if( point.neighbors.length > 0 ){
      traverse(point.neighbors[0], cb);
      traverse(point.neighbors[1], cb);
    }
  };

  //Draw points to svg
  var radius = 2;
  traverse(ret.points, function(point){
    if( point.neighbors.length > 0 ){
      svg.line(point.x, point.y, point.neighbors[0].x, point.neighbors[0].y)
        .stroke({ width: '1px', color: 'black' });
      svg.line(point.x, point.y, point.neighbors[1].x, point.neighbors[1].y)
        .stroke({ width: '1px', color: 'black' });
      svg.line(point.neighbors[0].x, point.neighbors[0].y, point.neighbors[1].x, point.neighbors[1].y)
        .stroke({ width: '1px', color: 'black' });
    }
    svg.circle(2).fill('red').x(point.x - radius/2).y(point.y - radius/2);
  });

  return ret;
};
