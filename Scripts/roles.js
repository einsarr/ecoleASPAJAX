$(document).ready(function () {
    loadRoles();
});

//Load Data function
function loadRoles() {
    $.ajax({
        url: "/Role/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + item.LibelleRole + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getRoleByID(' + item.IdR +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleRole(' + item.IdR + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyRoles').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddRole() {
    var res = validateRole();
    if (res == false) {
        return false;
    }
    var roleObj = {
        IdR: $('#IdR').val(),
        LibelleRoleRole: $('#LibelleRole').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Role/Add",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadRoles();
            $('#roleModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for clearing the textboxes
function clearTextBoxRole() {
    $('#IdR').val("");
    $('#LibelleRole').val("");
    $('#Etat').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#LibelleRole').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateRole() {
    var isValid = true;
    if ($('#LibelleRole').val().trim() == "") {
        $('#LibelleRole').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LibelleRole').css('border-color', 'lightgrey');
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
function getRoleByID(Id) {
    $('#LibelleRole').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Role/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdR').val(result.Id);
            $('#LibelleRole').val(result.LibelleRole);
            $('#Etat').val(result.Etat);
            $('#roleModal .modal-title').html('Modification d\'une role');
            $('#roleModal').modal('show');
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
function UpdateRole() {
    var res = validateRole();
    if (res == false) {
        return false;
    }
    var roleObj = {
        IdR: $('#IdR').val(),
        LibelleRoleRole: $('#LibelleRole').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Role/Update",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadRoles();
            $('#roleModal').modal('hide');
            $('#IdR').val("");
            $('#LibelleRole').val("");
            $('#Etat').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleRole(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Role/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadRoles();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}