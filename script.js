////////////////////////////////////////////////////////////////////////
//////////                  Variables                        ///////////
////////////////////////////////////////////////////////////////////////

// Variables to keep track of the game. Hoursleft keeps track of
// remaining time, name keeps track of the player name, round keeps
// track of game progress, warranted a var for whichever suspect the
// player has a warrant for, and rank is the current rank of the player.
var hoursLeft = 110;
var name = prompt("What's your name?");
var round = 1;
var warranted = '';
var rank = 'Gumshoe';

// Fills the stats box with the above variables.
document.getElementById('player').innerHTML = name;
document.getElementById('rank').innerHTML = rank;
$('#time-remaining').html(hoursLeft);

// Win/Loss check is executed after every travel and checks if the game
// is over.  A win occurs if the play has progress to round 6, has time
// left, and has a warrrant for the correct suspect.  It returns the
// player to the office after 5 seconds and awards the player with 1000
// hours to travel freely. If the player doesn't have the appropriate
// warrant, the player is sent to the office and is stuck there.  If
// time runs out, the same occurs. If the round isn't 6 and there's
// time left, the time left is displayed.
function winLossCheck(){
  if(round === 6 && hoursLeft >= 0 && warranted === 'Frank Sinatra'){
    setTimeout(function(){
      hoursLeft = 1000;
      $('#time-remaining').html(hoursLeft);
      $('#location').html(office.stats_box);
      $('#city').html(office.picture_tile);
      $('#characterimage').css('display','none');
      document.getElementById('location-pic').src = office.picture;
      $('#info-title').html(office.info_title);
      $('#info-text').html('Good job, Dt. ' + name + '.  You caught ' + suspect16.name + "! As a reward for you effort, we are giving you a one thousand-hour vacation.  Feel free to explore the world as much as you like.  It's on the company's dime.");
      $('#crime-scene').html('');
      $('#witness').html('');
      $('#local-police').html('');
      rank = 'Private Eye';
      $('rank').html(rank);
      round ++;
    }, 5000);
  }else if(round === 6 && hoursLeft >= 0 && warranted !== 'Frank Sinatra'){
    setTimeout(function(){
      $('#time-remaining').html(0);
      $('#location').html(office.stats_box);
      $('#city').html(office.picture_tile);
      $('#characterimage').css('display','none');
      document.getElementById('location-pic').src = office.picture;
      $('#info-title').html(office.info_title);
      $('#info-text').html("Next time I'm sending Dt. Castañeda ... You can't arrest a NCS goon withouth an arrest warrant!");
      $('#crime-scene').html('');
      $('#witness').html('');
      $('#local-police').html('');
    }, 5000);
  }else if(hoursLeft < 2){
    setTimeout(function(){
      $('#time-remaining').html(0);
      $('#location').html(office.stats_box);
      $('#city').html(office.picture_tile);
      $('#characterimage').css('display','none');
      document.getElementById('location-pic').src = office.picture;
      $('#info-title').html(office.info_title);
      $('#info-text').html("Next time I'm sending Dt. Castañeda ... You're way too slow!");
      $('#crime-scene').html('');
      $('#witness').html('');
      $('#local-police').html('');
    }, 1000);
  }else{
    $('#time-remaining').html(hoursLeft)
  }
}

// NewGame creates a random guilty suspect and sets the starting
// location.  The randomness isn't implemented become the game currently
// only has one level.
function newGame(){
  guiltySuspect = allSuspects[Math.floor(Math.random()*20)];
  office.changeAll();
}

////////////////////////////////////////////////////////////////////////
//////////              Criminals and Suspects                //////////
////////////////////////////////////////////////////////////////////////

// This is the constructor for the suspects.  It's used to create 20
// crime suspects
function Suspect(name, sex, hair, eyes, feature, vehicle){
  this.name = name;
  this.sex = sex;
  this.hair = hair;
  this.eyes = eyes;
  this.feature = feature;
  this.vehicle = vehicle;
}
var suspect1 = new Suspect('Madonna','female','black','brownn','baseball cap','motorcycle');
var suspect2 = new Suspect('Paul McCartney','male','black','hazel','baseball cap','hummer');
var suspect3 = new Suspect('Rihanna','female','black','brownn','puppy','hoverboard');
var suspect4 = new Suspect('Michael Jackson','male','black','brownn','scarf','convertible');
var suspect5 = new Suspect('Mariah Carey','female','brown','brownn','scarf','prius');
var suspect6 = new Suspect('Elton John','male','brown','blue','glasses','prius');
var suspect7 = new Suspect('Celine Dion','female','brown','brownn','scarf','convertible');
var suspect8 = new Suspect('Eminem','male','brown','hazel','glasses','motorcycle');
var suspect9 = new Suspect('Whitney Houston','female','brown','hazel','earings','hoverboard');
var suspect10 = new Suspect('Garth Brooks','male','brown','blue','baseball cap','convertible');
var suspect11 = new Suspect('Taylor Swift','female','brown','brownn','baseball cap','convertible');
var suspect12 = new Suspect('Billy Joel','male','brown','brownn','glasses','motorcycle');
var suspect13 = new Suspect('Barbra Streisand','female','red','brownn','puppy','motorcycle');
var suspect14 = new Suspect('Phil Collins','male','red','blue','puppy','hoverboard');
var suspect15 = new Suspect('Britney Spears','female','blond','blue','earings','hummer');
var suspect16 = new Suspect('Frank Sinatra','male','blond','brownn','earings','prius');
var suspect17 = new Suspect('Lady Gaga','female','blond','brownn','glasses','hummer');
var suspect18 = new Suspect('Kanye West','male','white','blue','earings','prius');
var suspect19 = new Suspect('Janet Jackson','female','white','brownn','scarf','hoverboard');
var suspect20 = new Suspect('Bruce Springsteen','male','white','brownn','puppy','hummer');

// Array for the set of all remaining suspects and guilty suspect var,
// which I'm pretty sure isn't used.
var allSuspects = [suspect1,suspect2,suspect3,suspect4,suspect5,suspect6,suspect7,suspect8,suspect9,suspect10,suspect11,suspect12,suspect13,suspect14,suspect15,suspect16,suspect17,suspect18,suspect19,suspect20];
var guiltySuspect = '';

// This function returns an array of all the suspect attributes that are
// not striked by the user.
function attributeCheck(){
  var availableAttributes = []
  for(i=0;i<$('.attribute').length;i++){
    availableAttributes.push($('.attribute').eq(i).html())
  }
  return availableAttributes;
}

// FilterSuspects takes takes the non-striked attributes using the above
// function, declares an array of all the suspects, and declares an
// empty string.  The first for-loop goes through each suspect.  It sets
// a counter and contains a nested for-loop, which compares the
// suspect's attributes to the non-stikes attributes. If none of the
// suspect's attributes are striked, the counter hits 5 and the suspect
// is added to the empty string. Lastly the func returns the string.
function filterSuspects(){
  var possibleSuspects = allSuspects;
  var possibleSuspectsString = '';
  checkArray = attributeCheck();
  for(i=0;i<possibleSuspects.length;i++){
    var counter = 0
    for(j=0;j<checkArray.length;j++){
      if(possibleSuspects[i].sex === checkArray[j].toLowerCase()){counter ++;}
      if(possibleSuspects[i].hair === checkArray[j].toLowerCase()){counter ++;}
      if(possibleSuspects[i].eyes === checkArray[j].toLowerCase()){counter ++;}
      if(possibleSuspects[i].feature === checkArray[j].toLowerCase()){counter ++;}
      if(possibleSuspects[i].vehicle === checkArray[j].toLowerCase()){counter ++;}
    }
    if(counter === 5){
      possibleSuspectsString += possibleSuspects[i].name;
      possibleSuspectsString += ', ';
    }
  }
  return possibleSuspectsString.substring(0, possibleSuspectsString.length - 2);
}



////////////////////////////////////////////////////////////////////////
//////////                  Locations                        ///////////
////////////////////////////////////////////////////////////////////////

// This is my very ugly City constructor. It takes in all the text and
// images associated with each city and sets them to variables. It also
// creates a changeAll function that changes the city and three more
// functions that changes the html as the player investigates.  They are
// explained below.
function City(stats_box, picture_tile, picture, info_title, info_text, inv1, inv1_title, inv1_text, inv1_notes, inv2, inv2_title, inv2_text, inv2_notes, inv3, inv3_title, inv3_text, inv3_notes, crimescene, cs_tile, reqRound, cop, local){
  this.stats_box = stats_box;
  this.picture_tile = picture_tile;
  this.picture = picture;
  this.info_title = info_title;
  this.info_text = info_text;
  this.investigate1 = inv1;
  this.investigate1Title = inv1_title;
  this.investigate1Text = inv1_text;
  this.investigateNotes1 = inv1_notes;
  this.investigate2 = inv2;
  this.investigate2Title = inv2_title;
  this.investigate2Text = inv2_text;
  this.investigateNotes2 = inv2_notes;
  this.investigate3 = inv3;
  this.investigate3Title = inv3_title;
  this.investigate3Text = inv3_text;
  this.investigateNotes3 = inv3_notes;
  this.crimeScenePic = crimescene;
  this.crimeSceneTile = cs_tile;
  this.requiredRound = reqRound;
  this.cop = cop;
  this.local = local;
  // Change all runs when the player travels to a new city. It changes
  // the innerHTML of everything on the screen and of the Investigate!
  // app options. It also drains ten hours from the clock and checks if
  // the game is over.
  this.changeAll = function(){
    $('#location').html(this.stats_box);
    $('#city').html(this.picture_tile);
    document.getElementById('location-pic').src = this.picture;
    $('#characterimage').css('display','none');
    $('#info-title').html(this.info_title);
    $('#info-text').html(this.info_text);
    $('#crime-scene').html(this.investigate1);
    $('#crime-scene').removeClass('listrike');
    $('#witness').html(this.investigate2);
    $('#witness').removeClass('listrike');
    $('#local-police').html(this.investigate3);
    $('#local-police').removeClass('listrike');
    hoursLeft -= 10;
    winLossCheck();
  };
  // The crimeScene, witness, and local police functions runs when the
  // player clicks the corresponding Investigate! app option. It changes
  // the innerHTML of everything on the screen expect for the location.
  // If there is a character that talks to you it is displayed;
  // otherwise it removes any characters from a previous investiagtion.
  // Many of the cities have innerHTML that is dependant on player
  // progress, the if statement checks if the player has reached the
  // required round. Lastly, the function crosses out the Investigate!
  // option, drains two hours from the clock, and checks if the game is
  // over.
  this.crimeScene = function(){
    if($('#info-title').html() !== this.investigate1Title){
      $('#city').html(this.crimeSceneTile);
      document.getElementById('location-pic').src = this.crimeScenePic;
      $('#characterimage').css('display','none');
      $('#info-title').html(this.investigate1Title);
      if(this.requiredRound <= round){
        $('#info-text').html(this.investigate1Text);
        if(this.stats_box === "Nairobi" || this.stats_box === "Istanbul" || this.stats_box === "Jakarta" || this.stats_box === "Santiago"){
          findEmpty().html(this.investigateNotes1);
        }
      }else{
        $('#info-text').html("This place is pretty cool, but no evidence of NCS tomfoolery.");
      }
      $('#crime-scene').addClass('listrike');
      hoursLeft -= 2;
      winLossCheck();
    }
  }
  this.witness = function(){
    if($('#info-title').html() !== this.investigate2Title){
      $('#info-title').html(this.investigate2Title);
      $('#characterimage').css('display','block');
      document.getElementById('characterimage').src = this.local;
      if(this.requiredRound <= round){
        $('#info-text').html(this.investigate2Text);
        if(this.stats_box === "Nairobi" || this.stats_box === "Istanbul" || this.stats_box === "Jakarta" || this.stats_box === "Santiago"){
          findEmpty().html(this.investigateNotes2);
        }
      }else{
        $('#info-text').html("Isn't " + this.stats_box + ' a sweet city?');
      }
      $('#witness').addClass('listrike');
      hoursLeft -= 2;
      winLossCheck();
    }
  }
  this.localPolice = function(){
    if($('#info-title').html() !== this.investigate3Title){
      $('#info-title').html(this.investigate3Title);
      $('#characterimage').css('display','block');
      document.getElementById('characterimage').src = this.cop;
      if(this.requiredRound <= round){
        $('#info-text').html(this.investigate3Text);
        if(this.stats_box === "Nairobi" || this.stats_box === "Istanbul" || this.stats_box === "Jakarta" || this.stats_box === "Santiago"){
          findEmpty().html(this.investigateNotes3);
        }
      }else{
        $('#info-text').html("Are you investigating the National Crime Syndicate? I'm so relieved that they haven't hit " + this.stats_box + ' yet!');
      }
      $('#local-police').addClass('listrike');
      hoursLeft -= 2;
      winLossCheck();
    }
  }
}
// Cities created below
var office = new City('The Office', 'The Office', 'images/non-cities/detectives-office.jpg', 'The Office', 'Welcome Dt. ' + name + ' to Nick Castañeda’s javascript reproduction of  ‘Where in the World is Carmen Sandiego?’ The dastardly criminals of the Notorious Crime Syndicate have been causing mischief all over the world.  You need to scour the globe for evidence that will shed light on the identities of the N.C.S. members.  You’ll need to use your smartphone and brain to find clues, so make sure both are in working order.  There is some intel that a N.C.S. agent was recently in the most populous city of Kenya.  You have only 100 hours to nab the criminal, so call the help desk IMMEDIATELY if you’re unsure of what to do next.');
var accra = new City('Accra', 'Accra, GH', 'images/accra.jpg', 'Accra, Ghana', 'Accra is a really cool city in Ghana','Check out the Nkrumah Statue','Nkrumah Statue','This place is pretty cool, but no evidence of NCS tomfoolery.','','Talk to a local','Local','Elephants have been have been known to bury their dead.','','Visit the local police office','Police Officer:','The city is quiet today.','','images/accra-nkrumah.jpg','Nkrumah Statue',0,'images/characters/blank.gif','images/characters/blank.gif');
var barcelona = new City('Barcelona', 'Barcelona, ES', 'images/barcelona.jpg', 'Barcelona, Spain', 'Barcelona is a really cool city in Spain','Investigate Camp Nou','Camp Nou','This place is pretty cool, but no evidence of NCS tomfoolery.','','Talk to a local','Local','Els gibons no són mico; són els simis.','','Visit the local police office','Police Officer:','The city is quiet today.','','images/barcelona-camp.jpg','Camp Nou',0,'images/characters/blank.gif','images/characters/blank.gif');
var guadalajara = new City('Guadalajara', 'Guadalajara, MX', 'images/guadalajara.jpg', 'Guadalajara, México', 'Guadalajara is a really cool city in México','Visit the Teatro Degollado','Teatro Degollado','This place is pretty cool, but no evidence of NCS tomfoolery.','','Talk to a local','Local','Delfines usan silbatos específicos por nombres.','','Visit the local police office','Police Officer:','The city is quiet today.','','images/guadalajara-teatro.jpg','Teatro Degollado',0,'images/characters/blank.gif','images/characters/blank.gif');
var helsinki = new City('Helsinki', 'Helsinki, FI', 'images/helsinki.jpg', 'Helsinki, Finland', 'Helsinki is a really cool city in Finland','Explore the Suomenlinna','Suomenlinna','This place is pretty cool, but no evidence of NCS tomfoolery.','','Talk to a local','Local','Mies gorillat syövät yli 40 kiloa ruokaa päivässä.','','Visit the local police office','Police Officer:','The city is quiet today.','','images/helsinki-fortress.jpg','Suomenlinna',0,'images/characters/blank.gif','images/characters/blank.gif');
var istanbul = new City('Istanbul', 'Istanbul, TR', 'images/istanbul.jpg', 'Istanbul, Turkey', 'Due to its strategic position on a straight separating the Mediterranean and Black Seas, Istanbul has been a important city throughout history.  It began as a greek city-state named Byzantium, and for over a thousand years it was the capital of the Byzantine Empire under the name Constantinople.  In 1454 it was conquered by the Turks and became Istanbul, the capital of the Ottoman Empire.  Istanbul is one of the major cultural and artistic centers of Europe.  It is home to the Haggia Sophia, the Pera Museum, and the Grand Bazaar, the oldest covered market in the world.','Investigate the Grand Bazaar', 'Grand Bazaar','You journey through the labyrinth of stores searching for any clues.  One of the shopkeepers gave you a piece of paper with the following written on it: “Ben çarşı soygunu hakkında bazı bilgiler var: Şüpheli şapka giyiyor değildi.”','Şüpheli şapka giyiyor değildi.','Speak with student from the University of Istanbul.','University Student:','I was doing some weekend shopping when I saw the criminal robbing the bazaar, I looked the suspect in the eyes and said “what you’re doing is wrong!” The suspect ran away, but I’ll never forget those brown eyes.','Suspect’s eyes are brown.','Talk to the local authorities','Istanbul Cop:','The N.C.S. has struck again; the suspect stole the wares of over a hundred local businesses!  We picked up some chatter that the suspect was traveling to the second most populous urban area in the world.','Suspect travelled to second largest urban area.','images/istanbul-bazaar.jpg','The Grand Bazaar',2,'images/characters/istanbul-cop.png','images/characters/istanbul-local.png');
var jakarta = new City('Jakarta', 'Jakarta, ID', 'images/jakarta.jpg', 'Jakarta, Indonesia', 'Jakarta has been an important economic center throughout much of the last couple millennia.  The city was established as the central trading port of the Kingdom of Sunda and it became the de facto capital of the Dutch East India Company.  Jakarta is home to the Istiqlal Mosque, Taman Mini Indonesia Indah, and Merdeka Square, the largest city square in the world (by some definitions). Jakarta makes up a large portion of the Jabodetabek Metropolitan Area, which is the second most populous urban area after Keihin in Japan.','Visit Taman Mini Indonesia Indah','Taman Mini Indonesia Indah','The Taman Mini Indonesia Indah is a recreational area that celebrates Indonesian history and the diversity of its culture.  At the center is a lake with a miniaturized Indonesian Archipelago … or at least there used to be.  Someone from the N.C.S. must have drained the lake.  You find an empty container of hair bleach and an empty tube of black hair dye.','Found bleach and black hair dye','Speak with Imam of Pangeran Diponegoro Mosque','Imam:','As I was closing up the mosque last night, I overheard the suspect talking about flying to a country that borders Bolivia.','Suspect left for country that borders Bolivia.','Meet with the Indonesian National Police','Police Captain:','After the NCS hooligan drained the Taman Mini lake, we interviewed people at the park.  A few people mentioned a suspicious person with jet black hair and a shirt stained with black dye.','Suspect spotted with black hair and a stained shirt.','images/jakarta-taman.jpg','Taman Mini Indonesia Indah',3,'images/characters/jakarta-cop.png','images/characters/jakarta-local.png');
var losangeles = new City('Los Angeles', 'Los Angeles, US', 'images/losangeles.jpg', 'Los Angeles, United States', 'Perfect weather, beautiful beaches, In-N-Out; Los Angeles is a hell of a city.','Check out Griffith Observatory','Griffith Observatory','You caught Suspect 16 trying to steal the telescope from Griffith Observatory!  I hope you have a warrant!','','Talk to a local','Nick Castañeda: ','Did you know that flammable and inflammable mean the same thing?','','Visit the local police office','Police Officer:','I just got a call from the Griffith Observatory. Something shady is going on there.','','images/losangeles-griffith.jpg','Griffith Observatory',5,'images/characters/losangeles-cop.png','images/characters/losangeles-local.png');
var nairobi = new City('Nairobi', 'Nairobi, KE', 'images/nairobi.jpg', 'Nairobi, Kenya', 'Nairobi is the capital of the Republic of Kenya and is the 12th most populated city in all of Africa.  The city is home to the headquarters of the United Nations Environment Programme, the Nairobi Securities Exchange, and Nairobi National Park, the world’s only game reserve located entirely within a major city.','Investigate the Nairobi National Park','Nairobi National Park','After searching the nature reserve for clues, you find two tire tracks leaving the park.','Suspect’s vehicle left 2 tire tracks.','Interview the park groundskeeper','Groundskeeper: ','I overheard the suspect talking about visiting a city that is situated by an important waterway connecting the Mediterranean Sea to the Black Sea.','Goon visited city between Mediterranean and Black Seas.','Exchange information with local police','Police Station','Those NCS goons kidnapped all of our rhinos! We got some intel that the poacher didn’t have brown hair.','Suspect’s hair is not brown.','images/nairobi-park.jpg','Nairobi National Park',1,'images/characters/nairobi-cop.png','images/characters/nairobi-local.png');
var santiago = new City('Santiago','Santiago, CL','images/santiago.jpg', 'Santiago, Chile', 'Santiago is has been the capital of Chile for almost half a millennium.  The city is located two hours away from both the Andes Mountains and the Pacific Ocean.  In the last few decades the city has become a major economic center.  Santiago boasts the tallest building and the most extensive subway system in South America.','Inspect Catedral de Santiago de Compostela','Catedral de Santiago de Compostela','The 200-year-old Catedral Metropolitana de Santiago faces the historic Plaza de Armas.  Unfortunately, someone spray-painted Notorious Crime Syndicate all over its walls.  You find an suspicious earring on the ground.','Found earring at crime scene.','Speak with business owner','Business Owner:','The suspect mentioned traveling to the ancestral home of the Chumash People.','Suspect traveling to home of the Chumash.','Visit the local police office','Police Cadet:','El jefe me dijo que tenemos prueba que el criminal no es una mujer.','El criminal no es una mujer.','images/santiago-cat.jpg','Catedral de Santiago de Compostela',4,'images/characters/santiago-cop.png','images/characters/santiago-local.png');
var seoul = new City('Seoul', 'Seoul, KR', 'images/seoul.jpg', 'Seoul, Korea', 'Seoul is a really cool city in Korea','Visit Gyeongbokgung','Gyeongbokgung','This place is pretty cool, but no evidence of NCS tomfoolery.','','Talk to a local','Local','오랑우탄은 최고의 동물!','','Visit the local police office','Police Officer:','The city is quiet today.','','images/seoul-gyeongbokgung.jpg','Gyeongbokgung',0,'images/characters/blank.gif','images/characters/blank.gif');

// The flight function changes innerhtml's to display a flight screen.
function flight(){
  $('#location').html('First Class');
  $('#city').html('Stratosphere');
  document.getElementById('location-pic').src = 'images/non-cities/flight.png';
  $('#info-title').html('In Flight');
  $('#info-text').html('“The Guide says there is an art to flying", said Ford, "or rather a knack. The knack lies in learning how to throw yourself at the ground and miss.”');
  $('#characterimage').css('display','none');
}

// The travel functions are programed to run when a jetblue item is
// clicked. There is an if gate that makes sure that the player isn't
// currently in the city s/he is traveling to, that the player isn't
// currently flying, and that there is time remaining. The function runs
// the flight function and runs the city object's changeAll function
// after three seconds.
$('#accra').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Accra' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      accra.changeAll();
    }, 3000);
  }
});
$('#barcelona').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Barcelona' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      barcelona.changeAll();
    }, 3000);
  }
});
$('#guadalajara').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Guadalajara' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      guadalajara.changeAll();
    }, 3000);
  }
});
$('#helsinki').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Helsinki' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      helsinki.changeAll();
    }, 3000);
  }
});
$('#istanbul').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Istanbul' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      istanbul.changeAll();
    }, 3000);
  }
});
$('#jakarta').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Jakarta' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      jakarta.changeAll();
    }, 3000);
  }
});
$('#los-angeles').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Los Angeles' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      losangeles.changeAll();
    }, 2000);
  }
});
$('#nairobi').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Nairobi' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      nairobi.changeAll();
    }, 3000);
  }
});
$('#santiago').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Santiago' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      santiago.changeAll();
    }, 3000);
  }
});
$('#seoul').click(function(){
  if(hoursLeft > 0 && $('#location').html() !== 'Seoul' && $('#location').html() !== 'First Class'){
    flight();
    setTimeout(function(){
      seoul.changeAll();
    }, 3000);
  }
});

// These functions listen for clicks in the 'Investigate!' app. Each
// contains a switch that checks the text in the location in the info
// box. It changes innerHTMLs based on the the current city. For Los
// Angeles, the round is increased if the player finds the thief so the
// game can end.
$('#crime-scene').click(function(){
  switch($('#location').html()){
    case 'Accra':
      accra.crimeScene();break;
    case 'Barcelona':
      barcelona.crimeScene();break;
    case 'Guadalajara':
      guadalajara.crimeScene();break;
    case 'Helsinki':
      helsinki.crimeScene();break;
    case 'Istanbul':
      istanbul.crimeScene();break;
    case 'Jakarta':
      jakarta.crimeScene();break;
    case 'Los Angeles':
      if(round === 5){
        round ++;
        losangeles.crimeScene()
        $('#characterimage').css('display','block');
        document.getElementById('characterimage').src = 'images/characters/thief.png'; break;
      }else{
      losangeles.crimeScene(); break;
      }
    case 'Nairobi':
      nairobi.crimeScene();break;
    case 'Santiago':
      santiago.crimeScene();break;
    case 'Seoul':
      seoul.crimeScene();break;
  }
})
// For Jakarta, Nairobi, and Santiago, the round is increased if the
// player stumbles upon a destination clue.
$('#witness').click(function(){
  switch($('#location').html()){
    case 'Accra':
      accra.witness();break;
    case 'Barcelona':
      barcelona.witness();break;
    case 'Guadalajara':
      guadalajara.witness();break;
    case 'Helsinki':
      helsinki.witness();break;
    case 'Istanbul':
      istanbul.witness();break;
    case 'Jakarta':
      if(round === 3){round ++;}
      jakarta.witness();break;
    case 'Los Angeles':
      losangeles.witness();break;
    case 'Nairobi':
      if(round === 1){round ++;}
      nairobi.witness();break;
    case 'Santiago':
      if(round === 4){round ++;}
      santiago.witness();break;
    case 'Seoul':
      seoul.witness();break;
  }
})
// For Istanbul, the round is increased if the player stumbles upon a
// destination clue.
$('#local-police').click(function(){
  switch($('#location').html()){
    case 'Accra':
      accra.localPolice();break;
    case 'Barcelona':
      barcelona.localPolice();break;
    case 'Guadalajara':
      guadalajara.localPolice();break;
    case 'Helsinki':
      helsinki.localPolice();break;
    case 'Istanbul':
      if(round === 2){round ++;}
      istanbul.localPolice();break;
    case 'Jakarta':
      jakarta.localPolice();break;
    case 'Los Angeles':
      losangeles.localPolice();break;
    case 'Nairobi':
      nairobi.localPolice();break;
    case 'Santiago':
      santiago.localPolice();break;
    case 'Seoul':
      seoul.localPolice();break;
  }
})

// This function searches the notepad app and looks for an empty line to
// write a note. I want to find a way to return nothing if the note is
// already writen in another line.
function findEmpty(){
  if($('#n1').html() === ''){return $('#n1');}
  else if($('#n2').html() === ''){return $('#n2');}
  else if($('#n3').html() === ''){return $('#n3');}
  else if($('#n4').html() === ''){return $('#n4');}
  else if($('#n5').html() === ''){return $('#n5');}
  else if($('#n6').html() === ''){return $('#n6');}
  else if($('#n7').html() === ''){return $('#n7');}
  else if($('#n8').html() === ''){return $('#n8');}
  else if($('#n9').html() === ''){return $('#n9');}
  else if($('#n10').html() === ''){return $('#n10');}
  else if($('#n11').html() === ''){return $('#n11');}
  else if($('#n12').html() === ''){return $('#n12');}
}

////////////////////////////////////////////////////////////////////////
//////////               SmartPhone Functions                 //////////
////////////////////////////////////////////////////////////////////////

// Phone button functions:

// When you click the phone home button, the phone's home and the
// screen's image are displayed (along with the choices for wikipedia,
// but the out div is hidden).  The rest of the screens are hidden.
$('#phone-title').click(function(){
  $('#home').css('display', 'block');
  $('.app-display').css('display','none');
  $('#no-call').css('display','block');
  $('#phone-call').css('display','none');
  $('.call-screen').css('display','none');
  $('#wikichoices').css('display','block');
  $('.wikipage').css('display', 'none');
})
// These functions change the smartphone display to the the screen
// corresponding to the app.  The home display disappears.
$('#one').click(function(){
  $('#home').css('display', 'none');
  $('#phone').css('display', 'block');
})
$('#two').click(function(){
  $('#home').css('display', 'none');
  $('#crim-database').css('display', 'block');
})
$('#3').click(function(){
  $('#home').css('display', 'none');
  $('#notepad').css('display', 'block');
})
$('#4').click(function(){
  $('#home').css('display', 'none');
  $('#travel').css('display', 'block');
})
$('#five').click(function(){
  $('#home').css('display', 'none');
  $('#youtube').css('display', 'block');
})
$('#six').click(function(){
  $('#home').css('display', 'none');
  $('#investigate').css('display', 'block');
})
$('#7').click(function(){
  $('#home').css('display', 'none');
  $('#wikipedia').css('display', 'block');
})
$('#eight').click(function(){
  $('#home').css('display', 'none');
  $('#map').css('display', 'block');
})
$('#9').click(function(){
  $('#home').css('display', 'none');
  $('#translate').css('display', 'block');
})
$('#10').click(function(){
  $('#home').css('display', 'none');
  $('#music').css('display', 'block');
})

// For each phone call function, the right screen shows the text
// "calling ..." for 2.5 seconds and then displays the text of the phone
// call.
$('#call-office').click(function(){
  $('#no-call').css('display','none');
  $('.call-screen').css('display','none');
  $('#phone-call').css('display','block');
  $('#calling').css('display','block');
  setTimeout(function(){
    $('#calling').css('display','none');
    $('#office-call').css('display','block');
  }, 2500);
})
$('#call-help').click(function(){
  $('#no-call').css('display','none');
  $('.call-screen').css('display','none');
  $('#phone-call').css('display','block');
  $('#calling').css('display','block');
  setTimeout(function(){
    $('#calling').css('display','none');
    $('#help-call').css('display','block');
  }, 2500);
})
$('#call-ncs').click(function(){
  $('#no-call').css('display','none');
  $('.call-screen').css('display','none');
  $('#phone-call').css('display','block');
  $('#calling').css('display','block');
  setTimeout(function(){
    $('#calling').css('display','none');
    $('#ncs-call').css('display','block');
  }, 2500);
})
$('#call-warrant').click(function(){
  $('#no-call').css('display','none');
  $('.call-screen').css('display','none');
  $('#phone-call').css('display','block');
  $('#calling').css('display','block');
  setTimeout(function(){
    $('#calling').css('display','none');
    $('#warrant-screen').css('display','block');
  }, 2500);
})
// This function is for when the warrant call screen is displayed. When
// you hit the button the var warranted is set to the selected criminal.
$('#warrant-button').click(function(){
  warranted = document.getElementById("warrant-select").value;
  $('#warrant-screen').css('display','none');
  $('#warrant-response').css('display','block');
  $('#warrant-response').html('We have issued you a warrant for ' + warranted + '. Any previously issued warrants have been cancelled.');
})

// When an attribute is clicked, the strikethru class is toggled.
$('.attribute').click(function(){
  $(this).toggleClass('strikethru');
  $(this).toggleClass('attribute');
})

// When the 'Search Database' button is clicked, the function runs
// filterSuspects and prints possibleSuspects to the search database app
$('#cdsubmit').click(function(){
  $('#crim-database-results').css('display', 'block');
  $('#crim-database').css('display', 'none');
  $('#possible-suspects').html(filterSuspects());
})
// The back function goes back to the main database screen.
$('#back').click(function(){
  $('#crim-database-results').css('display', 'none');
  $('#crim-database').css('display', 'block');
})

// These wikipedia functions display the wikipedia iframes for their
// respective sites.
$('.art').click(function(){$('#wikichoices').css('display','none');})
$('#chumash').click(function(){$('#chumash-page').css('display','block');})
$('#emperor').click(function(){$('#emperor-page').css('display','block');})
$('#jim').click(function(){$('#jim-page').css('display','block');})
$('#urban').click(function(){$('#urban-page').css('display','block');})
$('#martin').click(function(){$('#martin-page').css('display','block');})
$('#order').click(function(){$('#order-page').css('display','block');})
$('#parapros').click(function(){$('#parapros-page').css('display','block');})
$('#potential').click(function(){$('#potential-page').css('display','block');})

// This starts the game.
newGame();





