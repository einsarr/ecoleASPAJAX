$(document).ready(function () {
    loadClasses();
});

//Load Data function
function loadClasses() {
    $.ajax({
        url: "/Classe/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + item.Libelle + '</td>';
                html += '<td>' + item.NombreMax + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getClasseByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleClasse(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyClasses').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddClasse() {
    var res = validateClasse();
    if (res == false) {
        return false;
    }
    var classeObj = {
        Id: $('#Id').val(),
        Libelle: $('#Libelle').val(),
        NombreMax: $('#NombreMax').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Classe/Add",
        data: JSON.stringify(classeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadClasses();
            $('#classeModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxClasse() {
    $('#Id').val("");
    $('#Libelle').val("");
    $('#NombreMax').val("");
    $('#Etat').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Libelle').css('border-color', 'lightgrey');
    $('#NombreMax').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateClasse() {
    var isValid = true;
    if ($('#Libelle').val().trim() == "") {
        $('#Libelle').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Libelle').css('border-color', 'lightgrey');
    }
    if ($('#NombreMax').val().trim() == "") {
        $('#NombreMax').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NombreMax').css('border-color', 'lightgrey');
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
function getClasseByID(Id) {
    $('#Libelle').css('border-color', 'lightgrey');
    $('#NombreMax').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Classe/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Libelle').val(result.Libelle);
            $('#NombreMax').val(result.NombreMax);
            $('#Etat').val(result.Etat);
            $('#classeModal .modal-title').html('Modification d\'une classe');
            $('#classeModal').modal('show');
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
function UpdateClasse() {
    var res = validateClasse();
    if (res == false) {
        return false;
    }
    var classeObj = {
        Id: $('#Id').val(),
        Libelle: $('#Libelle').val(),
        NombreMax: $('#NombreMax').val(),
        Etat: $('#Etat').val(),
    };
    $.ajax({
        url: "/Classe/Update",
        data: JSON.stringify(classeObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadClasses();
            $('#classeModal').modal('hide');
            $('#Id').val("");
            $('#Libelle').val("");
            $('#NombreMax').val("");
            $('#Etat').val("");
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
                url: "/Classe/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadClasses();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    });
}