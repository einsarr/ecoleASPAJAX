$(document).ready(function () {
    loadUsers();
});

//Load Data function
function loadUsers() {
    $.ajax({
        url: "/Utilisateur/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + item.Prenom + '</td>';
                html += '<td>' + item.Nom + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getUserByID(' + item.IdU +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleUser(' + item.IdU + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyUsers').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddUser() {
    var res = validateUser();
    if (res == false) {
        return false;
    }
    var userObj = {
        Id: $('#Id').val(),
        Libelle: $('#Prenom').val(),
        NombreMax: $('#Nom').val(),
        Identifiant: $('#Identifiant').val(),
        EmailU: $('#EmailU').val(),
        TelephoneU: $('#TelephoneU').val(),
        IdUser: $('#IdUser').val(),
        Role: $('#Role').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Utilisateur/Add",
        data: JSON.stringify(userObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadUsers();
            $('#userModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxUser() {
    $('#Id').val("");
    $('#Prenom').val("");
    $('#Nom').val("");
    $('#Identifiant').val("");
    $('#EmailU').val("");
    $('#TelephoneU').val("");
    $('#Role').val(""); 
    $('#IdUser').val("");
    $('#Etat').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Prenom').css('border-color', 'lightgrey');
    $('#Nom').css('border-color', 'lightgrey');
    $('#Identifiant').css('border-color', 'lightgrey');
    $('#EmailU').css('border-color', 'lightgrey');
    $('#TelephoneU').css('border-color', 'lightgrey');
    $('#Role').css('border-color', 'lightgrey');
    $('#IdUser').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateUser() {
    var isValid = true;
    if ($('#Prenom').val().trim() == "") {
        $('#Prenom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Prenom').css('border-color', 'lightgrey');
    }
    if ($('#Nom').val().trim() == "") {
        $('#Nom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nom').css('border-color', 'lightgrey');
    }

    if ($('#Identifiant').val().trim() == "") {
        $('#Identifiant').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Identifiant').css('border-color', 'lightgrey');
    }

    if ($('#EmailU').val().trim() == "") {
        $('#EmailU').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmailU').css('border-color', 'lightgrey');
    }

    if ($('#TelephoneU').val().trim() == "") {
        $('#TelephoneU').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TelephoneU').css('border-color', 'lightgrey');
    }

    if ($('#Role').val().trim() == "") {
        $('#Role').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Role').css('border-color', 'lightgrey');
    }

    if ($('#IdUser').val().trim() == "") {
        $('#IdUser').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdUser').css('border-color', 'lightgrey');
    }

    if ($('#Etat').val().trim() == "") {
        $('#Etat').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Etat').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getUserByID(Id) {
    $('#Prenom').css('border-color', 'lightgrey');
    $('#Nom').css('border-color', 'lightgrey');
    $('#Identifiant').css('border-color', 'lightgrey');
    $('#EmailU').css('border-color', 'lightgrey');
    $('#TelephoneU').css('border-color', 'lightgrey');
    $('#Role').css('border-color', 'lightgrey');
    $('#IdUser').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Utilisateur/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Prenom').val(result.Prenom);
            $('#Nom').val(result.Nom);
            $('#Identifiant').val(result.Identifiant);
            $('#EmailU').val(result.EmailU);
            $('#TelephoneU').val(result.TelephoneU);
            $('#Role').val(result.Role);
            $('#IdUser').val(result.IdUser);
            $('#Etat').val(result.Etat);
            $('#userModal .modal-title').html('Modification d\'un utilisateur');
            $('#userModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function UpdateUser() {
    var res = validateUser();
    if (res == false) {
        return false;
    }
    var userObj = {
        Id: $('#Id').val(),
        Libelle: $('#Prenom').val(),
        NombreMax: $('#Nom').val(),
        Identifiant: $('#Identifiant').val(),
        EmailU: $('#EmailU').val(),
        TelephoneU: $('#TelephoneU').val(),
        IdUser: $('#IdUser').val(),
        Role: $('#Role').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Utilisateur/Update",
        data: JSON.stringify(userObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadUsers();
            $('#classeModal').modal('hide');
            $('#Id').val("");
            $('#Prenom').val("");
            $('#Nom').val("");
            $('#Identifiant').val("");
            $('#EmailU').val("");
            $('#TelephoneU').val("");
            $('#IdUser').val("");
            $('#Role').val("");
            $('#Etat').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleUser(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Utilisateur/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadUsers();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}