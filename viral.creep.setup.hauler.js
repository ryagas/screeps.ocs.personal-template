const setup = {};
module.exports = setup;
setup._maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
      case 'W45S87':
        return count + 1; // 1 more
      default:
        return count;
    }
};
