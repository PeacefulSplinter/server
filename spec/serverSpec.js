describe("User Sign-Up", function() {
  var UserCtrl = require('../db/User/userController');
  var username;
  var password;

  beforeEach(function() {
    username = 'Steven';
    password = 'superGreatPassword';
  });

  it("should populate user_data object with username from clientside", function() {
    UserCtrl.signUpUser();
    expect(user_data.username).toEqual('Steven');
  });

  it("should populate user_data object with password from clientside", function() {
    UserCtrl.signUpUser();
    expect(user_data.password).toEqual('superGreatPassword');
  });

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });
});
