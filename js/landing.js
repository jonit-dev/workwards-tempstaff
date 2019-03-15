$(function () {

  /*#############################################################|
  |                        CONTENT
  *##############################################################*/

  //track page visit

  if (config['mode'] === 'prod') {
    mixpanel.track(`${config['ideaname']}_landing_visit`);
  }


  // Render config variables

  $("#headline").html(config['headline']);
  $("#subtitle").html(config['subtitle']);


  //mobile mockups

  $("#first-mobile-mockup").attr('src', config['first-mobile-mockup']);
  $("#second-mobile-mockup").attr('src',config['second-mobile-mockup']);
  $("#third-mobile-mockup").attr('src',config['third-mobile-mockup']);
  $("#fourth-mobile-mockup").attr('src',config['fourth-mobile-mockup']);


  //Content

  $("#second-mobile-title").html(config['second-mobile-title']);
  $("#second-mobile-description").html(config['second-mobile-description']);

  $("#third-mobile-title").html(config['third-mobile-title']);
  $("#third-mobile-description").html(config['third-mobile-description']);


  $("#fourth-mobile-title").html(config['fourth-mobile-title']);
  $("#fourth-mobile-description").html(config['fourth-mobile-description']);


  $('#footer-headline').html(config['footer-headline']);
  $('#footer-subtitle').html(config['footer-subtitle']);


  /*#############################################################|
  |                   LEAD CAPTURE - FIREBASE
  *##############################################################*/

  // Initialize Firebase
  var fbConfig = {
    apiKey: "AIzaSyCKoTsCn7PTkYovhlyYqzE_J06O4buX3XI",
    authDomain: "startuplabs-fad9b.firebaseapp.com",
    databaseURL: "https://startuplabs-fad9b.firebaseio.com",
    projectId: "startuplabs-fad9b",
    storageBucket: "startuplabs-fad9b.appspot.com",
    messagingSenderId: "212588329820"
  };
  firebase.initializeApp(fbConfig);

  //Connecting to database
  const fbDatabase = firebase.database();

  $("#joinWaitlist").on("click", function (e) {

    e.preventDefault();

    let email = $("#userEmail").val();


    /* Validation =========================================== */

    if (!email || !Validate.isEmailValid(email)) {

      UI.showAlert('negative', 'Oops!', "Please enter a valid e-mail!");
      return false;

    }

    /* Adding to database =========================================== */

    fbDatabase.ref(`emails/${config['ideaname']}`).push(email).then(function () {

      if (config['mode'] === 'prod') {
        mixpanel.track(`${config['ideaname']}_joined_waitlist`);
        console.log('Mixpanel: joined_waitlist event tracked');
      }

      UI.showAlert('positive', 'Thank you!', "You've successfully joined our waitlist!");

      setTimeout(() => {
        $(".close-modal").click()
      }, 5000);

      console.log(`${email} successfully joined waitlist!`);


    }).catch((err) => {

      UI.showAlert('negative', 'Oops!', "An error occurred while trying to join our waitlist. Please contact joaopaulofurtado@live.com");

      console.log(err);

    });


  });

});


