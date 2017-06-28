const setup = {};
module.exports = {};
setup.maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
      case 'W48S86':
        return count + 1; // 1 more
      default:
        return count;
    }
};
