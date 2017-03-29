const setup = {};
module.exports = {};
setup._maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
      //        case 'ROOMNAME':
      //            return Math.max(1, count - 1); // one fewer
      case 'W47N66':
                  return count + 1; // one more
      default:
          return count;
    }
};
