$(document).ready(function () {
    loadEcoles();
});

//Load Data function
function loadEcoles() {
    $.ajax({
        url: "/Ecole/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var num = 0;
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + (num=num+1) + '</td>';
                html += '<td>' + item.Nom + '</td>';
                html += '<td>' + item.Description + '</td>';
                html += '<td>' + item.Adresse + '</td>';
                html += '<td>' + item.TelephoneFix + '</td>';
                html += '<td>' + item.Etat + '</td>';
                html += '<td><a href="#" class="btn btn-warning btn-xs" onclick="return getEcoleByID(' + item.Id +
                    ')"><span class="fas fa-edit"></span></a> | <a href="#" class="btn btn-danger btn-xs" onclick="DeleleEcole(' + item.Id + ')"><span class="fas fa-trash"></span></a></td>';
                html += '</tr>';
            });
            $('.tbodyEcoles').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function AddEcole() {
    var res = validateEcole();
    if (res == false) {
        return false;
    }
    var ecoleObj = {
        Id: $('#Id').val(),
        Nom: $('#Nom').val(),
        Adresse: $('#Adresse').val(),
        Email: $('#Email').val(),
        TelephoneFix: $('#TelephoneFix').val(),
        TelephoneP: $('#TelephoneP').val(),
        DateCreation: $('#DateCreation').val(),
        Fax: $('#Fax').val(),
        Ninea: $('#Ninea').val(), 
        Etat: $('#Etat').val(),
        Description: $('#Description').val(),
    };
    $.ajax({
        url: "/Ecole/Add",
        data: JSON.stringify(ecoleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadEcoles();
            $('#ecoleModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBoxEcole() {
    $('#Id').val("");
    $('#Nom').val("");
    $('#Adresse').val("");
    $('#Email').val("");
    $('#TelephoneFix').val("");
    $('#TelephoneP').val("");
    $('#Fax').val("");
    $('#Ninea').val("");
    $('#DateCreation').val("");
    $('#Etat').val("");
    $('#Description').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nom').css('border-color', 'lightgrey');
    $('#Adresse').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#TelephoneFix').css('border-color', 'lightgrey');
    $('#TelephoneP').css('border-color', 'lightgrey');
    $('#Fax').css('border-color', 'lightgrey');
    $('#Ninea').css('border-color', 'lightgrey');
    $('#DateCreation').css('border-color', 'lightgrey'); 
    $('#Etat').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validateEcole() {
    var isValid = true;
    if ($('#Nom').val().trim() == "") {
        $('#Nom').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nom').css('border-color', 'lightgrey');
    }

    if ($('#Adresse').val().trim() == "") {
        $('#Adresse').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Adresse').css('border-color', 'lightgrey');
    }

    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }

    if ($('#TelephoneFix').val().trim() == "") {
        $('#TelephoneFix').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TelephoneFix').css('border-color', 'lightgrey');
    }

    if ($('#TelephoneP').val().trim() == "") {
        $('#TelephoneP').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TelephoneP').css('border-color', 'lightgrey');
    }

    if ($('#Ninea').val().trim() == "") {
        $('#Ninea').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Ninea').css('border-color', 'lightgrey');
    }

    if ($('#Fax').val().trim() == "") {
        $('#Fax').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Fax').css('border-color', 'lightgrey');
    }

    if ($('#DateCreation').val().trim() == "") {
        $('#DateCreation').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateCreation').css('border-color', 'lightgrey');
    }

    if ($('#Etat').val().trim() == "") {
        $('#Etat').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Etat').css('border-color', 'lightgrey');
    }

    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    return isValid;
}


//Function for getting the Data Based upon Employee ID
function getEcoleByID(Id) {
    $('#Nom').css('border-color', 'lightgrey');
    $('#Adresse').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#TelephoneP').css('border-color', 'lightgrey');
    $('#TelephoneFix').css('border-color', 'lightgrey');
    $('#Ninea').css('border-color', 'lightgrey');
    $('#DateCreation').css('border-color', 'lightgrey');
    $('#Fax').css('border-color', 'lightgrey');
    $('#Etat').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Ecole/getbyID/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Nom').val(result.Nom);
            $('#Adresse').val(result.Adresse);
            $('#Email').val(result.Email);
            $('#TelephoneFix').val(result.TelephoneFix);
            $('#TelephoneP').val(result.TelephoneP);
            $('#Ninea').val(result.Ninea);
            $('#Fax').val(result.Fax);
            //Formatage de date
            var dateCrea = result.DateCreation;
            var nowDate = new Date(parseInt(dateCrea.substr(6)))
            let date = JSON.stringify(nowDate)
            dateCreation = date.slice(1, 11)
            console.log(dateCreation);
            $('#DateCreation').val(dateCreation);
            $('#Etat').val(result.Etat);
            $('#Description').val(result.Etat);
            $('#ecoleModal .modal-title').html('Modification d\'une école');
            $('#ecoleModal').modal('show');
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
function UpdateEcole() {
    var res = validateEcole();
    if (res == false) {
        return false;
    }
    var ecoleObj = {
        Id: $('#Id').val(),
        Nom: $('#Nom').val(),
        Adresse: $('#Adresse').val(),
        Email: $('#Email').val(),
        TelephoneFix: $('#TelephoneFix').val(),
        TelephoneP: $('#TelephoneP').val(),
        DateCreation: $('#DateCreation').val(),
        Fax: $('#Fax').val(),
        Ninea: $('#Ninea').val(),
        Etat: $('#Etat').val(),
        Description: $('#Description').val(),
    };
    $.ajax({
        url: "/Ecole/Update",
        data: JSON.stringify(ecoleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadEcoles();
            $('#ecoleModal').modal('hide');
            $('#Id').val("");
            $('#Nom').val("");
            $('#Adresse').val("");
            $('#Email').val("");
            $('#TelephoneFix').val("");
            $('#TelephoneP').val("");
            $('#Ninea').val("");
            $('#Fax').val("");
            $('#DateCreation').val("");
            $('#Etat').val("");
            $('#Description').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting employee's record
function DeleleEcole(ID) {
    swal({
        title: 'Alerte',
        text: "Êtes-vous sûre de vouloir supprimer ?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Ecole/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadEcoles();
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