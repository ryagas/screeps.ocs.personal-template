const setup = {};
module.exports = {};
setup._maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
      //        case 'ROOMNAME':
      //            return Math.max(1, count - 1); // one fewer
      case 'W47N66':
      case 'W47N62':
      case 'W49N67':
                  return count + 2; // 2 more
      default:
          return count;
    }
};
