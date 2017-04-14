const setup = {};
module.exports = {};
setup.maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
      case 'W49N67':
        return count + 3; // 2 more
      default:
        return count;
    }
};
