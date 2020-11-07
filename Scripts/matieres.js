$(document).ready(function () {0
    loadMatieres();
});
//Load Data function
function loadMatieres() {
    $.ajax({
        url: "/Matiere/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num = num + 1) + '</td>';
                html += '<td>' + item.Libelle + '</td>';
                html += '<td>' + item.Coefficient + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getMatiereByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleMatiere(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyMatieres').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddMatiere() {
    var res = validateMatiere();
    if (res == false) {
        return false;
    }
    var matiereObj = {
        Id: $('#Id').val(),
        Libelle: $('#Libelle').val(),
        Coefficient: $('#Coefficient').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Matiere/Add",
        data: JSON.stringify(matiereObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadMatieres();
            $('#matiereModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxMatiere() {
    $('#Id').val("");
    $('#Libelle').val("");
    $('#Coefficient').val("");
    $('#Etat').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Libelle').css('border-color', 'lightgrey');
    $('#NombreMax').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateMatiere() {
    var isValid = true;
    if ($('#Libelle').val().trim() == "") {
        $('#Libelle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Libelle').css('border-color', 'lightgrey');
    }
    if ($('#Coefficient').val().trim() == "") {
        $('#Coefficient').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Coefficient').css('border-color', 'lightgrey');
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
function getMatiereByID(Did) {
    $('#Libelle').css('border-color', 'lightgrey');
    $('#Coefficient').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Matiere/getbyID/" + Did,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Libelle').val(result.Libelle);
            $('#Coefficient').val(result.Coefficient);
            $('#Etat').val(result.Etat);
            $('#matiereModal').modal('show');
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
function UpdateMatiere() {
    var res = validateMatiere();
    if (res == false) {
        return false;
    }
    var matiereObj = {
        Id: $('#Id').val(),
        Libelle: $('#Libelle').val(),
        Coefficient: $('#Coefficient').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Matiere/Update",
        data: JSON.stringify(matiereObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadMatieres();
            $('#matiereModal').modal('hide');
            $('#Id').val("");
            $('#Libelle').val("");
            $('#Coefficient').val("");
            $('#Etat').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleMatiere(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Matiere/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadMatieres();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}