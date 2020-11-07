$(document).ready(function () {
    loadAffectations();
});

//Load Data function
function loadAffectations() {
    $.ajax({
        url: "/Affectation/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + dateFormat(new Date(parseInt((item.DateAffectation).match(/\d+/)[0]))) + '</td>';
                html += '<td>' + item.DureeCours + '</td>';
                html += '<td>' + item.Classe.Libelle + '</td>';
                html += '<td>' + item.Professeur.Prenom + " " + item.Professeur.Nom+'</td>';
                html += '<td>' + item.Matiere.Libelle + '</td>';
                html += '<td>' + item.QuantumHoraire + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getAffectationByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleAffectation(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyAffectations').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddAffectation() {
    var res = validateAffectation();
    if (res == false) {
        return false;
    }
    var AffectationObj = {
        Id: $('#Id').val(),
        DateAffectation: $('#DateAffectation').val(),
        DureeCours: $('#DureeCours').val(),
        ClasseId: $('#ClasseId').val(),
        ProfesseurId: $('#ProfesseurId').val(),
        MatiereId: $('#MatiereId').val(),
        QuantumHoraire: $('#QuantumHoraire').val()
    };
    $.ajax({
        url: "/Affectation/Add",
        data: JSON.stringify(AffectationObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAffectations();
            $('#affectationModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxAffectation() {
    $('#Id').val("");
    $('#DateAffectation').val("");
    $('#DureeCours').val("");
    $('#ClasseId').val("");
    $('#ProfesseurId').val("");
    $('#MatiereId').val("");
    $('#QuantumHoraire').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#DateAffectation').css('border-color', 'lightgrey');
    $('#DureeCours').css('border-color', 'lightgrey');
    $('#ClasseId').css('border-color', 'lightgrey');
    $('#ProfesseurId').css('border-color', 'lightgrey');
    $('#MatiereId').css('border-color', 'lightgrey');
    $('#QuantumHoraire').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateAffectation() {
    var isValid = true;
    if ($('#DateAffectation').val().trim() == "") {
        $('#DateAffectation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateAffectation').css('border-color', 'lightgrey');
    }
    if ($('#DureeCours').val().trim() == "") {
        $('#DureeCours').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DureeCours').css('border-color', 'lightgrey');
    }

    if ($('#ClasseId').val().trim() == "") {
        $('#ClasseId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ClasseId').css('border-color', 'lightgrey');
    }

    if ($('#ProfesseurId').val().trim() == "") {
        $('#ProfesseurId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfesseurId').css('border-color', 'lightgrey');
    }

    if ($('#MatiereId').val().trim() == "") {
        $('#MatiereId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MatiereId').css('border-color', 'lightgrey');
    }
    if ($('#QuantumHoraire').val().trim() == "") {
        $('#QuantumHoraire').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#QuantumHoraire').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getAffectationByID(Id) {
    $('#DateAffectation').css('border-color', 'lightgrey');
    $('#DureeCours').css('border-color', 'lightgrey');
    $('#ClasseId').css('border-color', 'lightgrey');
    $('#ProfesseurId').css('border-color', 'lightgrey');
    $('#MatiereId').css('border-color', 'lightgrey');
    $('#QuantumHoraire').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Affectation/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            //Formatage de date
            var dateAff = result.DateAffectation;
            var nowDate = new Date(parseInt(dateAff.substr(6)))
            let date = JSON.stringify(nowDate)
            dateAffectation = date.slice(1, 11)
            $('#DateAffectation').val(dateAffectation);
            //console.log(dateAffectation);
            $('#DureeCours').val(result.DureeCours);
            $('#ClasseId').val(result.ClasseId);
            $('#ProfesseurId').val(result.ProfesseurId);
            $('#MatiereId').val(result.MatiereId);
            $('#QuantumHoraire').val(result.QuantumHoraire);
            $('#affectationModal').modal('show');
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
function UpdateAffectation() {
    var res = validateAffectation();
    if (res == false) {
        return false;
    }
    var AffectationObj = {
        Id: $('#Id').val(),
        DateAffectation: $('#DateAffectation').val(),
        DureeCours: $('#DureeCours').val(),
        ClasseId: $('#ClasseId').val(),
        ProfesseurId: $('#ProfesseurId').val(),
        MatiereId: $('#MatiereId').val(),
        QuantumHoraire: $('#QuantumHoraire').val()
    };
    $.ajax({
        url: "/Affectation/Update",
        data: JSON.stringify(AffectationObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAffectations();
            $('#affectationModal').modal('hide');
            $('#Id').val("");
            $('#DateAffectation').val("");
            $('#DureeCours').val("");
            $('#ClasseId').val("");
            $('#ProfesseurId').val("");
            $('#MatiereId').val("");
            $('#QuantumHoraire').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function DeleleAffectation(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Affectation/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadAffectations();
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