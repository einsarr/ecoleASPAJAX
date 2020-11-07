$(document).ready(function () {
    loadEtudiants();
});
//Load Data function
function loadEtudiants() {
    $.ajax({
        url: "/Etudiant/List",
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
                html += '<td>' + dateFormat(new Date(parseInt((item.DateNaissance).match(/\d+/)[0]))) + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Telephone + '</td>';
                html += '<td>' + item.Adresse + '</td>';
                html += '<td>' + item.Cni + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getEtudiantByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleEtudiant(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyEtudiants').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddEtudiant() {
    var res = validateEtudiant();
    if (res == false) {
        return false;
    }
    var EtudiantObj = {
        Id: $('#Id').val(),
        Prenom: $('#Prenom').val(),
        Nom: $('#Nom').val(),
        DateNaissance: $('#DateNaissance').val(),
        LieuNaissance: $('#LieuNaissance').val(),
        Telephone: $('#Telephone').val(),
        Email: $('#Email').val(),
        Adresse: $('#Adresse').val(),
        Cni: $('#Cni').val(),
    };
    $.ajax({
        url: "/Etudiant/Add",
        data: JSON.stringify(EtudiantObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadEtudiants();
            $('#etudiantModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxEtudiant() {
    $('#Id').val("");
    $('#Prenom').val("");
    $('#Nom').val("");
    $('#DateNaissance').val("");
    $('#LieuNaissance').val("");
    $('#Telephone').val("");
    $('#Email').val("");
    $('#Cni').val("");
    $('#Adresse').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}
//Valdidation using jquery
function validateEtudiant() {
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

    if ($('#DateNaissance').val().trim() == "") {
        $('#DateNaissance').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateNaissance').css('border-color', 'lightgrey');
    }

    if ($('#LieuNaissance').val().trim() == "") {
        $('#LieuNaissance').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LieuNaissance').css('border-color', 'lightgrey');
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
    
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getEtudiantByID(Did) {
    $('#Prenom').css('border-color', 'lightgrey');
    $('#Nom').css('border-color', 'lightgrey');
    $('#DateNaissance').css('border-color', 'lightgrey');
    $('#LieuNaissance').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Telephone').css('border-color', 'lightgrey');
    $('#Cni').css('border-color', 'lightgrey');
    $('#Adresse').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Etudiant/getbyID/" + Did,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {          
            $('#Id').val(result.Id);
            $('#Prenom').val(result.Prenom);
            //Formatage de date
            var dateNaiss = result.DateNaissance;
            var nowDate = new Date(parseInt(dateNaiss.substr(6)))
            let date = JSON.stringify(nowDate)
            dateNaissance = date.slice(1, 11)
            $('#DateNaissance').val(dateNaissance);
            $('#LieuNaissance').val(result.LieuNaissance);
            $('#Nom').val(result.Nom);
            $('#Email').val(result.Email);
            $('#Telephone').val(result.Telephone);
            $('#Cni').val(result.Cni);
            $('#Adresse').val(result.Adresse);
            $('#etudiantModal').modal('show');
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
function UpdateEtudiant() {
    var res = validateEtudiant();
    if (res == false) {
        return false;
    }
    var classeObj = {
        Id: $('#Id').val(),
        Prenom: $('#Prenom').val(),
        Nom: $('#Nom').val(),
        DateNaissance: $('#DateNaissance').val(),
        LieuNaissance: $('#LieuNaissance').val(),
        Telephone: $('#Telephone').val(),
        Email: $('#Email').val(),
        Adresse: $('#Adresse').val(),
        Cni: $('#Cni').val(),
    };
    $.ajax({
        url: "/Etudiant/Update",
        data: JSON.stringify(classeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadEtudiants();
            $('#etudiantModal').modal('hide');
            $('#Id').val("");
            $('#Prenom').val("");
            $('#Nom').val("");
            $('#DateNaissance').val("");
            $('#LieuNaissance').val("");
            $('#Email').val("");
            $('#Telephone').val("");
            $('#Cni').val("");
            $('#Adresse').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function DeleleEtudiant(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Etudiant/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadEtudiants();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}

//Fonction de formatage de date(01/12/2020)
function dateFormat(d) {
    return (d.getDate() + "").padStart(2, "0")
        + "/" + ((d.getMonth() + 1) + "").padStart(2, "0")
        + "/" + d.getFullYear();
}