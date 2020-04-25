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
      window.localStorage.removeItem('users');
      window.localStorage.removeItem('pets');
      window.localStorage.removeItem('articles');
      window.localStorage.removeItem('services');
      window.location = '/login.html'
    });

    // auth
    var user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = 'login.html'
    }
    // user detail
    $('#user-detail-name').text(`${user.firstname || ''} ${user.lastname || ''}`);
    $('#user-detail-birthdate').text(`${user.birthdate || ''}`);
    $('#user-detail-memo').text(`${user.memo || ''}`);
    $('#user-detail-email').attr('href', `mailto:${user.memo || ''}`);
    // set token
    $.ajaxSetup({
      headers:{"Authorization": user.token},
    });

    /**
     * Some of pet management methods.
     */
    function refreshPetData() {
      $.get(`${api}/pets/user/${user._id}`, function(res, status) {
        window.localStorage.setItem('pets', JSON.stringify(res.data));
        // clear old data
        var dataGridBody = $('#pet-data-grid').find('tbody');
        dataGridBody.html('');
        // overload pets data
        $(res.data).each(function (idx, ele){
            console.log(idx, ele._id, ele.name);
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
      })
    }

    refreshPetData();

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
            modal.modal('hide');
            $('#pet-form-modal-submit').off('click');
        });
      } else {
        // Add
        modal.find('.modal-body #pet-name').val('');
        modal.find('.modal-body #pet-gender').val('');
        modal.find('.modal-body #pet-age').val('');
        modal.find('.modal-body #pet-species').val('');
        $('#pet-form-modal-submit').on('click', function(){
            toSavePet();
            modal.modal('hide');
            $('#pet-form-modal-submit').off('click');
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

      if (id) {
        // Edit
        pet._id = id;
        $.ajax({
          url: `${api}/pets`,
          data: pet,
          dataType: 'json',
          method: 'patch'
        }).done(function(res, status) {
          console.log(">> ", res.msg);
          refreshPetData();
        });
      } else {
        // Set author
        pet.userId = user._id;
        // Add
        $.post(`${api}/pets`, pet,function(res, status) {
            console.log(">> ", res.msg);
            refreshPetData();
        });
      }
    }

    window.toDeletePet = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var pets = JSON.parse(window.localStorage.getItem('pets'));
          var deleteOne = pets[idx];

          $.ajax({
            url: `${api}/pets/${deleteOne._id}`,
            method: 'delete'
          }).done(function(res, status) {
            console.log(">> ", res.msg)
            refreshPetData();
          });
      }
    }

    /**
     * Some of article management methods.
     */

    function refreshArticleData() {
      $.get(`${api}/articles/user/${user._id}`, function(res, status) {
        window.localStorage.setItem('articles', JSON.stringify(res.data));
        // clear old data
        var dataGridBody = $('#article-data-grid').find('tbody');
        dataGridBody.html('');
        // overload articles data
        $(res.data).each(function (idx, ele){
            console.log(idx, ele._id, ele.title);
            var tr = '<tr>' +
                `<td class="align-middle">${ idx + 1 }</td>` +
                `<td class="align-middle">${ele.title}</td>` +
                `<td class="align-middle">${ele.content}</td>` +
                `<td class="align-middle">${ele.lastestAt}</td>` +
                `<td class="align-middle text-center">` +
                `   <button class="btn btn-sm btn-info" title="edit" data-toggle="modal" data-target="#articleFormModal" data-title="Edit" data-id="${ele._id}" data-index="${idx}">Edit</button>` +
                `   <button class="btn btn-sm btn-danger" title="delete" onclick="toDeleteArticle(event, ${idx})">Del</button>` +
                '</td>' +
            '</tr>';
            dataGridBody.append(tr);
        });
      })
    }

    refreshArticleData();

    // The form-modal, used to edit pet data.
    $('#articleFormModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget);
      var modal  = $('#articleFormModal');
      var modalTitle  = button.data('title');
      var dataId = button.data('id');
      var modalIndex = Number(button.data('index'));
      // Use above variables to manipulate the DOM
      modal.find('.modal-title').text(modalTitle + ' article data');

      if (dataId) {
        // Edit
        var articles = JSON.parse(window.localStorage.getItem('articles'));
        var editOne = articles[modalIndex];
        modal.find('.modal-body #article-title').val(editOne.title);
        modal.find('.modal-body #article-content').val(editOne.content);
        $('#article-form-modal-submit').on('click', function(){
            toSaveArticle(dataId);
            modal.modal('hide');
            $('#article-form-modal-submit').off('click');
        });
      } else {
        // Add
        modal.find('.modal-body #article-title').val('');
        modal.find('.modal-body #article-content').val('');
        $('#article-form-modal-submit').on('click', function(){
            toSaveArticle();
            modal.modal('hide');
            $('#article-form-modal-submit').off('click');
        });

      }
    });

    function toSaveArticle(id) {
      const now = new Date();
      var passData = {
        title: $('#article-title').val(),
        content: $('#article-content').val(),
        lastestAt: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
      };

      if (id) {
        // Edit
        passData._id = id;
        $.ajax({
          url: `${api}/articles`,
          data: passData,
          dataType: 'json',
          method: 'patch'
        }).done(function(res, status) {
          console.log(">> ", res.msg);
          refreshArticleData();
        });
      } else {
        // Set author
        passData.userId = user._id;
        // Add
        $.post(`${api}/articles`, passData,function(res, status) {
            console.log(">> ", res.msg);
            refreshArticleData();
        });
      }
    }

    window.toDeleteArticle = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var articles = JSON.parse(window.localStorage.getItem('articles'));
          var deleteOne = articles[idx];

          $.ajax({
            url: `${api}/articles/${deleteOne._id}`,
            method: 'delete'
          }).done(function(res, status) {
            console.log(">> ", res.msg)
            refreshArticleData();
          });
      }
    }

    /**
     * Some of service management methods.
     */

    function refreshServiceData() {
      $.get(`${api}/pet-services/user/${user._id}`, function(res, status) {
        window.localStorage.setItem('services', JSON.stringify(res.data));
        // clear old data
        var dataGridBody = $('#service-data-grid').find('tbody');
        dataGridBody.html('');
        // overload services data
        $(res.data).each(function (idx, ele){
            console.log(idx, ele._id, ele.title);
            var tr = '<tr>' +
                `<td class="align-middle">${ idx + 1 }</td>` +
                `<td class="align-middle">${ele.title}</td>` +
                `<td class="align-middle">${ele.integral}</td>` +
                `<td class="align-middle">${ele.content}</td>` +
                `<td class="align-middle">${ele.lastestAt}</td>` +
                `<td class="align-middle text-center">` +
                `   <button class="btn btn-sm btn-info" title="edit" data-toggle="modal" data-target="#serviceFormModal" data-title="Edit" data-id="${ele._id}" data-index="${idx}">Edit</button>` +
                `   <button class="btn btn-sm btn-danger" title="delete" onclick="toDeleteService(event, ${idx})">Del</button>` +
                '</td>' +
            '</tr>';
            dataGridBody.append(tr);
        });
      })
    }

    refreshServiceData();

    // The form-modal, used to edit pet data.
    $('#serviceFormModal').on('show.bs.modal', event => {
      var button = $(event.relatedTarget);
      var modal  = $('#serviceFormModal');
      var modalTitle  = button.data('title');
      var dataId = button.data('id');
      var modalIndex = Number(button.data('index'));
      // Use above variables to manipulate the DOM
      modal.find('.modal-title').text(modalTitle + ' service data');

      if (dataId) {
        // Edit
        var services = JSON.parse(window.localStorage.getItem('services'));
        var editOne = services[modalIndex];
        modal.find('.modal-body #service-title').val(editOne.title);
        modal.find('.modal-body #service-integral').val(editOne.integral);
        modal.find('.modal-body #service-content').val(editOne.content);
        $('#service-form-modal-submit').on('click', function(){
            toSaveService(dataId);
            modal.modal('hide');
            $('#service-form-modal-submit').off('click');
        });
      } else {
        // Add
        modal.find('.modal-body #service-title').val('');
        modal.find('.modal-body #service-integral').val('');
        modal.find('.modal-body #service-content').val('');
        $('#service-form-modal-submit').on('click', function(){
            toSaveService();
            modal.modal('hide');
            $('#service-form-modal-submit').off('click');
        });

      }
    });

    function toSaveService(id) {
      const now = new Date();
      var passData = {
        title: $('#service-title').val(),
        integral: $('#service-integral').val(),
        content: $('#service-content').val(),
        lastestAt: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
      };

      if (id) {
        // Edit
        passData._id = id;
        $.ajax({
          url: `${api}/pet-services`,
          data: passData,
          dataType: 'json',
          method: 'patch'
        }).done(function(res, status) {
          console.log(">> ", res.msg);
          refreshServiceData();
        });
      } else {
        // Set author
        passData.userId = user._id;
        // Add
        $.post(`${api}/pet-services`, passData,function(res, status) {
            console.log(">> ", res.msg);
            refreshServiceData();
        });
      }
    }

    window.toDeleteService = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var services = JSON.parse(window.localStorage.getItem('services'));
          var deleteOne = services[idx];

          $.ajax({
            url: `${api}/pet-services/${deleteOne._id}`,
            method: 'delete'
          }).done(function(res, status) {
            console.log(">> ", res.msg)
            refreshServiceData();
          });
      }
    }


    /**
     * Some of users management methods.
     */

    function refreshUserData() {
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
    refreshUserData();

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
            modal.modal('hide')
            $('#user-form-modal-submit').off('click');
        });
      } else {
        // Add
        modal.find('.modal-body #username').val('');
        modal.find('.modal-body #firstname').val('');
        modal.find('.modal-body #lastname').val('');
        modal.find('.modal-body #birthdate').val('');
        modal.find('.modal-body #email').val('');
        modal.find('.modal-body #memo').val('');
        $('#user-form-modal-submit').on('click', function(){
            toSaveUser();
            modal.modal('hide');
            $('#user-form-modal-submit').off('click');
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
      if (id) {
        // Edit
        u._id = id;
        $.ajax({
          url: `${api}/users`,
          data: u,
          dataType: 'json',
          method: 'patch'
        }).done(function(res, status) {
          console.log(">> ", res.msg);
          refreshUserData();
        });
      } else {
        // Add
        $.post(`${api}/users`, u,function(res, status) {
          console.log(">> ", res.msg);
          refreshUserData();
        });
      }
    }

    window.toDeleteUser = function (event, idx) {
      var isConfirm = window.confirm(`Are you sure to delete?`);
      if (isConfirm) {
          var users = JSON.parse(window.localStorage.getItem('users'));
          var deleteOne = users[idx];
          $.ajax({
            url: `${api}/users/${deleteOne._id}`,
            method: 'delete'
          }).done(function(res, status) {
            console.log(">> ", res.msg)
            refreshUserData();
          });
      }
    }

  });
})('http://mypet-server.herokuapp.com');
