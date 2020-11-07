$(document).ready(function () {
    loadInscriptions();
});

//Load Data function
function loadInscriptions() {
    $.ajax({
        url: "/Inscription/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + dateFormat(new Date(parseInt((item.DateInscription).match(/\d+/)[0]))) + '</td>';
                html += '<td>' + item.Libelle + '</td>';
                html += '<td>' + item.Classe.Libelle + '</td>';
                html += '<td>' + item.Etudiant.Prenom + " " + item.Etudiant.Nom+'</td>';
                html += '<td>' + item.Montant + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getInscriptionByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleInscription(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyInscriptions').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddInscription() {
    var res = validateInscription();
    if (res == false) {
        return false;
    }
    var InscriptionObj = {
        Id: $('#Id').val(),
        DateInscription: $('#DateInscription').val(),
        Libelle: $('#Libelle').val(),
        ClasseId: $('#ClasseId').val(),
        EtudiantId: $('#EtudiantId').val(),
        Montant: $('#Montant').val(),
    };
    $.ajax({
        url: "/Inscription/Add",
        data: JSON.stringify(InscriptionObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadInscriptions();
            $('#inscriptionModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxInscription() {
    $('#Id').val("");
    $('#DateInscription').val("");
    $('#Libelle').val("");
    $('#ClasseId').val("");
    $('#EtudiantId').val("");
    $('#Montant').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#DateInscription').css('border-color', 'lightgrey');
    $('#Libelle').css('border-color', 'lightgrey');
    $('#ClasseId').css('border-color', 'lightgrey');
    $('#EtudiantId').css('border-color', 'lightgrey');
    $('#Montant').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateInscription() {
    var isValid = true;
    if ($('#DateInscription').val().trim() == "") {
        $('#DateInscription').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateInscription').css('border-color', 'lightgrey');
    }
    if ($('#Libelle').val().trim() == "") {
        $('#Libelle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Libelle').css('border-color', 'lightgrey');
    }

    if ($('#ClasseId').val().trim() == "") {
        $('#ClasseId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ClasseId').css('border-color', 'lightgrey');
    }

    if ($('#EtudiantId').val().trim() == "") {
        $('#EtudiantId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EtudiantId').css('border-color', 'lightgrey');
    }

    
    if ($('#Montant').val().trim() == "") {
        $('#Montant').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Montant').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getInscriptionByID(Id) {
    $('#DateInscription').css('border-color', 'lightgrey');
    $('#Libelle').css('border-color', 'lightgrey');
    $('#ClasseId').css('border-color', 'lightgrey');
    $('#EtudiantId').css('border-color', 'lightgrey');
    $('#Montant').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Inscription/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            //Formatage de date
            var dateIns = result.DateInscription;
            var nowDate = new Date(parseInt(dateIns.substr(6)))
            let date = JSON.stringify(nowDate)
            dateInscription = date.slice(1, 11)
            $('#DateInscription').val(dateInscription);
            console.log(dateInscription);
            $('#Libelle').val(result.Libelle);
            $('#ClasseId').val(result.ClasseId);
            $('#EtudiantId').val(result.EtudiantId);
            $('#Montant').val(result.Montant);
            $('#inscriptionModal').modal('show');
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
function DeleleInscription() {
    var res = validateInscription();
    if (res == false) {
        return false;
    }
    var InscriptionObj = {
        Id: $('#Id').val(),
        DateInscription: $('#DateInscription').val(),
        Libelle: $('#Libelle').val(),
        ClasseId: $('#ClasseId').val(),
        EtudiantId: $('#EtudiantId').val(),
        Montant: $('#Montant').val(),
    };
    $.ajax({
        url: "/Inscription/Update",
        data: JSON.stringify(InscriptionObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadInscriptions();
            $('#inscriptionModal').modal('hide');
            $('#Id').val("");
            $('#DateInscription').val("");
            $('#Libelle').val("");
            $('#ClasseId').val("");
            $('#EtudiantId').val("");
            $('#Montant').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function DeleleClasse(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Inscription/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadInscriptions();
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