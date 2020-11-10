$(document).ready(function () {
    loadProfesseurs();
});
//Load Data function
function loadProfesseurs() {
    $.ajax({
        url: "/Professeur/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num = num + 1) + '</td>';
                html += '<td>' + item.Prenom + '</td>';
                html += '<td>' + item.Nom + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Telephone + '</td>';
                html += '<td>' + item.Adresse + '</td>';
                html += '<td>' + item.Cni + '</td>';
                html += '<td>' + item.PrixHeure + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getProfesseurByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleProfesseur(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyProfesseurs').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddProfesseur() {
    var res = validateProfesseur();
    if (res == false) {
        return false;
    }
    var classeObj = {
        Id: $('#Id').val(),
        Prenom: $('#Prenom').val(),
        Nom: $('#Nom').val(),
        Telephone: $('#Telephone').val(),
        Email: $('#Email').val(),
        Adresse: $('#Adresse').val(),
        Cni: $('#Cni').val(),
        PrixHeure: $('#PrixHeure').val(),
    };
    $.ajax({
        url: "/Professeur/Add",
        data: JSON.stringify(classeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //loadProfesseurs();
            //tableData.ajax.reload();
            $('#professeurModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxProfesseur() {
    $('#Id').val("");
    $('#Prenom').val("");
    $('#Nom').val("");
    $('#Telephone').val("");
    $('#Email').val("");
    $('#Cni').val("");
    $('#Adresse').val("");
    $('#PrixHeure').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Libelle').css('border-color', 'lightgrey');
    $('#NombreMax').css('border-color', 'lightgrey');
    $('#active').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateProfesseur() {
    var isValid = true;
    if ($('#Prenom').val().trim() === "") {
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

    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }

    if ($('#Telephone').val().trim() == "") {
        $('#Telephone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Telephone').css('border-color', 'lightgrey');
    }

    if ($('#Cni').val().trim() == "") {
        $('#Cni').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Cni').css('border-color', 'lightgrey');
    }

    if ($('#Adresse').val().trim() == "") {
        $('#Adresse').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Adresse').css('border-color', 'lightgrey');
    }

    if ($('#PrixHeure').val().trim() == "") {
        $('#PrixHeure').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PrixHeure').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getProfesseurByID(Id) {
    $('#Prenom').css('border-color', 'lightgrey');
    $('#Nom').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Telephone').css('border-color', 'lightgrey');
    $('#Cni').css('border-color', 'lightgrey');
    $('#Adresse').css('border-color', 'lightgrey');
    $('#PrixHeure').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Professeur/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Prenom').val(result.Prenom);
            $('#Nom').val(result.Nom);
            $('#Email').val(result.Email);
            $('#Telephone').val(result.Telephone);
            $('#Cni').val(result.Cni);
            $('#Adresse').val(result.Adresse);
            $('#PrixHeure').val(result.PrixHeure);
            $('#professeurModal').modal('show');
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
function UpdateProfesseur() {
    var res = validateProfesseur();
    if (res == false) {
        return false;
    }
    var classeObj = {
        Id: $('#Id').val(),
        Prenom: $('#Prenom').val(),
        Nom: $('#Nom').val(),
        Telephone: $('#Telephone').val(),
        Email: $('#Email').val(),
        Adresse: $('#Adresse').val(),
        Cni: $('#Cni').val(),
        PrixHeure: $('#PrixHeure').val(),
    };
    $.ajax({
        url: "/Professeur/Update",
        data: JSON.stringify(classeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadProfesseurs();
            $('#professeurModal').modal('hide');
            $('#Id').val("");
            $('#Prenom').val("");
            $('#Nom').val("");
            $('#Email').val("");
            $('#Telephone').val("");
            $('#Cni').val("");
            $('#Adresse').val("");
            $('#PrixHeure').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleProfesseur(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Professeur/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    tableData.ajax.reload(null, false);
                    //loadProfesseurs();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}