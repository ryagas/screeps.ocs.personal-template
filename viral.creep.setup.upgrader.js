const setup = {};
module.exports = {};
setup.maxCount = function(room){
    let count = this.baseOf.viral._maxCount.apply(this,[room]);
    switch( room.name ) {
//      case 'W48S87':
      case 'W45S87':
//      case 'W54S82':
        return count + 3; 
      default:
        return count;
    }
};
