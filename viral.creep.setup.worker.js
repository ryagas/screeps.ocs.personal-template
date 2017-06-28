const setup = {};
module.exports = setup;
setup.maxWorker = function(room){
    let count = this.baseOf.viral.maxWorker(room);
    switch( room.name ) {
        case 'W45S87':
            return count + 4;
        default: return count;
    }
};
