

////////////////////////////////////////////////////////////////////////
//////////                  Variables                        ///////////
////////////////////////////////////////////////////////////////////////

// Sets up the stats box of the game
var hoursLeft = 100;
var name = 'Nick'
document.getElementById('player').innerHTML = name;
document.getElementById('rank').innerHTML = "Gumshoe";
$('#time-remaining').html(hoursLeft);

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
google.maps.event.addDomListener(window, 'load', initialize);


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



////////////////////////////////////////////////////////////////////////
//////////                  Locations                        ///////////
////////////////////////////////////////////////////////////////////////

// City constuctor with cities
function City(stats_box, picture_tile, picture, info_title, info_text, inv1, inv1_title, inv1_text, inv1_notes, inv2, inv2_title, inv2_text, inv2_notes, inv3, inv3_title, inv3_text, inv3_notes, crimescene, cs_tile){
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
  this.changeAll = function(){
    $('#location').html(this.stats_box);
    $('#city').html(this.picture_tile);
    document.getElementById('location-pic').src = this.picture;
    $('#info-title').html(this.info_title);
    $('#info-text').html(this.info_text);
    $('#crime-scene').html(this.investigate1);
    $('#witness').html(this.investigate2);
    $('#local-police').html(this.investigate3);
  };
  this.crimeScene = function(){
    $('#city').html(this.crimeSceneTile);
    document.getElementById('location-pic').src = this.crimeScenePic;
    $('#info-title').html(this.investigate1Title);
    $('#info-text').html(this.investigate1Text);
    $('#n1').html(this.investigateNotes1);
  }
  this.witness = function(){
    $('#info-title').html(this.investigate2Title);
    $('#info-text').html(this.investigate2Text);
    $('#n2').html(this.investigateNotes2);
  }
  this.localPolice = function(){
    $('#info-title').html(this.investigate3Title);
    $('#info-text').html(this.investigate3Text);
    $('#n3').html(this.investigateNotes3);
  }
}
var office = new City('The Office', 'Los Angeles, US', 'images/non-cities/detectives-office.jpg', 'The Office', 'Welcome Dt. ' + name + ' to Nick Castañeda’s javascript reproduction of Carmen Sandiego.  My name is Dt.  Catchemall  and I need your help.  The dastardly criminals of the Notorious Crime Syndicate have been stealing precious artifacts in cities all over the world.  I need you to scour the globe looking for evidence that will help you identify the members of the NCS.  You’ll need to use your smartphone and brain to find clues, so make sure both are in working order.  Your first mission is to find the criminal that stole Mt. Rushmore.  The suspect was last seen in the largest city of Kenya.  Call me if you need help.')
var losangeles = new City('Los Angeles', 'Los Angeles, US', 'images/griffith.jpg', 'Los Angeles, United States', 'losangeles Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var guadalajara = new City('Guadalajara', 'Guadalajara, MX', 'images/guadalajara.jpg', 'Guadalajara, Mexico', 'guadalajara Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var nairobi = new City('Nairobi', 'Nairobi, KE', 'images/nairobi.jpg', 'Nairobi, Kenya', 'Nairobi is the capital of the Republic of Kenya and is the 12th most populated city in all of Africa.  The city is home to the headquarters of the United Nations Environment Programme, the Nairobi Securities Exchange, and Nairobi National Park, the world’s only game reserve located entirely within a major city.','Investigate the Nairobi National Park','Nairobi National Park','After searching the nature reserve for clues, you find an auto-insurance card for a Prius.','Found insurance card for Prius','Interview the park groundskeeper','Groundskeeper: ','I overheard the suspect talking about visiting a city that used to be named Constantinople.','Second city once named Constantinople','Exchange information with local police','Police Station','Those NCS goons kidnapped all of our rhinos! We got some intel that the poacher didn’t have brown hair.','Suspect’s hair is not brown.','images/nairobi-park.jpg','Nairobi National Park')
var barcelona = new City('Barcelona', 'Barcelona, ES', 'images/barcelona.jpg', 'Barcelona, Spain', 'barcelona Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var jakarta = new City('Jakarta', 'Jakarta, ID', 'images/jakarta.jpg', 'Jakarta, Indonesia', 'jakarta Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var istanbul = new City('Istanbul', 'Istanbul, TR', 'images/istanbul.jpg', 'Istanbul, Turkey', 'istanbul Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

// Travel functions (Could be shortened with changeAll function)
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

// Click functions for investigating
$('#crime-scene').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      nairobi.crimeScene();break;
  }
})
$('#witness').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      nairobi.witness();break;
  }
})
$('#local-police').click(function(){
  switch($('#location').html()){
    case 'Nairobi':
      nairobi.localPolice();break;
  }
})


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
$('#2').click(function(){
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
$('#8').click(function(){
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



// At the start run these
newGame();





