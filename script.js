

////////////////////////////////////////////////////////////////////////
//////////                  Variables                        ///////////
////////////////////////////////////////////////////////////////////////

// Sets up the stats box of the game
document.getElementById('player').innerHTML = name;
document.getElementById('rank').innerHTML = "Gumshoe";

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
var suspect1 = new Suspect('suspect1','female','black','brown','baseball cap','motorcycle');
var suspect2 = new Suspect('suspect2','male','black','hazel','baseball cap','hummer');
var suspect3 = new Suspect('suspect3','female','black','brown','puppy','hoverboard');
var suspect4 = new Suspect('suspect4','male','black','brown','scarf','convertible');

var suspect5 = new Suspect('suspect5','female','brown','brown','scarf','prius');
var suspect6 = new Suspect('suspect6','male','brown','blue','glasses','prius');
var suspect7 = new Suspect('suspect7','female','brown','brown','scarf','convertible');
var suspect8 = new Suspect('suspect8','male','brown','hazel','glasses','motorcycle');

var suspect9 = new Suspect('suspect9','female','brown','hazel','earings','hoverboard');
var suspect10 = new Suspect('suspect10','male','brown','blue','baseball cap','convertible');
var suspect11 = new Suspect('suspect11','female','brown','brown','baseball cap','convertible');
var suspect12 = new Suspect('suspect12','male','brown','brown','glasses','motorcycle');

var suspect13 = new Suspect('suspect13','female','red','brown','puppy','motorcycle');
var suspect14 = new Suspect('suspect14','male','red','blue','puppy','hoverboard');
var suspect15 = new Suspect('suspect15','female','blonde','earings','glasses','hummer');
var suspect16 = new Suspect('suspect16','male','blonde','earings','glasses','prius');

var suspect17 = new Suspect('suspect17','female','blonde','brown','glasses','hummer');
var suspect18 = new Suspect('suspect18','male','white','blue','earings','prius');
var suspect19 = new Suspect('suspect19','female','white','brown','scarf','hoverboard');
var suspect20 = new Suspect('suspect20','male','white','brown','puppy','hummer');

// Variables for the set of all remaining suspects and the guilt suspect
var allSuspects = [suspect1,suspect2,suspect3,suspect4,suspect5,suspect6,suspect7,suspect8,suspect9,suspect10,suspect11,suspect12,suspect13,suspect14,suspect15,suspect16,suspect17,suspect18,suspect19,suspect20];
var guiltySuspect = '';

// Function to get guilty suspect
function newGame(){
  var randomSuspect = '';
}



////////////////////////////////////////////////////////////////////////
//////////                  Locations                        ///////////
////////////////////////////////////////////////////////////////////////

// City constuctor with cities
function City(stats_box, picture_tile, picture, info_title, info_text){
  this.stats_box = stats_box;
  this.picture_tile = picture_tile;
  this.picture = picture;
  this.info_title = info_title;
  this.info_text = info_text;
  this.changeAll = function(){
    $('#location').html(this.stats_box);
    $('#city').html(this.picture_tile);
    document.getElementById('location-pic').src = this.picture;
    $('#info-title').html(this.info_title);
    $('#info-text').html(this.info_text);
  };
}
var losangeles = new City('Los Angeles', 'Los Angeles, US', 'images/griffith.jpg', 'Los Angeles, United States', 'losangeles Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var guadalajara = new City('Guadalajara', 'Guadalajara, MX', 'images/guadalajara.jpg', 'Guadalajara, Mexico', 'guadalajara Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var nairobi = new City('Nairobi', 'Nairobi, KE', 'images/nairobi.jpg', 'Nairobi, Kenya', 'nairobi Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var barcelona = new City('Barcelona', 'Barcelona, ES', 'images/barcelona.jpg', 'Barcelona, Spain', 'barcelona Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var jakarta = new City('Jakarta', 'Jakarta, ID', 'images/jakarta.jpg', 'Jakarta, Indonesia', 'jakarta Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
var istanbul = new City('Istanbul', 'Istanbul, TR', 'images/istanbul.jpg', 'Istanbul, Turkey', 'istanbul Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

// Travel functions (Could be shortened with changeAll function)
$('#los-angeles').click(function(){
  $('#location').html(losangeles.stats_box);
  $('#city').html(losangeles.picture_tile);
  document.getElementById('location-pic').src = losangeles.picture;
  $('#info-title').html(losangeles.info_title);
  $('#info-text').html(losangeles.info_text);
});
$('#guadalajara').click(function(){
  $('#location').html(guadalajara.stats_box);
  $('#city').html(guadalajara.picture_tile);
  document.getElementById('location-pic').src = guadalajara.picture;
  $('#info-title').html(guadalajara.info_title);
  $('#info-text').html(guadalajara.info_text);
});
$('#nairobi').click(function(){
  $('#location').html(nairobi.stats_box);
  $('#city').html(nairobi.picture_tile);
  document.getElementById('location-pic').src = nairobi.picture;
  $('#info-title').html(nairobi.info_title);
  $('#info-text').html(nairobi.info_text);
});
$('#barcelona').click(function(){
  $('#location').html(barcelona.stats_box);
  $('#city').html(barcelona.picture_tile);
  document.getElementById('location-pic').src = barcelona.picture;
  $('#info-title').html(barcelona.info_title);
  $('#info-text').html(barcelona.info_text);
});
$('#jakarta').click(function(){
  $('#location').html(jakarta.stats_box);
  $('#city').html(jakarta.picture_tile);
  document.getElementById('location-pic').src = jakarta.picture;
  $('#info-title').html(jakarta.info_title);
  $('#info-text').html(jakarta.info_text);
});
$('#istanbul').click(function(){
  $('#location').html(istanbul.stats_box);
  $('#city').html(istanbul.picture_tile);
  document.getElementById('location-pic').src = istanbul.picture;
  $('#info-title').html(istanbul.info_title);
  $('#info-text').html(istanbul.info_text);
});
//



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

losangeles.changeAll();






