import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 真实的azgames.io游戏数据
const realGamesData = `https://azgames.io/wacky-flip	https://azgames.io/upload/cache/upload/imgs/wackyflip-m298x300.webp	Wacky Flip
https://azgames.io/curve-rush	https://azgames.io/upload/cache/upload/imgs/curverush2-m144x144.webp	Curve Rush
https://azgames.io/escape-road	https://azgames.io/upload/cache/upload/imgs/escaperoad-m298x300.webp	Escape Road
https://azgames.io/traffic-road	https://azgames.io/upload/cache/upload/imgs/trafficroad-m144x144.webp	Traffic Road
https://azgames.io/escape-road-2	https://azgames.io/upload/cache/upload/imgs/escaperoad21-m144x144.webp	Escape Road 2
https://azgames.io/chill-guy-clicker	https://azgames.io/upload/cache/upload/imgs/chillguyclicker3-m144x144.webp	Chill Guy Clicker
https://azgames.io/tap-road	https://azgames.io/upload/cache/upload/imgs/taproad-m144x144.webp	Tap Road
https://azgames.io/escape-road-city-2	https://azgames.io/upload/cache/upload/imgs/escaperoadcity2-m144x144.webp	Escape Road City 2
https://azgames.io/slope-2	https://azgames.io/upload/cache/upload/imgs/slope2-m144x144.webp	Slope 2
https://azgames.io/jetski-race	https://azgames.io/upload/cache/upload/imgs/flippyrace-m144x144.webp	Jetski Race
https://azgames.io/head-soccer-2024	https://azgames.io/upload/cache/upload/imgs/thumbnail_90x90-m144x144.webp	Head Soccer 2024
https://azgames.io/snow-road	https://azgames.io/upload/cache/upload/imgs/snowroad-m144x144.webp	Snow Road
https://azgames.io/temple-run-2	https://azgames.io/upload/cache/upload/imgs/templerun22-m144x144.webp	Temple Run 2
https://azgames.io/slope-3	https://azgames.io/upload/cache/upload/imgs/slope1-m144x144.webp	Slope 3
https://azgames.io/escape-road-halloween	https://azgames.io/upload/cache/upload/imgs/escaperoadhalloween-m144x144.webp	Escape Road Halloween
https://azgames.io/subway-surfers	https://azgames.io/upload/cache/upload/imgs/subwaysurfers-m144x144.webp	Subway Surfers
https://azgames.io/escape-road-winter	https://azgames.io/upload/cache/upload/imgs/escaperoadwinter-m144x144.webp	Escape Road Winter
https://azgames.io/stickman-hook	https://azgames.io/upload/cache/upload/imgs/stickmanhook-m144x144.webp	Stickman Hook
https://azgames.io/astro-robot-clicker	https://azgames.io/upload/cache/upload/imgs/astrorobotclicker-m144x144.webp	Astro Robot Clicker
https://azgames.io/snow-road-3d	https://azgames.io/upload/cache/upload/imgs/snowroad3d4-m144x144.webp	Snow Road 3D
https://azgames.io/ragdoll-hit-stickman	https://azgames.io/upload/cache/upload/imgs/ragdollhitstickman1-m144x144.webp	Ragdoll Hit Stickman
https://azgames.io/supermarket-master	https://azgames.io/upload/cache/upload/imgs/supermarket_master_s2-m144x144.webp	Supermarket Master
https://azgames.io/drift-hunters	https://azgames.io/upload/cache/upload/imgs/drifthunters-m144x144.webp	Drift Hunters
https://azgames.io/tube-fall	https://azgames.io/upload/cache/upload/imgs/tubefall-m144x144.webp	Tube Fall
https://azgames.io/drive-mad	https://azgames.io/upload/cache/upload/imgs/drivemad-m144x144.webp	Drive Mad
https://azgames.io/geometry-dash	https://azgames.io/upload/cache/upload/imgs/logo_of_geometry_dash.svg-m144x144.webp	Geometry Dash
https://azgames.io/brain-lines	https://azgames.io/upload/cache/upload/imgs/brainlines-m144x144.webp	Brain Lines
https://azgames.io/minecraft	https://azgames.io/upload/cache/upload/imgs/minecraft-m144x144.webp	Minecraft
https://azgames.io/sugar-sugar	https://azgames.io/upload/cache/upload/imgs/sugarsugar1-m144x144.webp	Sugar Sugar
https://azgames.io/moto-x3m	https://azgames.io/upload/cache/upload/imgs/moto-x3m-m144x144.webp	Moto X3M
https://azgames.io/head-basketball	https://azgames.io/upload/cache/upload/imgs/headbasketball-m144x144.webp	Head Basketball
https://azgames.io/traffic-rally	https://azgames.io/upload/cache/upload/imgs/trafficrally-m144x144.webp	Traffic Rally
https://azgames.io/traffic-jam-3d	https://azgames.io/upload/cache/upload/imgs/trafficjam3d-m144x144.webp	Traffic Jam 3D
https://azgames.io/color-rush	https://azgames.io/upload/cache/upload/imgs/colorrush2-m144x144.webp	Color Rush
https://azgames.io/basket-random	https://azgames.io/upload/cache/upload/imgs/basketrandom-m144x144.webp	Basket Random
https://azgames.io/sprunki-clicker	https://azgames.io/upload/cache/upload/imgs/sprunkiclicker-m144x144.webp	Sprunki Clicker
https://azgames.io/gun-mayhem	https://azgames.io/upload/cache/upload/imgs/gunmayhem2-m144x144.webp	Gun Mayhem
https://azgames.io/basketball-stars	https://azgames.io/upload/cache/upload/imgs/basketballstarsgamelogo2-m144x144.webp	Basketball Stars
https://azgames.io/shooter-hero	https://azgames.io/upload/cache/upload/imgs/shooterhero-m144x144.webp	Shooter Hero
https://azgames.io/slope	https://azgames.io/upload/cache/upload/imgs/slope-m144x144.webp	Slope
https://azgames.io/bike-xtreme	https://azgames.io/upload/cache/upload/imgs/bikextreme11-m144x144.webp	Bike Xtreme
https://azgames.io/1v1lol	https://azgames.io/upload/cache/upload/imgs/1v1lol-m144x144.webp	1v1.Lol
https://azgames.io/titans-clicker	https://azgames.io/upload/cache/upload/imgs/titansclicker-m144x144.webp	Titans Clicker
https://azgames.io/wave-road	https://azgames.io/upload/cache/upload/imgs/waveroad-11-m144x144.webp	Wave Road
https://azgames.io/krunker	https://azgames.io/upload/cache/upload/imgs/krunker-io-m144x144.webp	Krunker
https://azgames.io/overtake-x	https://azgames.io/upload/cache/upload/imgs/overtakex-m144x144.webp	Overtake X
https://azgames.io/paper-io	https://azgames.io/upload/cache/upload/imgs/paper-io-m144x144.webp	Paper IO
https://azgames.io/sprunki	https://azgames.io/upload/cache/upload/imgs/sprunki-m144x144.webp	Sprunki
https://azgames.io/cookie-clicker	https://azgames.io/upload/cache/upload/imgs/cookieclickerthumb-m144x144.webp	Cookie Clicker
https://azgames.io/crossy-road	https://azgames.io/upload/cache/upload/imgs/crossyroad1-m144x144.webp	Crossy Road
https://azgames.io/traffic-rider	https://azgames.io/upload/cache/upload/imgs/trafficrider-m144x144.webp	Traffic Rider
https://azgames.io/smash-karts	https://azgames.io/upload/cache/upload/imgs/smash-karts-m144x144.webp	Smash Karts
https://azgames.io/run-3	https://azgames.io/upload/cache/upload/imgs/run3thumb-m144x144.webp	Run 3
https://azgames.io/stickman-racing	https://azgames.io/upload/cache/upload/imgs/stickmanracing2-m144x144.webp	Stickman Racing
https://azgames.io/paper-minecraft	https://azgames.io/upload/cache/upload/imgs/paperminecraft-m144x144.webp	Paper Minecraft
https://azgames.io/bricky-blast	https://azgames.io/upload/cache/upload/imgs/brickyblast-m144x144.webp	Bricky Blast
https://azgames.io/scary-wheels	https://azgames.io/upload/cache/upload/imgs/scarywheels1-m144x144.webp	Scary Wheels
https://azgames.io/narrow-one	https://azgames.io/upload/cache/upload/imgs/narrow-one-m144x144.webp	Narrow One
https://azgames.io/knock-balls	https://azgames.io/upload/cache/upload/imgs/knockballs-m144x144.webp	Knock Balls
https://azgames.io/shell-shockers	https://azgames.io/upload/cache/upload/imgs/shell-shockers-m144x144.webp	Shell Shockers
https://azgames.io/retro-bowl	https://azgames.io/upload/cache/upload/imgs/retro-bowl-m144x144.webp	Retro Bowl
https://azgames.io/slope-snowball	https://azgames.io/upload/cache/upload/imgs/slopesnowball-m144x144.webp	Slope Snowball
https://azgames.io/escape-road-city	https://azgames.io/upload/cache/upload/imgs/icon-m144x144.webp	Escape Road City
https://azgames.io/mountain-road	https://azgames.io/upload/cache/upload/imgs/mountainroad-m144x144.webp	Mountain Road
https://azgames.io/venge-io	https://azgames.io/upload/cache/upload/imgs/venge2-m144x144.webp	Venge IO
https://azgames.io/monkey-mart	https://azgames.io/upload/cache/upload/imgs/monkeymart-m144x144.webp	Monkey Mart
https://azgames.io/hockey-random	https://azgames.io/upload/cache/upload/imgs/hockeyrandom1-m144x144.webp	Hockey Random
https://azgames.io/tunnel-ball	https://azgames.io/upload/cache/upload/imgs/tunnelball-m144x144.webp	Tunnel Ball
https://azgames.io/vex-3	https://azgames.io/upload/cache/upload/imgs/vex3v-m144x144.webp	Vex 3
https://azgames.io/drift-boss	https://azgames.io/upload/cache/upload/imgs/drift-boss-m144x144.webp	Drift Boss
https://azgames.io/speed-shooter	https://azgames.io/upload/cache/upload/imgs/speedshooter-m144x144.webp	Speed Shooter
https://azgames.io/snake-arena	https://azgames.io/upload/cache/upload/imgs/snakearena-m144x144.webp	Snake Arena
https://azgames.io/fireboy-and-watergirl	https://azgames.io/upload/cache/upload/imgs/fireboy-watergirl-1-m144x144.webp	Fireboy And Watergirl
https://azgames.io/ragdoll-playground	https://azgames.io/upload/cache/upload/imgs/ragdollplayground-m144x144.webp	Ragdoll Playground
https://azgames.io/escape-jump	https://azgames.io/upload/cache/upload/imgs/escapejump1-m144x144.webp	Escape Jump
https://azgames.io/space-road	https://azgames.io/upload/cache/upload/imgs/spaceroad-m144x144.webp	Space Road
https://azgames.io/smashy-road	https://azgames.io/upload/cache/upload/imgs/smashyroad-m144x144.webp	Smashy Road
https://azgames.io/tetris	https://azgames.io/upload/cache/upload/imgs/tetristhumb-m144x144.webp	Tetris
https://azgames.io/suika-game	https://azgames.io/upload/cache/upload/imgs/suikagame-m144x144.webp	Suika Game
https://azgames.io/shooter-sky	https://azgames.io/upload/cache/upload/imgs/shootersky3-m144x144.webp	Shooter Sky
https://azgames.io/trap-the-cat	https://azgames.io/upload/cache/upload/imgs/trap-the-cat-m144x144.webp	Trap The Cat
https://azgames.io/1v1soccerio	https://azgames.io/upload/cache/upload/imgs/1200x1200-m144x144.webp	1v1soccer.Io
https://azgames.io/pacman-30th-anniversary	https://azgames.io/upload/cache/upload/imgs/pacman-m144x144.webp	Pacman 30th Anniversary
https://azgames.io/chill-girl-clicker	https://azgames.io/upload/cache/upload/imgs/chillgirlclicker-m144x144.webp	Chill Girl Clicker
https://azgames.io/power-surfer	https://azgames.io/upload/cache/upload/imgs/powersurfer1-m144x144.webp	Power Surfer
https://azgames.io/2048	https://azgames.io/upload/cache/upload/imgs/2048-m144x144.webp	2048
https://azgames.io/chill-guy-clicker-3d	https://azgames.io/upload/cache/upload/imgs/chillguyclicker3d-m144x144.webp	Chill Guy Clicker 3D
https://azgames.io/tap-rush	https://azgames.io/upload/cache/upload/imgs/taprush2-m144x144.webp	Tap Rush
https://azgames.io/bricky-break	https://azgames.io/upload/cache/upload/imgs/brickybreak-m144x144.webp	Bricky Break
https://azgames.io/unchill-guy-clicker	https://azgames.io/upload/cache/upload/imgs/unchillguy3-m144x144.webp	Unchill Guy Clicker
https://azgames.io/dark-loop	https://azgames.io/upload/cache/upload/imgs/darkloop-m144x144.webp	Dark Loop
https://azgames.io/ziggy-road	https://azgames.io/upload/cache/upload/imgs/ziggyroad1-m144x144.webp	Ziggy Road
https://azgames.io/escape-vehicles	https://azgames.io/upload/cache/upload/imgs/escapevehicles-m144x144.webp	Escape Vehicles
https://azgames.io/zombie-strike	https://azgames.io/upload/cache/upload/imgs/zombiestrike2-m144x144.webp	Zombie Strike
https://azgames.io/highway-heat	https://azgames.io/upload/cache/upload/imgs/highwayheat1-m144x144.webp	Highway Heat
https://azgames.io/idle-gold-miner	https://azgames.io/upload/cache/upload/imgs/idlegoldminer-m144x144.webp	Idle Gold Miner
https://azgames.io/kong-adventure	https://azgames.io/upload/cache/upload/imgs/kong-adventure-m144x144.webp	Kong Adventure
https://azgames.io/jelly-hop	https://azgames.io/upload/cache/upload/imgs/jellyhop1-m144x144.webp	Jelly Hop
https://azgames.io/battle-karts	https://azgames.io/upload/cache/upload/imgs/battlekarts-m144x144.webp	Battle Karts
https://azgames.io/fury-chase	https://azgames.io/upload/cache/upload/imgs/furychase-m144x144.webp	Fury Chase
https://azgames.io/duck-clicker	https://azgames.io/upload/cache/upload/imgs/duckclicker1-m144x144.webp	Duck Clicker
https://azgames.io/bottle-jump	https://azgames.io/upload/cache/upload/imgs/bottlejump2-m144x144.webp	Bottle Jump
https://azgames.io/italian-brainrot-clicker-2	https://azgames.io/upload/cache/upload/imgs/italianbrainrotclicker3-m144x144.webp	Italian Brainrot Clicker 2
https://azgames.io/golf-hit	https://azgames.io/upload/cache/upload/imgs/golfhit2-m144x144.webp	Golf Hit
https://azgames.io/chicken-jockey-clicker	https://azgames.io/upload/cache/upload/imgs/chickenjockeyclicker-m144x144.webp	Chicken Jockey Clicker
https://azgames.io/wing-smash	https://azgames.io/upload/cache/upload/imgs/wingsmash-m144x144.webp	Wing Smash
https://azgames.io/stellar-burner	https://azgames.io/upload/cache/upload/imgs/stellarburner1-m144x144.webp	Stellar Burner
https://azgames.io/egg-race	https://azgames.io/upload/cache/upload/imgs/eggrace1-m144x144.webp	Egg Race
https://azgames.io/loop-breakout	https://azgames.io/upload/cache/upload/imgs/loopbreakout1-m144x144.webp	Loop Breakout
https://azgames.io/flying-kong	https://azgames.io/upload/cache/upload/imgs/flyingkong1-m144x144.webp	Flying Kong
https://azgames.io/wyrmdash	https://azgames.io/upload/cache/upload/imgs/wyrmdash-m144x144.webp	Wyrmdash
https://azgames.io/omnom-jump	https://azgames.io/upload/cache/upload/imgs/omnomjump11-m144x144.webp	Omnom Jump
https://azgames.io/tung-sahur-clicker	https://azgames.io/upload/cache/upload/imgs/tungsahurclicker2-m144x144.webp	Tung Sahur Clicker
https://azgames.io/eggy-car	https://azgames.io/upload/cache/upload/imgs/eggycar-m144x144.webp	Eggy Car
https://azgames.io/zombie-rising	https://azgames.io/upload/cache/upload/imgs/zombierising1-m144x144.webp	Zombie Rising
https://azgames.io/drift-road	https://azgames.io/upload/cache/upload/imgs/driftroad-m144x144.webp	Drift Road
https://azgames.io/chicken-jockey-combat	https://azgames.io/upload/cache/upload/imgs/chickenjockeycombat1-m144x144.webp	Chicken Jockey Combat
https://azgames.io/2048-drop	https://azgames.io/upload/cache/upload/imgs/2048drop2-m144x144.webp	2048 Drop
https://azgames.io/crazy-animal-city	https://azgames.io/upload/cache/upload/imgs/crazyanimalcity2-m144x144.webp	Crazy Animal City
https://azgames.io/block-slide	https://azgames.io/upload/cache/upload/imgs/blockslide1-m144x144.webp	Block Slide
https://azgames.io/turbo-street	https://azgames.io/upload/cache/upload/imgs/turbostreet-m144x144.webp	Turbo Street
https://azgames.io/run-3d	https://azgames.io/upload/cache/upload/imgs/512x5121-m144x144.webp	Run 3D
https://azgames.io/bitlife	https://azgames.io/upload/cache/upload/imgs/bitlifegamebanner1-m144x144.webp	Bitlife
https://azgames.io/spear-warzone	https://azgames.io/upload/cache/upload/imgs/spearwazone-m144x144.webp	Spear Warzone
https://azgames.io/orbit-dash	https://azgames.io/upload/cache/upload/imgs/orbitdash-m144x144.webp	Orbit Dash
https://azgames.io/rebound-shooter	https://azgames.io/upload/cache/upload/imgs/reboundshooter-m144x144.webp	Rebound Shooter
https://azgames.io/ski-frenzy	https://azgames.io/upload/cache/upload/imgs/skifrenzy1-m144x144.webp	Ski Frenzy
https://azgames.io/tung-sahur-horror	https://azgames.io/upload/cache/upload/imgs/tungsahurhorror1-m144x144.webp	Tung Sahur Horror
https://azgames.io/blocky-overtake-x	https://azgames.io/upload/cache/upload/imgs/512x512-logo-m144x144.webp	Blocky Overtake X
https://azgames.io/2048-italian-brainrot	https://azgames.io/upload/cache/upload/imgs/2048italian3-m144x144.webp	2048 Italian Brainrot
https://azgames.io/sprunki-jump	https://azgames.io/upload/cache/upload/imgs/sprunkijump-m144x144.webp	Sprunki Jump
https://azgames.io/snow-rider-3d	https://azgames.io/upload/cache/upload/imgs/snow-rider-3d-m144x144.webp	Snow Rider 3D
https://azgames.io/breakout-racing	https://azgames.io/upload/cache/upload/imgs/breakoutracing1-m144x144.webp	Breakout Racing
https://azgames.io/mars-jump	https://azgames.io/upload/cache/upload/imgs/marsjump1-m144x144.webp	Mars Jump
https://azgames.io/dino-dash-3d	https://azgames.io/upload/cache/upload/imgs/dinodash3d1-m144x144.webp	Dino Dash 3D
https://azgames.io/street-wheelie	https://azgames.io/upload/cache/upload/imgs/streetwheelie-m144x144.webp	Street Wheelie
https://azgames.io/chill-clicker	https://azgames.io/upload/cache/upload/imgs/chillclicker1-m144x144.webp	Chill Clicker
https://azgames.io/crazy-mouse-battle	https://azgames.io/upload/cache/upload/imgs/crazymousebattle-m144x144.webp	Crazy Mouse Battle
https://azgames.io/tiny-fishing	https://azgames.io/upload/cache/upload/imgs/tinyfishing-m144x144.webp	Tiny Fishing
https://azgames.io/forest-mouse	https://azgames.io/upload/cache/upload/imgs/forestmouse-m144x144.webp	Forest Mouse
https://azgames.io/tralalero-tralala-clicker	https://azgames.io/upload/cache/upload/imgs/tralalerotralalaclicker1-m144x144.webp	Tralalero Tralala Clicker
https://azgames.io/duck-life	https://azgames.io/upload/cache/upload/imgs/ducklife-m144x144.webp	Duck Life
https://azgames.io/blocky-hunter	https://azgames.io/upload/cache/upload/imgs/blockyhunter-m144x144.webp	Blocky Hunter
https://azgames.io/cuby-road	https://azgames.io/upload/cache/upload/imgs/cubyroad-m144x144.webp	Cuby Road
https://azgames.io/temple-runner	https://azgames.io/upload/cache/upload/imgs/templerun2-m144x144.webp	Temple Runner
https://azgames.io/bombardino-crocodilo-clicker	https://azgames.io/upload/cache/upload/imgs/bombardinocrocodiloclicker-m144x144.webp	Bombardino Crocodilo Clicker
https://azgames.io/subway-santa	https://azgames.io/upload/cache/upload/imgs/subwaysanta-m144x144.webp	Subway Santa
https://azgames.io/white-horizon	https://azgames.io/upload/cache/upload/imgs/whitehorizon-m144x144.webp	White Horizon
https://azgames.io/town-run	https://azgames.io/upload/cache/upload/imgs/town-run-m144x144.webp	Town Run
https://azgames.io/cuby-road-halloween	https://azgames.io/upload/cache/upload/imgs/cubyroadhalloween-m144x144.webp	Cuby Road Halloween
https://azgames.io/age-of-war	https://azgames.io/upload/cache/upload/imgs/ageofwar-m144x144.webp	Age Of War
https://azgames.io/tap-road-beat	https://azgames.io/upload/cache/upload/imgs/taproadbeat2-m144x144.webp	Tap Road Beat
https://azgames.io/papas-freezeria	https://azgames.io/upload/cache/upload/imgs/papasfreezeria-m144x144.webp	Papa's Freezeria
https://azgames.io/crazy-bull-city	https://azgames.io/upload/cache/upload/imgs/crazybullcity1-m144x144.webp	Crazy Bull City
https://azgames.io/fall-flat-battle	https://azgames.io/upload/cache/upload/imgs/fallflatbattle-m144x144.webp	Fall Flat Battle
https://azgames.io/speed-legends	https://azgames.io/upload/cache/upload/imgs/speedlegends-m144x144.webp	Speed Legends
https://azgames.io/merge-brainrot	https://azgames.io/upload/cache/upload/imgs/mergebrainrot1-m144x144.webp	Merge Brainrot
https://azgames.io/red-rush	https://azgames.io/upload/cache/upload/imgs/redrush2-m144x144.webp	Red Rush
https://azgames.io/wacky-nursery	https://azgames.io/upload/cache/upload/imgs/wackynursery1-m144x144.webp	Wacky Nursery
https://azgames.io/slope-cyber	https://azgames.io/upload/cache/upload/imgs/thumbnail_256_2-m144x144.webp	Slope Cyber
https://azgames.io/doom-rider	https://azgames.io/upload/cache/upload/imgs/doomrider2-m144x144.webp	Doom Rider
https://azgames.io/slope-emoji-2	https://azgames.io/upload/cache/upload/imgs/thumb_256x256-m144x144.webp	Slope Emoji 2
https://azgames.io/slope-legacy	https://azgames.io/upload/cache/upload/imgs/slop_legaxy-m144x144.webp	Slope Legacy
https://azgames.io/kitten-defense	https://azgames.io/upload/cache/upload/imgs/kittendefense-m144x144.webp	Kitten Defense
https://azgames.io/wacky-nursery-2	https://azgames.io/upload/cache/upload/imgs/wackynursery23-m144x144.webp	Wacky Nursery 2
https://azgames.io/slope-emoji	https://azgames.io/upload/cache/upload/imgs/thumb-256-3-m144x144.webp	Slope Emoji
https://azgames.io/slope-spooky	https://azgames.io/upload/cache/upload/imgs/slopespooky-m144x144.webp	Slope Spooky
https://azgames.io/slope-gear	https://azgames.io/upload/cache/upload/imgs/layer-1583-m144x144.webp	Slope Gear
https://azgames.io/god-simulator	https://azgames.io/upload/cache/upload/imgs/godsimulator1-m144x144.webp	God Simulator
https://azgames.io/fire-flush	https://azgames.io/upload/cache/upload/imgs/fireflush-m144x144.webp	Fire Flush
https://azgames.io/block-blast-3d	https://azgames.io/upload/cache/upload/imgs/blockblast3d1-m144x144.webp	Block Blast 3D
https://azgames.io/hill-climb-race	https://azgames.io/upload/cache/upload/imgs/thumbnail-512-m144x144.webp	Hill Climb Race
https://azgames.io/mayhem-drive	https://azgames.io/upload/cache/upload/imgs/mayhemdrive2-m144x144.webp	Mayhem Drive
https://azgames.io/arcade-volley	https://azgames.io/upload/cache/upload/imgs/arcadevolley2-m144x144.webp	Arcade Volley`;

// 解析游戏数据
function parseGameData() {
    const lines = realGamesData.trim().split('\n');
    return lines.map(line => {
        const parts = line.split('\t');
        if (parts.length !== 3) return null;
        
        const url = parts[0].trim();
        const image = parts[1].trim();
        const title = parts[2].trim();
        
        // 从URL提取游戏slug
        const slug = url.replace('https://azgames.io/', '');
        
        // 创建iframe URL
        const iframeUrl = `https://game.azgame.io/${slug}/`;
        
        // 分类游戏类型
        let category = 'Action';
        if (slug.includes('puzzle') || slug.includes('2048') || slug.includes('tetris') || slug.includes('brain') || slug.includes('sugar') || slug.includes('trap')) {
            category = 'Puzzle';
        } else if (slug.includes('basketball') || slug.includes('soccer') || slug.includes('retro-bowl') || slug.includes('golf') || slug.includes('hockey') || slug.includes('bike') || slug.includes('moto')) {
            category = 'Sports';
        } else if (slug.includes('clicker') || slug.includes('arcade') || slug.includes('tetris') || slug.includes('suika')) {
            category = 'Arcade';
        }
        
        return {
            slug,
            title,
            image,
            iframeUrl,
            category,
            url
        };
    }).filter(Boolean);
}

// 生成游戏描述
function generateDescription(title, category) {
    const templates = {
        'Action': [
            `Experience thrilling action in ${title}! Fast-paced gameplay with exciting challenges.`,
            `${title} delivers intense action gameplay with stunning visuals and engaging mechanics.`,
            `Jump into the action with ${title}! Non-stop excitement awaits.`
        ],
        'Puzzle': [
            `Challenge your mind with ${title}! Solve puzzles and test your logic skills.`,
            `${title} offers brain-teasing puzzles that will keep you thinking for hours.`,
            `Put your problem-solving skills to the test in ${title}!`
        ],
        'Sports': [
            `Experience the thrill of sports in ${title}! Compete and show your athletic skills.`,
            `${title} brings realistic sports action to your browser with engaging gameplay.`,
            `Master your sports skills in ${title}! Victory awaits the dedicated player.`
        ],
        'Arcade': [
            `Enjoy classic arcade fun with ${title}! Simple controls, endless entertainment.`,
            `${title} delivers retro arcade action with modern twists and addictive gameplay.`,
            `Relive the golden age of gaming with ${title}! Easy to learn, hard to master.`
        ]
    };
    
    const categoryTemplates = templates[category] || templates['Action'];
    return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
}

// 创建游戏文件内容
function createGameFileContent(game) {
    const description = generateDescription(game.title, game.category);
    const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)];
    const rating = (6 + Math.random() * 4).toFixed(1); // 6.0-10.0
    const pubDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    return `---
title: "${game.title}"
description: "${description}"
pubDate: ${pubDate.toISOString().split('T')[0]}
image: "${game.image}"
categories: ["${game.category}"]
featured: ${Math.random() < 0.1 ? 'true' : 'false'}
embedUrl: "${game.iframeUrl}"
gameType: "${game.category.toLowerCase()}"
difficulty: "${difficulty}"
playTime: "10-20 minutes"
popular: ${Math.random() < 0.3 ? 'true' : 'false'}
rating: ${rating}
players: "${Math.random() < 0.5 ? 'single' : 'multiplayer'}"
keywords: ["${game.slug.replace(/-/g, ' ')}", "${game.category.toLowerCase()}", "online game", "free game"]
---

# ${game.title}

${description}

## Game Features

- **Rating**: ${rating}/10
- **Category**: ${game.category}
- **Difficulty**: ${difficulty}
- **Play Time**: 10-20 minutes
- **Platform**: Browser (HTML5)

## How to Play

Click the play button above to start ${game.title}! This game runs directly in your browser - no downloads required.

## About ${game.title}

${description} Perfect for players who enjoy ${game.category.toLowerCase()} games and want to have fun online.

## Similar Games

Looking for more ${game.category.toLowerCase()} games? Check out our [${game.category} Games](/categories/${game.category.toLowerCase()}) collection for more exciting options!
`;
}

// 删除所有现有游戏文件（除了GeoGuessr相关）
async function clearExistingGames() {
    const gamesDir = path.join(__dirname, '..', 'src/content/games');
    const files = await fs.readdir(gamesDir);
    
    // 保留的GeoGuessr相关游戏
    const keepGames = [
        'openguessr.md',
        'geotastic.md', 
        'globe-guesser.md',
        'world-geography-games.md'
    ];
    
    for (const file of files) {
        if (file.endsWith('.md') && !keepGames.includes(file)) {
            const filePath = path.join(gamesDir, file);
            await fs.unlink(filePath);
            console.log(`🗑️  删除: ${file}`);
        }
    }
}

// 创建新游戏文件
async function createNewGames(games) {
    const gamesDir = path.join(__dirname, '..', 'src/content/games');
    
    for (const game of games) {
        const filename = `${game.slug}.md`;
        const filePath = path.join(gamesDir, filename);
        const content = createGameFileContent(game);
        
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`✅ 创建: ${filename}`);
    }
}

// 主函数
async function main() {
    console.log('🚀 开始用真实azgames.io数据替换游戏...\n');
    
    try {
        // 解析游戏数据
        const games = parseGameData();
        console.log(`📋 解析了 ${games.length} 个游戏\n`);
        
        // 删除现有游戏（除了GeoGuessr）
        console.log('🗑️  清理现有游戏文件...');
        await clearExistingGames();
        console.log();
        
        // 创建新游戏文件
        console.log('✨ 创建新游戏文件...');
        await createNewGames(games);
        console.log();
        
        console.log('🎉 替换完成！');
        console.log(`✅ 创建了 ${games.length} 个新游戏`);
        console.log('🔗 所有游戏现在使用 https://game.azgame.io/ iframe格式');
        console.log('🖼️  所有图片使用真实的azgames.io CDN');
        console.log('🎮 保留了4个GeoGuessr相关游戏');
        
    } catch (error) {
        console.error('💥 发生错误:', error);
    }
}

// 运行脚本
main().catch(console.error); 