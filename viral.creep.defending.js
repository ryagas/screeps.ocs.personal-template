let mod = {};

mod.run = {
    
    ranger: function(creep) {
        let range = creep.pos.getRangeTo(creep.target);
        if( !creep.flee ){
            if( range > 3 ){
                let direction = creep.pos.getDirectionTo(creep.target);
                if(direction) {
                    let nextStep = Traveler.positionAtDirection(creep.pos, direction);
                    //TODO if on border nextStep=true
                    let isRampart = !_(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() || 
                        !(_(nextStep.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() && _(nextStep.lookFor(LOOK_CREEPS)).isEmpty());
                    if(COMBAT_CREEPS_RESPECT_RAMPARTS && !isRampart){
                        creep.travelTo(creep.target);
                    } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                        creep.travelTo(creep.target);
                    }
                }
            }
            if( range < 3 ){
                let direction = creep.target.pos.getDirectionTo(creep);
                if( direction ) {
                    let nextStep = Traveler.positionAtDirection(creep.pos, direction);
                    //TODO if on border nextStep=true
                    let isRampart = !_(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() || 
                        !(_(nextStep.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() && _(nextStep.lookFor(LOOK_CREEPS)).isEmpty());
                    if(COMBAT_CREEPS_RESPECT_RAMPARTS && !isRampart){
                        creep.move(direction);
                    } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                        creep.move(direction);
                    }
                    if (range === 1) {
                        creep.attacking = creep.attack(creep.target) == OK;
                    }
                }
            }
        }

        // attack ranged
        let targets = creep.pos.findInRange(creep.room.hostiles, 3);
        if(targets.length > 2) { // TODO: precalc damage dealt
            if(global.CHATTY) creep.say('MassAttack');
            creep.attackingRanged = creep.rangedMassAttack() == OK;
            return;
        }
        if( range < 4 ) {
            creep.attackingRanged = creep.rangedAttack(creep.target) == OK;
            return;
        }
        if(targets.length > 0){
            creep.attackingRanged = creep.rangedAttack(targets[0]) == OK;
        }
    },
    melee: function(creep) {
        if( !creep.flee ){
            let direction = creep.pos.getDirectionTo(creep.target);
            if(direction){ 
                let nextStep = Traveler.positionAtDirection(creep.pos, direction);
                //TODO if on border nextStep=true
                let isRampart = !_(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() || 
                    !(_(nextStep.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() && _(nextStep.lookFor(LOOK_CREEPS)).isEmpty());
                if(COMBAT_CREEPS_RESPECT_RAMPARTS && !isRampart){
                    creep.travelTo(creep.target);
                } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                    creep.travelTo(creep.target);
                }
            }
        }
        // attack
        let attacking = creep.attack(creep.target);
        if( attacking == ERR_NOT_IN_RANGE ) {
            let targets = creep.pos.findInRange(creep.room.hostiles, 1);
            if( targets.length > 0)
                creep.attacking = creep.attack(targets[0]) == OK;
        } else creep.attacking = attacking == OK;
    },
    warrior: function(creep) {
        let range = creep.pos.getRangeTo(creep.target);
        let hasAttack = creep.hasActiveBodyparts(ATTACK);
        let hasRangedAttack = creep.hasActiveBodyparts(RANGED_ATTACK);
        if( !creep.flee ){
            if( hasAttack ){
                if( range > 1 ) {
                    let direction = creep.pos.getDirectionTo(creep.target);
                    if(direction) {
                        let nextStep = Traveler.positionAtDirection(creep.pos, direction);
                        //TODO if on border nextStep=true
                        let isRampart = !_(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() || 
                            !(_(nextStep.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() && _(nextStep.lookFor(LOOK_CREEPS)).isEmpty());
                        if(COMBAT_CREEPS_RESPECT_RAMPARTS && !isRampart){
                            creep.travelTo(creep.target);
                        } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                            creep.travelTo(creep.target);
                        }
                    } 
                }
            } else if( hasRangedAttack ) {
                if( range > 3 ) {
                    let direction = creep.pos.getDirectionTo(creep.target);
                    if(direction) {
                        let nextStep = Traveler.positionAtDirection(creep.pos, direction);
                        //TODO if on border nextStep=true
                        let isRampart = !_(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() || 
                            !(_(nextStep.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty() && _(nextStep.lookFor(LOOK_CREEPS)).isEmpty());
                        if(COMBAT_CREEPS_RESPECT_RAMPARTS && !isRampart){
                            creep.travelTo(creep.target);
                        } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                            creep.travelTo(creep.target);
                        }
                    }
                }
                if( range < 3 ) {
                    if(COMBAT_CREEPS_RESPECT_RAMPARTS && _(creep.pos.lookFor(LOOK_STRUCTURES)).filter({'structureType':STRUCTURE_RAMPART}).isEmpty()) {
                        creep.fleeMove();
                    } else if(!COMBAT_CREEPS_RESPECT_RAMPARTS){
                        creep.fleeMove();
                    }
                }
            } else creep.flee = true;
        }
        // attack
        if( hasAttack ){
            let attacking = creep.attack(creep.target);
            if( attacking == ERR_NOT_IN_RANGE ) {
                let targets = creep.pos.findInRange(creep.room.hostiles, 1);
                if( targets.length > 0) creep.attacking = creep.attack(targets[0]) == OK;
            } else creep.attacking = attacking == OK;
        }
        // attack ranged
        if( hasRangedAttack ) {
            let targets = creep.pos.findInRange(creep.room.hostiles, 3);
            if(targets.length > 2) { // TODO: precalc damage dealt
                if(CHATTY) creep.say('MassAttack');
                creep.attackingRanged = creep.rangedMassAttack() == OK;
            } else if( range < 4 ) {
                creep.attackingRanged = creep.rangedAttack(creep.target) == OK;
            } else if(targets.length > 0){
                creep.attackingRanged = creep.rangedAttack(targets[0]) == OK;
            }
        }
    }
};

module.exports=mod;
