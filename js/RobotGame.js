function RobotGame() {
  var gSobject = gs.inherit(gs.baseClass,'RobotGame');
  gSobject.clazz = { name: 'org.grooscript.web.robot.RobotGame', simpleName: 'RobotGame'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.__defineGetter__('MIN_ROBOTS', function(){ return RobotGame.MIN_ROBOTS; });
  gSobject.__defineSetter__('MIN_ROBOTS', function(gSval){ RobotGame.MIN_ROBOTS = gSval; });
  gSobject.__defineGetter__('MAX_ROBOTS', function(){ return RobotGame.MAX_ROBOTS; });
  gSobject.__defineSetter__('MAX_ROBOTS', function(gSval){ RobotGame.MAX_ROBOTS = gSval; });
  gSobject.__defineGetter__('MAX_LIFE', function(){ return RobotGame.MAX_LIFE; });
  gSobject.__defineSetter__('MAX_LIFE', function(gSval){ RobotGame.MAX_LIFE = gSval; });
  gSobject.__defineGetter__('DEFAULT_SPEED_RATIO', function(){ return RobotGame.DEFAULT_SPEED_RATIO; });
  gSobject.__defineSetter__('DEFAULT_SPEED_RATIO', function(gSval){ RobotGame.DEFAULT_SPEED_RATIO = gSval; });
  gSobject.__defineGetter__('DEFAULT_RADAR_DISTANCE', function(){ return RobotGame.DEFAULT_RADAR_DISTANCE; });
  gSobject.__defineSetter__('DEFAULT_RADAR_DISTANCE', function(gSval){ RobotGame.DEFAULT_RADAR_DISTANCE = gSval; });
  gSobject.__defineGetter__('DEFAULT_SHOOT_DISTANCE', function(){ return RobotGame.DEFAULT_SHOOT_DISTANCE; });
  gSobject.__defineSetter__('DEFAULT_SHOOT_DISTANCE', function(gSval){ RobotGame.DEFAULT_SHOOT_DISTANCE = gSval; });
  gSobject.__defineGetter__('DEFAULT_SIZE', function(){ return RobotGame.DEFAULT_SIZE; });
  gSobject.__defineSetter__('DEFAULT_SIZE', function(gSval){ RobotGame.DEFAULT_SIZE = gSval; });
  gSobject.__defineGetter__('MINIMUM_DISTANCE_BORDERS', function(){ return RobotGame.MINIMUM_DISTANCE_BORDERS; });
  gSobject.__defineSetter__('MINIMUM_DISTANCE_BORDERS', function(gSval){ RobotGame.MINIMUM_DISTANCE_BORDERS = gSval; });
  gSobject.__defineGetter__('SHOOT_TEMPERATURE', function(){ return RobotGame.SHOOT_TEMPERATURE; });
  gSobject.__defineSetter__('SHOOT_TEMPERATURE', function(gSval){ RobotGame.SHOOT_TEMPERATURE = gSval; });
  gSobject.__defineGetter__('REST_TEMPERATURE', function(){ return RobotGame.REST_TEMPERATURE; });
  gSobject.__defineSetter__('REST_TEMPERATURE', function(gSval){ RobotGame.REST_TEMPERATURE = gSval; });
  gSobject.__defineGetter__('IMPACT_DISTANCE', function(){ return RobotGame.IMPACT_DISTANCE; });
  gSobject.__defineSetter__('IMPACT_DISTANCE', function(gSval){ RobotGame.IMPACT_DISTANCE = gSval; });
  gSobject.__defineGetter__('IMPACT_DAMAGE', function(){ return RobotGame.IMPACT_DAMAGE; });
  gSobject.__defineSetter__('IMPACT_DAMAGE', function(gSval){ RobotGame.IMPACT_DAMAGE = gSval; });
  gSobject.__defineGetter__('COLLISION_DISTANCE', function(){ return RobotGame.COLLISION_DISTANCE; });
  gSobject.__defineSetter__('COLLISION_DISTANCE', function(gSval){ RobotGame.COLLISION_DISTANCE = gSval; });
  gSobject.robots = null;
  gSobject.sameTime = RobotGame.MIN_ROBOTS;
  gSobject.maxSize = RobotGame.DEFAULT_SIZE;
  gSobject.speedRatio = RobotGame.DEFAULT_SPEED_RATIO;
  gSobject.radarDistance = RobotGame.DEFAULT_RADAR_DISTANCE;
  gSobject.shootDistance = RobotGame.DEFAULT_SHOOT_DISTANCE;
  gSobject.players = null;
  gSobject.shoots = gs.list([]);
  gSobject.stats = null;
  gSobject.colors = null;
  gSobject.colorNames = null;
  gSobject.usedColor = null;
  gSobject['getRandomForStart'] = function(it) {
    var r = gs.random();
    var x = gs.plus(gs.mc(r,"nextInt",gs.list([gs.minus(gs.gp(gSobject.maxSize,"x"), (gs.multiply(2, RobotGame.MINIMUM_DISTANCE_BORDERS)))])), RobotGame.MINIMUM_DISTANCE_BORDERS);
    var y = gs.plus(gs.mc(r,"nextInt",gs.list([gs.minus(gs.gp(gSobject.maxSize,"y"), (gs.multiply(2, RobotGame.MINIMUM_DISTANCE_BORDERS)))])), RobotGame.MINIMUM_DISTANCE_BORDERS);
    return Position(gs.map().add("x",x).add("y",y));
  }
  gSobject['joinRobotToBattle'] = function(robot) {
    gs.sp(robot,"rXPosition",gs.mc(gSobject,"getRandomForStart",gs.list([])));
    if (gs.mc(gSobject.players,"size",gs.list([])) > 0) {
      while (gs.mc(gs.mc(gSobject,"checkDistances",gs.list([robot])),"min",gs.list([])) < gSobject.shootDistance) {
        gs.sp(robot,"rXPosition",gs.mc(gSobject,"getRandomForStart",gs.list([])));
      };
    };
    gs.sp(robot,"rXActive",true);
    gs.sp(robot,"rXLife",RobotGame.MAX_LIFE);
    gs.sp(robot,"rXTemperature",0);
    gs.sp(robot,"rXMaxPosition",gSobject.maxSize);
    gs.sp(robot,"rXMaxShootDistance",gSobject.shootDistance);
    gs.sp(robot,"data",gs.map());
    if (!gs.bool(gs.gp(robot,"rXColor"))) {
      gs.sp(robot,"rXColorName",(gSobject.colorNames [ gSobject.usedColor]));
      gs.sp(robot,"rXColor",(gSobject.colors [ gSobject.usedColor++]));
    };
    return gs.mc(gSobject.players,'leftShift', gs.list([robot]));
  }
  gSobject['start'] = function(it) {
    if (gs.mc(gSobject.robots,"size",gs.list([])) >= gSobject.sameTime) {
      return gs.mc(gSobject.sameTime,"times",gs.list([function(it) {
        var i = 0;
        while (gs.mc(gSobject.players,"size",gs.list([])) < gSobject.sameTime) {
          var robot = gSobject.robots [ i++];
          gs.mc(gSobject,"joinRobotToBattle",gs.list([robot]));
        };
      }]));
    } else {
      throw "Exception";
    };
  }
  gSobject['joinRandomRobotToBattle'] = function(it) {
    var added = false;
    while ((!gs.bool(added)) && (gs.mc(gSobject.robots,"size",gs.list([])) > gs.mc(gSobject.players,"size",gs.list([])))) {
      var number = gs.mc(gs.random(),"nextInt",gs.list([gs.mc(gSobject.robots,"size",gs.list([]))]));
      var robot = gSobject.robots [ number];
      if (!gs.mc(gSobject.players,"find",gs.list([function(it) {
        return gs.equals(gs.gp(it,"name"), gs.gp(robot,"name"));
      }]))) {
        gs.mc(gSobject,"joinRobotToBattle",gs.list([robot]));
        added = true;
      };
    };
  }
  gSobject['distance'] = function(pos1, pos2) {
    var total = Math.sqrt(gs.plus(Math.pow(gs.minus(gs.gp(pos1,"x"), gs.gp(pos2,"x")), 2), Math.pow(gs.minus(gs.gp(pos1,"y"), gs.gp(pos2,"y")), 2)));
    return total;
  }
  gSobject['checkDistances'] = function(robot) {
    var result = gs.list([]);
    gs.mc(gSobject.players,"each",gs.list([function(player) {
      if (gs.gp(robot,"name") != gs.gp(player,"name")) {
        return gs.mc(result,'leftShift', gs.list([gs.mc(gSobject,"distance",gs.list([gs.gp(robot,"rXPosition"), gs.gp(player,"rXPosition")]))]));
      };
    }]));
    return result;
  }
  gSobject['processRadars'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(player) {
      var map = gs.map();
      gs.mc(gSobject.players,"each",gs.list([function(otherPlayer) {
        if (((gs.bool(gs.gp(otherPlayer,"rXActive"))) && (gs.gp(otherPlayer,"name") != gs.gp(player,"name"))) && (gs.mc(gSobject,"distance",gs.list([gs.gp(otherPlayer,"rXPosition"), gs.gp(player,"rXPosition")])) < gSobject.radarDistance)) {
          var clonedPos = Position(gs.map().add("x",gs.gp(gs.gp(otherPlayer,"rXPosition"),"x")).add("y",gs.gp(gs.gp(otherPlayer,"rXPosition"),"y")));
          return gs.mc(map,"put",gs.list([gs.gp(otherPlayer,"name"), clonedPos]));
        };
      }]));
      return gs.sp(player,"rXRadar",map);
    }]));
  }
  gSobject['processActions'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(robot) {
      if (gs.bool(gs.gp(robot,"rXActive"))) {
        return gs.mc(robot,"actions",gs.list([robot]));
      };
    }]));
  }
  gSobject['addRobotShoots'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(robot) {
      if (gs.bool(gs.gp(robot,"rXActive"))) {
        if ((gs.bool(gs.gp(robot,"rXShoot"))) && (gs.mc(gSobject,"distance",gs.list([gs.gp(robot,"rXShoot"), gs.gp(robot,"rXPosition")])) <= gSobject.shootDistance)) {
          gs.sp(robot,"rXTemperature",(gs.plus(gs.gp(robot,"rXTemperature"), RobotGame.SHOOT_TEMPERATURE)));
          var shoot = gs.expando();
          gs.sp(shoot,"origin",Position(gs.map().add("x",gs.gp(gs.gp(robot,"rXPosition"),"x")).add("y",gs.gp(gs.gp(robot,"rXPosition"),"y"))));
          gs.sp(shoot,"destination",Position(gs.map().add("x",gs.gp(gs.gp(robot,"rXShoot"),"x")).add("y",gs.gp(gs.gp(robot,"rXShoot"),"y"))));
          gs.sp(shoot,"distance",gs.mc(gSobject,"distance",gs.list([gs.gp(shoot,"origin"), gs.gp(shoot,"destination")])));
          gs.sp(shoot,"turns",0);
          gs.sp(shoot,"finished",false);
          gs.sp(shoot,"robot",gs.gp(robot,"name"));
          gs.sp(shoot,"incx",(gs.gp(shoot,"distance") > 0 ? (gs.minus(gs.gp(gs.gp(shoot,"destination"),"x"), gs.gp(gs.gp(shoot,"origin"),"x"))) / gs.gp(shoot,"distance") : 1));
          gs.sp(shoot,"incy",(gs.gp(shoot,"distance") > 0 ? (gs.minus(gs.gp(gs.gp(shoot,"destination"),"y"), gs.gp(gs.gp(shoot,"origin"),"y"))) / gs.gp(shoot,"distance") : 1));
          gs.mc(gSobject.shoots,'leftShift', gs.list([shoot]));
        } else {
          gs.sp(robot,"rXTemperature",(gs.minus(gs.gp(robot,"rXTemperature"), RobotGame.REST_TEMPERATURE)));
          if (gs.gp(robot,"rXTemperature") < 0) {
            gs.sp(robot,"rXTemperature",0);
          };
        };
        return gs.sp(robot,"rXShoot",null);
      };
    }]));
  }
  gSobject['processShoots'] = function(phase) {
    return gs.mc(gSobject.shoots,"each",gs.list([function(shoot) {
      if (!gs.bool(gs.gp(shoot,"finished"))) {
        var distanceDone = gs.plus((gs.multiply(gs.gp(shoot,"turns"), gSobject.speedRatio)), phase);
        if (distanceDone >= gs.gp(shoot,"distance")) {
          return gs.mc(gSobject,"processImpact",gs.list([shoot]));
        };
      };
    }]));
  }
  gSobject['processImpact'] = function(shoot) {
    gs.mc(gSobject.players,"each",gs.list([function(player) {
      if (gs.bool(gs.gp(player,"rXActive"))) {
        if (gs.mc(gSobject,"distance",gs.list([gs.gp(player,"rXPosition"), gs.gp(shoot,"destination")])) <= RobotGame.IMPACT_DISTANCE) {
          gs.sp(player,"rXLife",(gs.minus(gs.gp(player,"rXLife"), RobotGame.IMPACT_DAMAGE)));
          if (gs.mc(player,"isDestroyed",gs.list([]))) {
            gs.sp(player,"rXActive",false);
            gs.mc(gSobject,"increaseDeaths",gs.list([gs.gp(player,"name")]));
            if (gs.gp(shoot,"robot") != gs.gp(player,"name")) {
              return gs.mc(gSobject,"increaseKillShoots",gs.list([gs.gp(shoot,"robot")]));
            };
          };
        };
      };
    }]));
    return gs.sp(shoot,"finished",true);
  }
  gSobject['processHotRobots'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(robot) {
      if (gs.bool(gs.gp(robot,"rXActive"))) {
        if (gs.mc(robot,"isExploding",gs.list([]))) {
          gs.sp(robot,"rXActive",false);
          return gs.mc(gSobject,"increaseDeaths",gs.list([gs.gp(robot,"name")]));
        };
      };
    }]));
  }
  gSobject['processUselessRobots'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(robot) {
      if (gs.bool(gs.gp(robot,"rXActive"))) {
        if (gs.mc(robot,"isCrashed",gs.list([]))) {
          gs.sp(robot,"rXActive",false);
          return gs.mc(gSobject,"increaseDeaths",gs.list([gs.gp(robot,"name")]));
        } else {
          return gs.mc(gSobject.players,"each",gs.list([function(otherRobot) {
            if (((gs.gp(otherRobot,"name") != gs.gp(robot,"name")) && (gs.bool(gs.gp(otherRobot,"rXActive")))) && (gs.mc(gSobject,"distance",gs.list([gs.gp(robot,"rXPosition"), gs.gp(otherRobot,"rXPosition")])) < RobotGame.COLLISION_DISTANCE)) {
              gs.sp(robot,"rXActive",false);
              gs.mc(gSobject,"increaseDeaths",gs.list([gs.gp(robot,"name")]));
              gs.sp(otherRobot,"rXActive",false);
              return gs.mc(gSobject,"increaseDeaths",gs.list([gs.gp(otherRobot,"name")]));
            };
          }]));
        };
      };
    }]));
  }
  gSobject['moveRobots'] = function(it) {
    return gs.mc(gSobject.players,"each",gs.list([function(player) {
      if (gs.bool(gs.gp(player,"rXMove"))) {
        if (gs.equals(gs.gp(player,"rXMove"), gs.gp(Direction,"north"))) {
          gs.sp(gs.gp(player,"rXPosition"),"y",(gs.minus(gs.gp(gs.gp(player,"rXPosition"),"y"), 1)));
        };
        if (gs.equals(gs.gp(player,"rXMove"), gs.gp(Direction,"south"))) {
          gs.sp(gs.gp(player,"rXPosition"),"y",(gs.plus(gs.gp(gs.gp(player,"rXPosition"),"y"), 1)));
        };
        if (gs.equals(gs.gp(player,"rXMove"), gs.gp(Direction,"east"))) {
          gs.sp(gs.gp(player,"rXPosition"),"x",(gs.plus(gs.gp(gs.gp(player,"rXPosition"),"x"), 1)));
        };
        if (gs.equals(gs.gp(player,"rXMove"), gs.gp(Direction,"west"))) {
          gs.sp(gs.gp(player,"rXPosition"),"x",(gs.minus(gs.gp(gs.gp(player,"rXPosition"),"x"), 1)));
        };
      };
      return gs.sp(player,"rXMove",null);
    }]));
  }
  gSobject['cleanTurn'] = function(it) {
    var newPlayers = gs.list([]);
    gs.mc(gSobject.players,"each",gs.list([function(it) {
      if (gs.bool(gs.gp(it,"rXActive"))) {
        return gs.mc(newPlayers,'leftShift', gs.list([it]));
      };
    }]));
    gSobject.players = null;
    gSobject.players = newPlayers;
    while (gs.mc(gSobject.players,"size",gs.list([])) < gSobject.sameTime) {
      gs.mc(gSobject,"joinRandomRobotToBattle",gs.list([]));
    };
    var newShoots = gs.list([]);
    gs.mc(gSobject.shoots,"each",gs.list([function(shoot) {
      if (!gs.bool(gs.gp(shoot,"finished"))) {
        gs.sp(shoot,"turns",(gs.plus(gs.gp(shoot,"turns"), 1)));
        return gs.mc(newShoots,'leftShift', gs.list([shoot]));
      };
    }]));
    gSobject.shoots = null;
    return gSobject.shoots = newShoots;
  }
  gSobject['addStat'] = function(name) {
    if (!gs.mc(gSobject.stats,"containsKey",gs.list([name]))) {
      var exp = gs.expando();
      gs.sp(exp,"ks",0);
      gs.sp(exp,"deaths",0);
      return gs.mc(gSobject.stats,"putAt",gs.list([name, exp]));
    };
  }
  gSobject['addRobotToGame'] = function(robot) {
    if ((((gs.bool(robot)) && (gs.mc(gSobject.robots,"size",gs.list([])) < RobotGame.MAX_ROBOTS)) && (gs.bool(gs.gp(robot,"name")))) && (!gs.mc(gSobject.robots,"any",gs.list([function(it) {
      return gs.equals(gs.gp(it,"name"), gs.gp(robot,"name"));
    }])))) {
      gs.mc(gSobject.robots,'leftShift', gs.list([robot]));
      gs.mc(gSobject,"addStat",gs.list([gs.gp(robot,"name")]));
      return true;
    } else {
      return false;
    };
  }
  gSobject['increaseDeaths'] = function(name) {
    return gs.sp(gs.gp(gSobject.stats,"" + (name) + ""),"deaths",(gs.plus(gs.gp(gs.gp(gSobject.stats,"" + (name) + ""),"deaths"), 1)));
  }
  gSobject['increaseKillShoots'] = function(name) {
    return gs.sp(gs.gp(gSobject.stats,"" + (name) + ""),"ks",(gs.plus(gs.gp(gs.gp(gSobject.stats,"" + (name) + ""),"ks"), 1)));
  }
  gSobject['toString'] = function(it) {
    var out = "";
    gs.mc(gSobject.stats,"each",gs.list([function(key, value) {
      return out += " " + (key) + " Deaths:" + (gs.gp(value,"deaths")) + " Ks:" + (gs.gp(value,"ks")) + "";
    }]));
    return out;
  }
  gSobject['toTable'] = function(it) {
    var result = "<table class='table'>";
    result += "<tr> <th>Color</th> <th>Name</th> <th>Deaths</th> <th> Kill shoots </th> </tr>";
    gs.mc(gSobject.stats,"each",gs.list([function(key, value) {
      var robot = gs.mc(gSobject.robots,"find",gs.list([function(it) {
        return gs.equals(gs.gp(it,"name"), key);
      }]));
      return result += " <tr> <td class='" + (gs.gp(robot,"rXColorName")) + "'>" + ((gs.bool(gs.gp(robot,"rXActive")) ? gs.gp(robot,"rXLife") : "Off")) + "</td> <td>" + (key) + "</td> <td align='center'>" + (gs.gp(value,"deaths")) + "</td> <td align='center'> " + (gs.gp(value,"ks")) + " </td> </tr>";
    }]));
    return gs.plus(result, "</table>");
  }
  gSobject['RobotGame0'] = function(it) {
    gSobject.robots = gs.list([]);
    gSobject.colors = gs.list([]);
    gSobject.colorNames = gs.list([]);
    gSobject.stats = gs.map();
    gSobject.players = gs.list([]);
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["red"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["blue"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["green"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["purple"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["cyan"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["orange"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["yellow"]));
    gs.mc(gSobject.colorNames,'leftShift', gs.list(["black"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(255,0,0)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(0,0,255)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(0,255,0)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(255,0,255)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(0,255,255)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(255,128,0)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(255,255,0)"]));
    gs.mc(gSobject.colors,'leftShift', gs.list(["rgb(0,0,0)"]));
    gSobject.usedColor = 0;
    return this;
  }
  if (arguments.length==0) {gSobject.RobotGame0(); }
  gSobject.RobotGame1 = function(map) { gs.passMapToObject(map,this); return this;};
  if (arguments.length==1) {gSobject.RobotGame1(arguments[0]); }
  
  return gSobject;
};
RobotGame.MIN_ROBOTS = 2;
RobotGame.MAX_ROBOTS = 8;
RobotGame.MAX_LIFE = 100;
RobotGame.DEFAULT_SPEED_RATIO = 3;
RobotGame.DEFAULT_RADAR_DISTANCE = 250;
RobotGame.DEFAULT_SHOOT_DISTANCE = 150;
RobotGame.DEFAULT_SIZE = Position(gs.map().add("x",800).add("y",600));
RobotGame.MINIMUM_DISTANCE_BORDERS = 5;
RobotGame.SHOOT_TEMPERATURE = 24;
RobotGame.REST_TEMPERATURE = 5;
RobotGame.IMPACT_DISTANCE = 4;
RobotGame.IMPACT_DAMAGE = 30;
RobotGame.COLLISION_DISTANCE = 3;

function Position() {
  var gSobject = gs.inherit(gs.baseClass,'Position');
  gSobject.clazz = { name: 'org.grooscript.web.robot.Position', simpleName: 'Position'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.x = null;
  gSobject.y = null;
  gSobject['equals'] = function(other) {
    return ((((gs.bool(other)) && (gs.bool(gs.gp(other,"x")))) && (gs.bool(gs.gp(other,"y")))) && (gs.equals(gs.gp(other,"x"), gSobject.x))) && (gs.equals(gs.gp(other,"y"), gSobject.y));
  }
  gSobject.Position1 = function(map) { gs.passMapToObject(map,this); return this;};
  if (arguments.length==1) {gSobject.Position1(arguments[0]); }
  
  return gSobject;
};

function Robot() {
  var gSobject = gs.inherit(gs.baseClass,'Robot');
  gSobject.clazz = { name: 'org.grooscript.web.robot.Robot', simpleName: 'Robot'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.name = null;
  gSobject.data = null;
  gSobject.east = gs.gp(Direction,"east");
  gSobject.west = gs.gp(Direction,"west");
  gSobject.north = gs.gp(Direction,"north");
  gSobject.south = gs.gp(Direction,"south");
  gSobject.rXActive = null;
  gSobject.rXMaxShootDistance = null;
  gSobject.rXController = null;
  gSobject.rXTemperature = null;
  gSobject.rXPosition = null;
  gSobject.rXLife = null;
  gSobject.rXMaxPosition = null;
  gSobject.rXRadar = null;
  gSobject.rXShoot = null;
  gSobject.rXMove = null;
  gSobject.rXColor = null;
  gSobject.rXColorName = null;
  gSobject['move'] = function(direction) {
    if (direction != null) {
      return gs.sp(this,"rXMove",direction);
    };
  }
  gSobject['distance'] = function(position1, position2) {
    if ((gs.bool(position1)) && (gs.bool(position2))) {
      var total = Math.sqrt(gs.plus(Math.pow(gs.minus(gs.gp(position1,"x"), gs.gp(position2,"x")), 2), Math.pow(gs.minus(gs.gp(position1,"y"), gs.gp(position2,"y")), 2)));
      return total;
    } else {
      return 0;
    };
  }
  gSobject['canShoot'] = function(x, y) {
    if (gs.bool(gSobject.rXPosition)) {
      var pos = Position();
      gs.sp(pos,"x",x);
      gs.sp(pos,"y",y);
      var total = gs.mc(gSobject,"distance",gs.list([gSobject.rXPosition, pos]));
      return total <= gSobject.rXMaxShootDistance;
    } else {
      return false;
    };
  }
  gSobject['shoot'] = function(x, y) {
    return gs.sp(this,"rXShoot",Position(gs.map().add("x",x).add("y",y)));
  }
  gSobject['cancelShoot'] = function(it) {
    return gs.sp(this,"rXShoot",null);
  }
  gSobject['getRadar'] = function(it) {
    return gSobject.rXRadar;
  }
  gSobject['getLife'] = function(it) {
    var life = gSobject.rXLife;
    return life;
  }
  gSobject['getTemperature'] = function(it) {
    var temperature = gSobject.rXTemperature;
    return temperature;
  }
  gSobject['getPosition'] = function(it) {
    if (gs.bool(gSobject.rXPosition)) {
      return Position(gs.map().add("x",gs.gp(gSobject.rXPosition,"x")).add("y",gs.gp(gSobject.rXPosition,"y")));
    } else {
      return Position(gs.map().add("x",0).add("y",0));
    };
  }
  gSobject['getMaxPosition'] = function(it) {
    if (gs.bool(gSobject.rXMaxPosition)) {
      return Position(gs.map().add("x",gs.gp(gSobject.rXMaxPosition,"x")).add("y",gs.gp(gSobject.rXMaxPosition,"y")));
    } else {
      return Position(gs.map().add("x",0).add("y",0));
    };
  }
  gSobject['isCrashed'] = function(it) {
    return (((gs.gp(gSobject.rXPosition,"x") >= gs.gp(gSobject.rXMaxPosition,"x")) || (gs.gp(gSobject.rXPosition,"y") >= gs.gp(gSobject.rXMaxPosition,"y"))) || (gs.gp(gSobject.rXPosition,"x") <= 0)) || (gs.gp(gSobject.rXPosition,"y") <= 0);
  }
  gSobject['isDestroyed'] = function(it) {
    return gSobject.rXLife <= 0;
  }
  gSobject['isExploding'] = function(it) {
    return gSobject.rXTemperature >= 100;
  }
  gSobject['Robot1'] = function(name) {
    gs.sp(this,"name",name);
    gs.sp(this,"rXActive",false);
    return this;
  }
  if (arguments.length==1) {gSobject.Robot1(arguments[0]); }
  
  return gSobject;
};

var Direction = {
  north : 1,
  south : 2,
  east : 3,
  west : 4,
  
}
