$(document).ready(function () {
    loadParamAnnees();
});
//Load Data function
function loadParamAnnees() {
    $.ajax({
        url: "/ParamAnnee/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + item.CodeAnnee + '</td>';
                html += '<td>' + item.LibelleAnnee + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getAnneeByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleAnnee(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyParamAnnees').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddParamAnnee() {
    var res = validateAnnee();
    if (res == false) {
        return false;
    }
    var AnneeObj = {
        Id: $('#Id').val(),
        CodeAnnee: $('#CodeAnnee').val(),
        LibelleAnnee: $('#LibelleAnnee').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/ParamAnnee/Add",
        data: JSON.stringify(AnneeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadParamAnnees();
            $('#paramAnneeModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxAnnee() {
    $('#Id').val("");
    $('#CodeAnnee').val("");
    $('#LibelleAnnee').val("");
    $('#Etat').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#CodeAnnee').css('border-color', 'lightgrey');
    $('#Libelle').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateAnnee() {
    var isValid = true;
    if ($('#CodeAnnee').val().trim() == "") {
        $('#CodeAnnee').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CodeAnnee').css('border-color', 'lightgrey');
    }
    if ($('#LibelleAnnee').val().trim() == "") {
        $('#LibelleAnnee').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LibelleAnnee').css('border-color', 'lightgrey');
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
function getAnneeByID(Id) {
    $('#CodeAnnee').css('border-color', 'lightgrey');
    $('#LibelleAnnee').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ParamAnnee/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#CodeAnnee').val(result.CodeAnnee);
            $('#LibelleAnnee').val(result.LibelleAnnee);
            $('#Etat').val(result.Etat);
            $('#paramAnneeModal .modal-title').html('Modification d\'une année');
            $('#paramAnneeModal').modal('show');
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
function UpdateParamAnnee() {
    var res = validateAnnee();
    if (res == false) {
        return false;
    }
    var paramAnneeObj = {
        Id: $('#Id').val(),
        CodeAnnee: $('#CodeAnnee').val(),
        LibelleAnnee: $('#LibelleAnnee').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/ParamAnnee/Update",
        data: JSON.stringify(paramAnneeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadParamAnnees();
            $('#paramAnneeModal').modal('hide');
            $('#Id').val("");
            $('#CodeAnnee').val("");
            $('#LibelleAnnee').val("");
            $('#Etat').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleAnnee(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/ParamAnnee/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadParamAnnees();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}