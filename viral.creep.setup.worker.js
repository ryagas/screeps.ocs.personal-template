const setup = {};
module.exports = setup;
setup.maxWorker = function(room){
    let count = this.baseOf.viral.maxWorker(room);
    switch( room.name ) {
        case 'W47N62':
            return count + 1;
        default: return count;
    }
};
