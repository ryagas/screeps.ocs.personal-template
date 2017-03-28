let mod = {
    SAY_PUBLIC: false, // creeps talk public
    PROFILING: {
        ANALYZE_LIMIT: 2, // profile warning levels
        AVERAGE_USAGE: true, // display average creep & flag usage
        EXECUTE_LIMIT: 5, // profile warning levels
        FLUSH_LIMIT: 5, // profile warning levels
        REGISTER_LIMIT: 2, // profile warning levels
    },
    GRAFANA: false, // track for Grafana data
    GRAFANA_INTERVAL: 3, // loops between Grafana tracking - No lower than 3.
    CENSUS_ANNOUNCEMENTS: true, // log birth and death
    SELL_NOTIFICATION: true, // send mail when selling minerals
    SPAWN_INTERVAL: 3, // loops between regular spawn probe
    ROOM_VISUALS: true, // display basic room statistics with RoomVisuals
    ROOM_VISUALS_ALL: false, // displays visuals in all rooms you have vision in. Only your rooms when false.
    VISUALS: { // if ROOM_VISUALS is enabled, you can select what you want to display - All is a bit much for some people.
        ROOM: true, // displays basic info relative to the room
        ROOM_GLOBAL: false, // displays basic info relative to your account - requires ROOM: true
        CPU: true, // display a graph containing CPU used, CPU limit, and bucket
        ROOM_ORDERS: true, // display orders the room creates
        ROOM_OFFERS: false, // display what a room will offer another
        SPAWN: false, // displays creep name and spawn progress percentage when spawning
        CONTROLLER: false, // displays level, progress, and ticks to downgrade if active
        STORAGE: true, // displays storage contents
        TERMINAL: true, // displays terminal contents
        TRANSACTIONS: false, // displays 2 most recent transactions over room terminal
        LABS: false, // displays lab energy, mineral, or cooldown
        MINERAL: false, // displays mineral amount, or ticks to regen
        SOURCE: false, // displays energy amount, or ticks to regen
        CREEP: false, // draws creep paths
        WALL: false, // highlight weakest wall and display hits
        RAMPART: false, // highlight weakest rampart and display hits
        ROAD: false, // highlight weakest road and display hits
        HEATMAP: false, // collects creep positioning to display a heatmap
        HEATMAP_INTERVAL: 2, // intervals between collections
    },
    MIN_STORAGE_ENERGY: { // prefer storing energy until reached
        1: 1000,
        2: 1000,
        3: 1000,
        4: 1000,
        5: 5000,
        6: 10000,
        7: 30000,
        8: 50000
    },
    //MAX_SELL_RANGE: 60,
    //TERMINAL_ENERGY: 100000,
    //MAX_REPAIR_LIMIT: { // Limits how high structures get repaired by towers, regarding RCL
//        1: 1000,
//        2: 1000,
//        3: 2000,
//        4: 4000,
//        5: 8000,
//        6: 15000,
//        7: 20000,
//      8: 40000
//    },
//    MAX_FORTIFY_LIMIT: { // Limits how high structures get repaired by creeps, regarding RCL
//        1: 1000,
//        2: 1000,
//        3: 2000,
//        4: 50000,
//        5: 100000,
//        6: 300000,
//        7: 750000,
//        8: 300000000
//    },
//    MAX_FORTIFY_CONTAINER: 50000,
//    LIMIT_URGENT_REPAIRING: 750, // urgent repair when hits below
//    GAP_REPAIR_DECAYABLE: 800, // decayables (e.g. roads) only get repaired when that much hits are missing
//    MEMORY_RESYNC_INTERVAL: 500, // interval to reload spawns & towers present in a room
//    TIME_REPORT: 28000, // ticks between room reports
//    REPORT_MAX_LENGTH: 500,
//    REPORTS_PER_LOOP: 18,
    SEND_STATISTIC_REPORTS: false, // Set to true to receive room statistics per mail, otherwise set to false.
    ROAD_CONSTRUCTION_ENABLE: 2, // Set to False to disable automatic road construction, or to a number to enable for owned rooms reaching that RC Level
//    ROAD_CONSTRUCTION_INTERVAL: 500,
//    ROAD_CONSTRUCTION_MIN_DEVIATION: 1.2,
//    ROAD_CONSTRUCTION_ABS_MIN: 3,
    TIME_ZONE: -8, // zone offset in hours (-12 through +12) from UTC
    USE_SUMMERTIME: true, // Please define isSummerTime in global.js to suit to your local summertime rules
//    SPAWN_DEFENSE_ON_ATTACK: true, // This will attempt to store enough to have a defense and spawn troops when invaded.
    MANAGED_CONTAINER_TRIGGER: 0.30, // managed containers get filled below this relative energy amount and emptied when above 1-this value
    ROUTE_ROOM_COST: {
        'W47N65': Infinity,
        'W48N64': Infinity,
        'W47N64': Infinity
    }, // custom room routing cost: e.g. `{ 'W4N4': 11 }`. Affects bestSpawnRoomFor, Creep.Setup calculations, and travel cost predictions. Please call 'delete Memory.routeRange;' whenever you change this property.
//    TRAVELLING_BORDER_RANGE: 22, // room arrival distance for travelling and routes
//    NOTIFICATE_INVADER: false, // Also log common 'Invader' hostiles
//    NOTIFICATE_INTRUDER: true, // Log any hostiles in your rooms
//    NOTIFICATE_HOSTILES: true, // Log any hostiles - Ignores NOTIFICATE_INTRUDER and NOTIFICATE_INVADER
//    COMBAT_CREEPS_RESPECT_RAMPARTS: false, // causes own creeps not to leave through ramparts
//    COST_MATRIX_VALIDITY: 1000,
//    CONSTRUCTION_PRIORITY: [STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_LINK,STRUCTURE_TERMINAL,STRUCTURE_STORAGE,STRUCTURE_TOWER,STRUCTURE_POWER_SPAWN,STRUCTURE_NUKER,STRUCTURE_OBSERVER,STRUCTURE_ROAD,STRUCTURE_CONTAINER,STRUCTURE_EXTRACTOR,STRUCTURE_LAB,STRUCTURE_WALL,STRUCTURE_RAMPART],
    CONTROLLER_SIGN: true,
    CONTROLLER_SIGN_MESSAGE: `Territory of ${_.chain(Game.spawns).values().first().get('owner.username').value()}, an Open Collaboration Society member! (https://github.com/ScreepsOCS)`,
    CONTROLLER_SIGN_UPDATE: true, // Update sign message if user changes CONTROLLER_SIGN_MESSAGE
    MINERS_AUTO_BUILD: true, // miners and remoteMiners will build their own containers if they are missing.
    MINER_WORK_THRESHOLD: 25, // how long to wait before a miner checks for repairs/construction sites nearby again
//    REMOTE_HAULER_MULTIPLIER: 1, // Max number of haulers spawned per source in a remote mining room.
    REMOTE_HAULER_CHECK_INTERVAL: 3, // how many ticks before we check to see if new haulers need spawninig?
//    REMOTE_RESERVE_HAUL_CAPACITY: 0.1, // Percent of allocated haul capacity before sending reservers.
    REMOTE_HAULER_REHOME: true, // May haulers choose closer storage for delivery?
    REMOTE_HAULER_MIN_LOAD: 0.85, // Haulers will return home as long as their ratio of carrying/capacity is above this amount.
    REMOTE_HAULER_MIN_WEIGHT: 900, // Small haulers are a CPU drain.
//    REMOTE_HAULER_ALLOW_OVER_CAPACITY: false, // Hauler capacity rounds up by MIN_WEIGHT, or this number value.
    REMOTE_HAULER_DRIVE_BY_BUILDING: true, // Allows remote haulers to build roads and containers. Consider setting REMOTE_WORKER_MULTIPLIER to 0.
    REMOTE_HAULER_DRIVE_BY_BUILD_RANGE: 1, // A creep's max build distance is 3 but cpu can be saved by dropping the search distance to 1.
//    REMOTE_HAULER_DRIVE_BY_BUILD_ALL: false, // If REMOTE_HAULER_DRIVE_BY_BUILDING is enabled then this option will allow remote haulers will drive-by-build any of your structures.
//    PIONEER_UNOWNED: false, // True: pioneers may attempt to work in unowned rooms.
    DRIVE_BY_REPAIR_RANGE: 1, // range that creeps should search when trying to repair and move
    REMOTE_WORKER_MULTIPLIER: 0, // Number of workers spawned per remote mining room.
    PLAYER_WHITELIST: ['cyberblast','SirLovi','Asku','Kazume','Noxeth','MrDave','Telemac','Xephael','Zoiah','fsck-u','FaceWound','forkmantis','Migaaresno','xAix1999','silentpoots','arguinyano','OokieCookie','OverlordQ','Nibinhilion','Crowsbane','Yew','BogdanBiv','s1akr','Pandabear41','Logmadr','Patrik','novice','Conquest','ofirl','GeorgeBerkeley','TTR','tynstar','K-C','Hoekynl','Sunri5e','AgOrange','distantcam','Lisp','bbdMinimbl','Twill','Logxen','miR','Spedwards','Krazyfuq','Icesory','chobobobo','deft-code','mmmd','DKPlugins','pavelnieks','buckley310','almaravarion','SSH','Perrytheplatypus','Jnesselr','ryagas','xXtheguy52Xx','SEATURTLEKING','DasBrain','C00k1e_93','Currency', 'Bovius','Vykook','shedletsky','Aranatha','Montblanc'],
    // Don't attack. Must be a member of OCS for permanent whitelisting in git repository. But you can change your own copy... Please ask if you are interested in joining OCS :)
    DEFENSE_BLACKLIST: [], // Don't defend those rooms (add room names). Blocks spawning via defense task (will not prevent offensive actions at all)
//    CRITICAL_BUCKET_LEVEL: 1000, // take action when the bucket drops below this value to prevent the bucket from actually running out
//    CRITICAL_BUCKET_OVERFILL: 200, // Overfill the bucket by this amount before disabling CPU throttle, this can reduce thrashing because all creeps try to act at once
    CRITICAL_ROLES: [
        'melee',
        'ranger',
        'healer',
        'miner',
        'hauler',
        'upgrader' ], // when the bucket drops below the critical bucket level only these creep roles will be executed
//    OBSERVER_OBSERVE_RANGE: 3, // the range for observers to look at
//    OBSERVER_PRIORITISE_HIGHWAY: true, // the observers will look at highways first
//    OBSERVER_OBSERVE_HIGHWAYS_ONLY: true, // the observers will only look at highways - changing this will require you to clear cached rooms
//    AUTO_POWER_MINING: false, //set to false to disable power mining (recomended until 1-2 RCL8+ rooms)
//    MAX_AUTO_POWER_MINING_FLAGS: 1,
//    POWER_MINE_LOG: true, //displays power mining info in console
};
module.exports = mod;
