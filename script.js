

////////////////////////////////////////////////////////////////////////
//////////                  Variables                        ///////////
////////////////////////////////////////////////////////////////////////

// Variables to keep track of the game
var hoursLeft = 110;
var name = 'Nick';
var round = 1;
var warrant = false;
var rank = 'Gumshoe'

// Sets up the stats box of the game
document.getElementById('player').innerHTML = name;
document.getElementById('rank').innerHTML = rank;
$('#time-remaining').html(hoursLeft);

// Win/Loss check changes the time and checks to see if the player has
// lost or won
function winLossCheck(){
  if(round === 6 && hoursLeft >= 0){
    $('#time-remaining').html(100);
    $('#location').html(office.stats_box);
    $('#city').html(office.picture_tile);
    document.getElementById('location-pic').src = office.picture;
    $('#info-title').html(office.info_title);
    $('#info-text').html('Good job, Dt. ' + name + '.  You caught ' + suspect16.name + '!');
    $('#crime-scene').html('');
    $('#witness').html('');
    $('#local-police').html('');
    rank = 'Private Eye';
    $('rank').html(rank);
  }else if(hoursLeft < 2){
    $('#time-remaining').html(0);
    $('#location').html(office.stats_box);
    $('#city').html(office.picture_tile);
    document.getElementById('location-pic').src = office.picture;
    $('#info-title').html(office.info_title);
    $('#info-text').html("Next time I'm sending Dt. Nick ... You performed terribly");
    $('#crime-scene').html('');
    $('#witness').html('');
    $('#local-police').html('');
  }else{
    $('#time-remaining').html(hoursLeft)
  }
}

// NewGame creates a random guilty suspect and sets the starting location.
function newGame(){
  guiltySuspect = allSuspects[Math.floor(Math.random()*20)];
  office.changeAll();
}

// Sets up GoogleMaps (not my code)
function initialize() {
var mapCanvas = document.getElementById('map');
var mapOptions = {
  center: new google.maps.LatLng(34, -118.24),
  zoom: 8,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map = new google.maps.Map(mapCanvas, mapOptions)
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
var suspect1 = new Suspect('suspect1','female','black','brownn','baseball cap','motorcycle');
var suspect2 = new Suspect('suspect2','male','black','hazel','baseball cap','hummer');
var suspect3 = new Suspect('suspect3','female','black','brownn','puppy','hoverboard');
var suspect4 = new Suspect('suspect4','male','black','brownn','scarf','convertible');

var suspect5 = new Suspect('suspect5','female','brown','brownn','scarf','prius');
var suspect6 = new Suspect('suspect6','male','brown','blue','glasses','prius');
var suspect7 = new Suspect('suspect7','female','brown','brownn','scarf','convertible');
var suspect8 = new Suspect('suspect8','male','brown','hazel','glasses','motorcycle');

var suspect9 = new Suspect('suspect9','female','brown','hazel','earings','hoverboard');
var suspect10 = new Suspect('suspect10','male','brown','blue','baseball cap','convertible');
var suspect11 = new Suspect('suspect11','female','brown','brownn','baseball cap','convertible');
var suspect12 = new Suspect('suspect12','male','brown','brownn','glasses','motorcycle');

var suspect13 = new Suspect('suspect13','female','red','brownn','puppy','motorcycle');
var suspect14 = new Suspect('suspect14','male','red','blue','puppy','hoverboard');
var suspect15 = new Suspect('suspect15','female','blond','blue','earings','hummer');
var suspect16 = new Suspect('suspect16','male','blond','brownn','earings','prius');

var suspect17 = new Suspect('suspect17','female','blond','brownn','glasses','hummer');
var suspect18 = new Suspect('suspect18','male','white','blue','earings','prius');
var suspect19 = new Suspect('suspect19','female','white','brownn','scarf','hoverboard');
var suspect20 = new Suspect('suspect20','male','white','brownn','puppy','hummer');

// Variables for the set of all remaining suspects and the guilt suspect
var allSuspects = [suspect1,suspect2,suspect3,suspect4,suspect5,suspect6,suspect7,suspect8,suspect9,suspect10,suspect11,suspect12,suspect13,suspect14,suspect15,suspect16,suspect17,suspect18,suspect19,suspect20];
var guiltySuspect = '';

// When an attribute is clicked, the strikethru class is toggled.
$('.attribute').click(function(){
  $(this).toggleClass('strikethru');
  $(this).toggleClass('attribute');
})

// Check if suspect fits parameters
function attributeCheck(){
  var availableAttributes = []
  for(i=0;i<$('.attribute').length;i++){
    availableAttributes.push($('.attribute').eq(i).html())
  }
  return availableAttributes;
}

// FilterSuspects takes the user's suspect paramenters and prints all
// suspects that may be guilty
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

// When the 'Search Database' button is clicked, the function runs
// filterSuspects and prints possibleSuspects to the search database app
$('#cdsubmit').click(function(){
  $('#crim-database-results').css('display', 'block');
  $('#crim-database').css('display', 'none');
  $('#possible-suspects').html(filterSuspects());
})
$('#back').click(function(){
  $('#crim-database-results').css('display', 'none');
  $('#crim-database').css('display', 'block');
})



////////////////////////////////////////////////////////////////////////
//////////                  Locations                        ///////////
////////////////////////////////////////////////////////////////////////

// City constuctor with cities
function City(stats_box, picture_tile, picture, info_title, info_text, inv1, inv1_title, inv1_text, inv1_notes, inv2, inv2_title, inv2_text, inv2_notes, inv3, inv3_title, inv3_text, inv3_notes, crimescene, cs_tile, reqRound){
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
  this.changeAll = function(){
    $('#location').html(this.stats_box);
    $('#city').html(this.picture_tile);
    document.getElementById('location-pic').src = this.picture;
    $('#info-title').html(this.info_title);
    $('#info-text').html(this.info_text);
    $('#crime-scene').html(this.investigate1);
    $('#witness').html(this.investigate2);
    $('#local-police').html(this.investigate3);
    hoursLeft -= 10;
    winLossCheck();
  };
  this.crimeScene = function(){
    $('#city').html(this.crimeSceneTile);
    document.getElementById('location-pic').src = this.crimeScenePic;
    $('#info-title').html(this.investigate1Title);
    if(this.requiredRound <= round){
      $('#info-text').html(this.investigate1Text);
      findEmpty().html(this.investigateNotes1);
    }else{
      $('#info-text').html("This place is pretty cool, but no evidence of NCS tomfoolery.");
    }
    hoursLeft -= 2;
    winLossCheck();
  }
  this.witness = function(){
    $('#info-title').html(this.investigate2Title);
    if(this.requiredRound <= round){
      $('#info-text').html(this.investigate2Text);
      findEmpty().html(this.investigateNotes2);
    }else{
      $('#info-text').html("Isn't " + this.stats_box + ' a sweet city?');
    }
    hoursLeft -= 2;
    winLossCheck();
  }

  this.localPolice = function(){
    $('#info-title').html(this.investigate3Title);
    if(this.requiredRound <= round){
      $('#info-text').html(this.investigate3Text);
      findEmpty().html(this.investigateNotes3);
    }else{
      $('#info-text').html("Are you investigating the National Crime Syndicate? I'm so relieved that they haven't hit " + this.stats_box + ' yet!');
    }
    hoursLeft -= 2;
    winLossCheck();
  }
}
var office = new City('The Office', 'The Office', 'images/non-cities/detectives-office.jpg', 'The Office', 'Welcome Dt. ' + name + ' to Nick Castañeda’s javascript reproduction of Carmen Sandiego.  My name is Dt.  Catchemall  and I need your help.  The dastardly criminals of the Notorious Crime Syndicate have been stealing precious artifacts in cities all over the world.  I need you to scour the globe looking for evidence that will help you identify the members of the NCS.  You’ll need to use your smartphone and brain to find clues, so make sure both are in working order.  Your first mission is to find the criminal that stole Mt. Rushmore.  The suspect was last seen in the largest city of Kenya.  Call me if you need help.');
var losangeles = new City('Los Angeles', 'Los Angeles, US', 'images/losangeles.jpg', 'Los Angeles, United States', 'Los Angeles is a great fucking city.','Check out Griffith Observatory','Griffith Observatory','OMG!!!! You caught Suspect 16 trying to steal the telescope from Griffith Observatory!  Good fucking job.','','Talk to a local','Nick Castañeda: ','Did you know that flammable and inflammable mean the same thing?','','Visit the local police office','Police Officer:','I just got a call from the Griffith Observatory. Something shady is going on there.','','images/losangeles-griffith.jpg','Griffith Observatory',5);
//var guadalajara = new City('Guadalajara', 'Guadalajara, MX', 'images/guadalajara.jpg', 'Guadalajara, Mexico', 'guadalajara Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
var nairobi = new City('Nairobi', 'Nairobi, KE', 'images/nairobi.jpg', 'Nairobi, Kenya', 'Nairobi is the capital of the Republic of Kenya and is the 12th most populated city in all of Africa.  The city is home to the headquarters of the United Nations Environment Programme, the Nairobi Securities Exchange, and Nairobi National Park, the world’s only game reserve located entirely within a major city.','Investigate the Nairobi National Park','Nairobi National Park','After searching the nature reserve for clues, you find two tire tracks leaving the park.','Suspect’s vehicle left 2 tire tracks.','Interview the park groundskeeper','Groundskeeper: ','I overheard the suspect talking about visiting a city that is situated by an important waterway connecting the Mediterranean Sea to the Black Sea.','Second city between the Mediterranean and Black Seas.','Exchange information with local police','Police Station','Those NCS goons kidnapped all of our rhinos! We got some intel that the poacher didn’t have brown hair.','Suspect’s hair is not brown.','images/nairobi-park.jpg','Nairobi National Park',1);
//var barcelona = new City('Barcelona', 'Barcelona, ES', 'images/barcelona.jpg', 'Barcelona, Spain', 'barcelona Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
var jakarta = new City('Jakarta', 'Jakarta, ID', 'images/jakarta.jpg', 'Jakarta, Indonesia', 'Jakarta has been an important economic center throughout much of the last couple millennia.  The city was established as the central trading port of the Kingdom of Sunda and it became the de facto capital of the Dutch East India Company.  Jakarta is home to the Istiqlal Mosque, Taman Mini Indonesia Indah, and Merdeka Square, the largest city square in the world (by some definitions). Jakarta makes up a large portion of the Jabodetabek Metropolitan Area, which is the second most populous urban area after Keihin in Japan.','Visit Taman Mini Indonesia Indah','Taman Mini Indonesia Indah','The Taman Mini Indonesia Indah is a recreational area that celebrates Indonesian history and the diversity of its culture.  At the center is a lake with a miniaturized Indonesian Archipelago … or at least there used to be.  Someone from the N.C.S. must have drained the lake.  You find an empty container of hair bleach and an empty tube of black hair dye.','Found bleach and black hair dye','Speak with Imam of Pangeran Diponegoro Mosque','Imam:','As I was closing up the mosque last night, I overheard the suspect talking about flying to a country that borders Bolivia.','The country of the fourth city borders Bolivia.','Meet with the Indonesian National Police','Police Captain:','After the NCS hooligan drained the Taman Mini lake, we interviewed people at the park.  A few people mentioned a suspicious person with jet black hair and a shirt stained with black dye.','Suspect spotted with black hair and a stained shirt.','images/jakarta-taman.jpg','Taman Mini Indonesia Indah',3);
var istanbul = new City('Istanbul', 'Istanbul, TR', 'images/istanbul.jpg', 'Istanbul, Turkey', 'Due to its strategic position on a straight separating the Mediterranean and Black Seas, Istanbul has been a important city throughout history.  It began as a greek city-state named Byzantium, and for over a thousand years it was the capital of the Byzantine Empire under the name Constantinople.  In 1454 it was conquered by the Turks and became Istanbul, the capital of the Ottoman Empire.  Istanbul is one of the major cultural and artistic centers of Europe.  It is home to the Haggia Sophia, the Pera Museum, and the Grand Bazaar, the oldest covered market in the world.','Investigate the Grand Bazaar', 'Grand Bazaar','You journey through the labyrinth of stores searching for any clues.  One of the shopkeepers gave you a piece of paper with the following written on it: “Ben çarşı soygunu hakkında bazı bilgiler var: Şüpheli şapka giyiyor değildi.”','Şüpheli şapka giyiyor değildi.','Speak with student from the University of Istanbul.','University Student:','I was doing some weekend shopping when I saw the criminal robbing the bazaar, I looked the suspect in the eyes and said “what you’re doing is wrong!” The suspect ran away, but I’ll never forget those brown eyes.','Suspect’s eyes are brown.','Talk to the local authorities','Istanbul Cop:','The N.C.S. has struck again; the suspect stole the wares of over a hundred local businesses!  We picked up some chatter that the suspect was traveling to the second most populous metropolitan area in the world.','The third city is part of the 2nd largest metro area','images/istanbul-bazaar.jpg','The Grand Bazaar',2);
var santiago = new City('Santiago','Santiago, CL','images/santiago.jpg', 'Santiago, Chile', 'Santiago is a great city,  has the gran torre and the catedral','Inspect Catedral de Santiago de Compostela','Catedral de Santiago de Compostela','Spray painted Notorious Crime Syndicate on walls.  Found an earring on the ground.','Found earring at crime scene.','Speak with businesswoman','Businesswoman:','The suspect dropped an earring when fleeing','Final city ancestral home of the Chumash People','Visit the local police office','Police Cadet:','El jefe me dijo que tengamos prueba que el criminal no es una mujer.','El criminal no es una mujer.','images/santiago-cat.jpg','Catedral de Santiago de Compostela',4);

// Travel functions
$('#los-angeles').click(function(){
  losangeles.changeAll();
});
$('#guadalajara').click(function(){
  guadalajara.changeAll();
});
$('#nairobi').click(function(){
  nairobi.changeAll();
});
$('#barcelona').click(function(){
  barcelona.changeAll();
});
$('#jakarta').click(function(){
  jakarta.changeAll();
});
$('#istanbul').click(function(){
  istanbul.changeAll();
});
$('#santiago').click(function(){
  santiago.changeAll();
})

// Click functions for investigating
$('#crime-scene').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      nairobi.crimeScene();break;
    case 'Istanbul':
      istanbul.crimeScene();break;
    case 'Jakarta':
      jakarta.crimeScene();break;
    case 'Santiago':
      santiago.crimeScene();break;
    case 'Los Angeles':
      if(round === 5){round ++;}
      losangeles.crimeScene();break;
  }
})
$('#witness').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      if(round === 1){round ++;}
      nairobi.witness();break;
    case 'Istanbul':
      istanbul.witness();break;
    case 'Jakarta':
      if(round === 3){round ++;}
      jakarta.witness();break;
    case 'Santiago':
      if(round === 4){round ++;}
      santiago.witness();break;
    case 'Los Angeles':
      losangeles.witness();break;
  }
})
$('#local-police').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      nairobi.localPolice();break;
    case 'Istanbul':
      if(round === 2){round ++;}
      istanbul.localPolice();break;
    case 'Jakarta':
      jakarta.localPolice();break;
    case 'Santiago':
      santiago.localPolice();break;
    case 'Los Angeles':
      losangeles.localPolice();break;
  }
})

// Find empty finds a clear line in the notepad.
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

// Phone button functions
$('#phone-title').click(function(){
  $('#home').css('display', 'block');
  $('.app-display').css('display', 'none');
})
$('#1').click(function(){
  $('#home').css('display', 'none');
  $('#phone').css('display', 'block');
  console.log('hi')
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
$('#5').click(function(){
  $('#home').css('display', 'none');
  $('#youtube').css('display', 'block');
})
$('#6').click(function(){
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
  initialize();
})
$('#9').click(function(){
  $('#home').css('display', 'none');
  $('#translate').css('display', 'block');
})
$('#10').click(function(){
  $('#home').css('display', 'none');
  $('#music').css('display', 'block');
})



// At the start run these
newGame();





