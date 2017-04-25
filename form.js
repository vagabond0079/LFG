'use strict';

var getMainDiv = document.getElementById('content');

function Player(username, avatar, dayYouCanGame, skillLevel, comments) {
  this.username = username;
  this.avatar = avatar;
  this.online = false;
  this.dayYouCanGame = [];
  this.skillLevel = skillLevel;
  this.comments = comments;

  this.gamesPlayed = {
    leagueOfLegends: false,
    worldOfWarcraft: false,
    callOfDuty: false,
    overwatch: false,
    battlefield1: false,
    titanfall2: false,
    mineCraft: false,
    theDivision: false,
    noMansSky: false,
  };

  this.gamerTags = {
    steam:'',
    origin:'',
    battlenet:'',
    leagueOfLegends: '',
    uplay:'',
    xboxLive:'',
    playStationNetwork:'',
  };
}
Player.prototype.daysOfWeek = function(){
  console.log('daysOfWeek running');
  var daysOfWeek = document.getElementsByClassName('gamingDays');
  for(i = 0; i < daysOfWeek.lenght; i++){
    console.log('checkboxes work',daysOfWeek[i].checked);
    if(daysOfWeek[i].checked){
      this.dayYouCanGame.push(daysOfWeek[i].value);
    }
  }
};
var registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', handleRegisterPlayer);
//function handling player registration
function handleRegisterPlayer(event) {
  event.preventDefault();
  var getTarget = event.target;

  var playerUserName = getTarget.userName.value;
  var playerSkillLevel = getTarget.skillLevel.value;
  var playerGamingDays = getTarget.dayYouCanGame.value;

  console.log('player days work', playerGamingDays);
  var playerList;

  //Checking if the Players localStorage DB exists
  try {
    playerList = JSON.parse(localStorage.playerList);
    console.log('it exists');
  } catch(error){
    console.log('error');
  }
  if(playerList){
    console.log('again');
    playerList.push(new Player(playerUserName, playerSkillLevel, playerGamingDays));
  } else {
    playerList = [new Player(playerUserName, playerSkillLevel, playerGamingDays)];
  }

  localStorage.playerList = JSON.stringify(playerList);
  console.log(playerUserName);

}

//Section for the sigin logic
function signIn(playerSignInName) {
  try {
    var playerList = JSON.parse(localStorage.playerList);
  } catch(error){
    console.log('error: ' + error);
  }
  var matched = false;

  for(var i = 0; i < playerList.length && !matched; i++){
    if(playerSignInName == playerList[i].userName){
      console.log('match');
      matched = true;
    } else {
      console.log('no match');
    }
  }
}

//function to display the login screen
function SignInBoxCreate() {
  getMainDiv.innerHTML = '';
  var signInBoxcreate = document.createElement('div');
  signInBoxcreate.className = 'sign-in-box';
  var signInLabelCreate = document.createElement('label');
  signInLabelCreate.innerHTML = 'sample';
  signInBoxcreate.appendChild(signInLabelCreate);

  getMainDiv.appendChild(signInBoxcreate);
}
  //function to display the register and sign in buttons on the main site
function mainPageLoad() {
  var registerSignBox = document.createElement('div');
  registerSignBox.className = 'registerSignInButtons';

  var registerButtonCreate = document.createElement('button');
  registerButtonCreate.setAttribute('id', 'registerButton');
  registerButtonCreate.className = 'buttons';
  registerButtonCreate.innerHTML = 'Register';
  registerSignBox.appendChild(registerButtonCreate);

  var signInButtonCreate = document.createElement('button');
  signInButtonCreate.setAttribute('id', 'signInButton');
  signInButtonCreate.className = 'buttons';
  signInButtonCreate.innerHTML = 'Sign In';
  registerSignBox.appendChild(signInButtonCreate);

  // getMainDiv.appendChild(registerSignBox);
}
mainPageLoad();

//event listeners
var signInButtonClick = document.getElementById('signInButton');
// signInButtonClick.addEventListener('click', SignInBoxCreate);
