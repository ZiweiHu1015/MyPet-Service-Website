$(function() {
    $(document).on('click', '.navButton', function(event) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 2000);

        event.preventDefault();
    });

    $(document).on('click', '.navLi', function(event) {
        $('.navLi').removeClass('active');
        $(this).addClass('active');
    });

});

(function(api){
  $(document).ready(function(){

    // sign-out
    $('#signOutButton').click(function(){
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('pets');
      window.location = '/html/login.html'
    });

    // auth
    var user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = 'html/login.html'
    }
    // set token
    $.ajaxSetup({
      headers:{"Authorization": user.token},
    });
    // query

    function refreshData() {
      $.get(`${api}/pets`, function(res, status) {
        window.localStorage.setItem('pets', JSON.stringify(res.data));
        // clear old data
        var dataGridBody = $('#pet-data-grid').find('tbody');
        dataGridBody.html('');
        // overload pets data
        $(res.data).each(function (idx, ele){
            var tr = '<tr>' +
                `<td class="align-middle">${ idx + 1 }</td>` +
                `<td class="align-middle">${ele.name}</td>` +
                `<td class="align-middle">${ele.gender}</td>` +
                `<td class="align-middle">${ele.age}</td>` +
                `<td class="align-middle">${ele.species}</td>` +
                `<td class="align-middle text-center">` +
                `   <button class="btn btn-sm btn-info" title="edit" data-toggle="modal" data-target="#petFormModal" data-title="Edit" data-id="${ele._id}" data-index="${idx}">Edit</button>` +
                `   <button class="btn btn-sm btn-danger" title="delete" onclick="toDeletePet(event, ${idx})">Del</button>` +
                '</td>' +
            '</tr>';
            dataGridBody.append(tr);
        });
      });

      $.get(`${api}/users`, function(res, status) {
        window.localStorage.setItem('users', JSON.stringify(res.data));
        // clear old data
        var dataGridBody = $('#user-list').find('tbody');
        dataGridBody.html('');
        // overload pets data
        $(res.data).each(function (idx, ele){
            var tr = '<tr>' +
                `<td class="align-middle">${ idx + 1 }</td>` +
                `<td class="align-middle">${ele.username}</td>` +
                `<td class="align-middle">${ele.firstname}</td>` +
                `<td class="align-middle">${ele.lastname}</td>` +
                `<td class="align-middle">${ele.birthdate}</td>` +
                `<td class="align-middle">${ele.email}</td>` +
                `<td class="align-middle">${ele.memo}</td>` +
                `<td class="align-middle text-center">` +
                `   <button class="btn btn-sm btn-info" title="edit" data-toggle="modal" data-target="#userFormModal" data-title="Edit" data-id="${ele._id}" data-index="${idx}">Edit</button>` +
                `   <button class="btn btn-sm btn-danger" title="delete" onclick="toDeleteUser(event, ${idx})">Del</button>` +
                '</td>' +
            '</tr>';
            dataGridBody.append(tr);
        });
      });

    }

    refreshData();

    // The form-modal, used to edit pet data.
    $('#petFormModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget);
      var modal  = $('#petFormModal');
      var modalTitle  = button.data('title');
      var dataId = button.data('id');
      var modalIndex = Number(button.data('index'));
      // Use above variables to manipulate the DOM
      modal.find('.modal-title').text(modalTitle + ' pet data');

      if (dataId) {
        // Edit
        var pets = JSON.parse(window.localStorage.getItem('pets'));
        var editOne = pets[modalIndex];
        modal.find('.modal-body #pet-name').val(editOne.name);
        modal.find('.modal-body #pet-gender').val(editOne.gender);
        modal.find('.modal-body #pet-age').val(editOne.age);
        modal.find('.modal-body #pet-species').val(editOne.species);
        $('#pet-form-modal-submit').on('click', function(){
            toSavePet(dataId);
            refreshData();
            modal.modal('hide')
        });
      } else {
        // Add
        modal.find('.modal-body #pet-name').val('');
        modal.find('.modal-body #pet-gender').val('');
        modal.find('.modal-body #pet-age').val('');
        modal.find('.modal-body #pet-species').val('');
        $('#pet-form-modal-submit').on('click', function(){
            toSavePet();
            refreshData();
            modal.modal('hide');
        });
      }
    });

    function toSavePet(id) {
      var pet = {
        name: $('#pet-name').val(),
        gender: $('#pet-gender').val(),
        age: $('#pet-age').val(),
        species: $('#pet-species').val()
      };
      console.log(`>> id:  `, id);
      if (id) {
        // Edit
        pet._id = id;
        $.ajax({
          url: `${api}/pets`,
          data: pet,
          dataType: 'json',
          method: 'patch'
        }).done(function(data, status) {
          refreshData();
        });
      } else {
        // Add
        $.post(`${api}/pets`, pet,function(data, status) {
          refreshData();
        });
      }
    }

    window.toDeletePet = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var pets = JSON.parse(window.localStorage.getItem('pets'));
          var deleteOne = pets[idx];
          console.log(">> Delete ", deleteOne.name);
          $.ajax({
            url: `${api}/pets/${deleteOne._id}`,
            method: 'delete'
          }).done(function(data, status) {
            refreshData();
          });
      }
    }

    $('#userFormModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget);
      var modal  = $('#userFormModal');
      var modalTitle  = button.data('title');
      var dataId = button.data('id');
      var modalIndex = Number(button.data('index'));
      // Use above variables to manipulate the DOM
      modal.find('.modal-title').text(modalTitle + ' user data');

      if (dataId) {
        // Edit
        var users = JSON.parse(window.localStorage.getItem('users'));
        var editOne = users[modalIndex];
        modal.find('.modal-body #username').val(editOne.username);
        modal.find('.modal-body #firstname').val(editOne.firstname);
        modal.find('.modal-body #lastname').val(editOne.lastname);
        modal.find('.modal-body #birthdate').val(editOne.birthdate);
        modal.find('.modal-body #email').val(editOne.email);
        modal.find('.modal-body #memo').val(editOne.memo);
        $('#user-form-modal-submit').on('click', function(){
            toSaveUser(dataId);
            refreshData();
            modal.modal('hide')
        });
      } else {
        // Add
        modal.find('.modal-body #username').val('');
        modal.find('.modal-body #firstname').val('');
        modal.find('.modal-body #lastname').val('');
        modal.find('.modal-body #birthdate').val('');
        modal.find('.modal-body #email').val('');
        modal.find('.modal-body #memo').val('');
        $('#pet-form-modal-submit').on('click', function(){
            toSaveUser();
            refreshData();
            modal.modal('hide');
        });
      }
    });

    function toSaveUser(id) {
      var u = {
        username: $('#username').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        birthdate: $('#birthdate').val(),
        email: $('#email').val(),
        memo: $('#memo').val()
      };
      console.log(`>> id:  `, id);
      if (id) {
        // Edit
        u._id = id;
        $.ajax({
          url: `${api}/users`,
          data: u,
          dataType: 'json',
          method: 'patch'
        }).done(function(data, status) {
          refreshData();
        });
      } else {
        // Add
        $.post(`${api}/users`, u,function(data, status) {
          refreshData();
        });
      }
    }

    window.toDeleteUser = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var users = JSON.parse(window.localStorage.getItem('users'));
          var deleteOne = users[idx];
          console.log(">> Delete ", deleteOne.username);
          $.ajax({
            url: `${api}/users/${deleteOne._id}`,
            method: 'delete'
          }).done(function(data, status) {
            refreshData();
          });
      }
    }

  });
})('http://localhost:8000');
