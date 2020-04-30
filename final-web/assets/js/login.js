(function(api){
  $(document).ready(function(){

    // sign-in
    $("#signInButton").click(function(){
      var params = {
        username: $('#username').val(),
        password: $('#password').val()
      };

      $.post(`${api}/sign-in`, params, function success(res){
        window.localStorage.setItem('user', JSON.stringify(res.data));
        window.location = '/index.html'
      }).catch(function error(err) {
        $('#login-alert').html(err.hasOwnProperty('responseJSON') ? err.responseJSON.msg : 'Sign up failed');
        $('#login-alert').removeClass('d-none');
      })
    });

    // sign-up
    $('#signUpButton').click(function(){

      var newUser = {
        username: $('#username').val(),
        password: $('#password').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        birthdate: $('#birthdate').val(),
        email: $('#email').val(),
        memo: $('#memo').val(),
      }
      console.log(newUser);

      $.post(`${api}/sign-up`, newUser, function success(res){
          window.localStorage.setItem('user', JSON.stringify(res.data));
          // alert(res.msg);
          window.location = '/index.html'
      }).catch(function error (err) {
        $('#login-alert').html(err.hasOwnProperty('responseJSON') ? err.responseJSON.msg : 'Sign up failed');
        $('#login-alert').removeClass('d-none');
      })
    });

  });
})('http://mypet-server.herokuapp.com');
// })('http://localhost:8000');
