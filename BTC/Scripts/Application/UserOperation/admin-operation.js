﻿

/*users*/

function loadUserHandlers() {

    $('.is_vip_user').on('change', function (e) {

        e.preventDefault();
        var c_h = $(this);
        var id = c_h.attr("user-id");
        if (c_h.is(":checked") == true) {
            updateIsVip(id, true);
        } else {
            updateIsVip(id, false);
        }

    });

    $('.is_active_user').on('change', function () {

        var c_h = $(this);
        var id = c_h.attr("user-id");
        if (c_h.is(":checked") == true) {
            updateIsActive(id, true);
        } else {
            updateIsActive(id, false);
        }

    });

    $('.is_approve_user').on('change', function () {

        var c_h = $(this);
        var id = c_h.attr("user-id");
        if (c_h.is(":checked") == true) {
            updateIsApprove(id, true);
        } else {
            updateIsApprove(id, false);
        }
    });

    $('.is_member').on('change', function () {

        var c_h = $(this);
        var id = c_h.attr("user-id");
        if (c_h.is(":checked") == true) {
            updateIsMember(id, true);
        } else {
            updateIsMember(id, false);
        }
    });

}

function updateIsMember(id, state) {

    var message = "";

    if (state == true) {
        message = "Seçili kullanıcı üye olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili kullanıcı üye statüsünden çıkacaktır.Onaylıyor musunuz?";
    }

    if (confirm(message) == true) {
        $.ajax('/Admin/updateUserRole', {
            type: "GET",
            dataType: "json",
            data: { user_id: id, state: state, operation_type :1 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }
}

function updateIsActive(id, state) {

    var message = "";

    if (state == true) {
        message = "Seçili kullanıcı aktif olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili kullanıcı aktif statüsünden çıkacaktır.Onaylıyor musunuz?";
    }

    if (confirm(message) == true) {
        $.ajax('/Admin/updateUserStatus', {
            type: "GET",
            dataType: "json",
            data: { user_id: id, state: state, operation_type: 1 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }



}

function updateIsVip(id, state) {

    var message = "";

    if (state == true) {
        message = "Seçili kullanıcı VİP olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili kullanıcı VİP statüsünden çıkacaktır.Onaylıyor musunuz?";
    }

    if (confirm(message) == true) {
        $.ajax('/Admin/updateUserStatus', {
            type: "GET",
            dataType: "json",
            data: { user_id: id, state: state, operation_type: 2 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }

}

function updateIsApprove(id, state) {


    var message = "";

    if (state == true) {
        message = "Seçili kullanıcı onaylı olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili kullanıcı onaylı statüsünden çıkacaktır.Onaylıyor musunuz?";
    }
    if (confirm(message) == true) {
        $.ajax('/Admin/updateUserStatus', {
            type: "GET",
            dataType: "json",
            data: { user_id: id, state: state, operation_type: 3 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }
}

/*users*/

/*posts*/

function loadPostHandlers() {


}

function updatePostIsActive(id, state) {

    var message = "";

    if (state == true) {
        message = "Seçili makale aktif olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili makale aktif statüsünden çıkacaktır.Onaylıyor musunuz?";
    }

    if (confirm(message) == true) {
        $.ajax('/Admin/updatePostStatus', {
            type: "GET",
            dataType: "json",
            data: { category_id: id, state: state, operation_type: 1 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }

}

function updatePostIsPublish(id, state) {

    var message = "";

    if (state == true) {
        message = "Seçili makale yayında olarak kaydedilecektir.Onaylıyor musunuz?";
    } else {
        message = "Seçili makale yayında statüsünden çıkacaktır.Onaylıyor musunuz?";
    }

    if (confirm(message) == true) {
        $.ajax('/Admin/updatePostStatus', {
            type: "GET",
            dataType: "json",
            data: { category_id: id, state: state, operation_type: 2 },
            success: function (result) {
                alertResponse(result);
            }
        });
    }

}

function getCategories(element) {
    $.ajax('/Blog/getCategories', {
        type: "GET",
        async: false,
        success: function (result) {
            $('#' + element).html("");
            $('#' + element).append("<option value=''>Kategori Seçiniz</option>");
            $.each(result, function (i, item) {
                if (item.IsActive == true) {
                    var opt = "<option value='" + item.ID + "'>" + item.Name + "</option>";
                    $('#' + element).append(opt);
                }
            });
        }
    });
}

function getWriters(element) {

    $.ajax('/Admin/getWriters', {
        type: "GET",
        contentType: 'json',
        success: function (data) {

            console.log(data);
            $('#' + element).html("");
            $('#' + element).append("<option value=''>Yazar Seçiniz</option>");

            for (var i = 0; i < data.length; i++) {
                var opt = "<option value='" + data[i].ID + "'>" + data[i].FullName + "</option>";
                $('#' + element).append(opt);
            }
        }
    });
}

function getPostList() {

    var cate_id = $('#category_id').val();
    var wri_id = $('#user_id').val();

    var p = false;

    if ($('#publish').is(":checked") == true) {
        p = true;
    }

    if (cate_id == 0 || cate_id == "" || wri_id == 0 || wri_id == "") {
        dangerAlert("Kategori ve yazar seçimi zorunldur!");
        return;
    }

    $.ajax('/Admin/_GetPosts', {
        type: "GET",
        dataType: "html",
        data: { category_id: cate_id, user_id: wri_id, publish: p },
        success: function (result) {
            $('#userList').html("");
            $('#userList').append(result);
        }
    });
}

/*posts*/


/*comments*/

function getComments() {
    $.ajax('/Admin/getWaitingComments', {
        type: "GET",
        dataType: "json",
        success: function (result) {
            $('#commentListBody').html("");
            $.each(result, function (i, item) {
                var tr = "<tr id='comment_" + item.ID + "'>";
                tr += "<td>" + item.Description + "</td>";
                tr += "<td>" + item.Name + "</td>";
                tr += "<td>" + item.Email + "</td>";
                tr += "<td>" + item.CreateDateAsString + "</td>";
                tr += "<td>" + item.PostTitle + "</td>";
                tr += "<td><button type='button' class='btn btn-xs btn-success' onclick='publishComment(" + item.ID + ")'>Yayınla</button><button type='button' class='btn btn-xs btn-danger' onclick='deleteComment(" + item.ID + ")'>Sil</button></td>";
                tr += "</tr>"

                $('#commentListBody').append(tr);
            });
        }
    });
}
function publishComment(id) {

    $.ajax('/Admin/publishComment', {
        type: "GET",
        dataType: "json",
        data: { comment_id: id },
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getComments();
            }
        }
    });

}
function deleteComment(id) {

    $.ajax('/Admin/deleteComment', {
        type: "GET",
        dataType: "json",
        data: { comment_id: id },
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getComments();
            }
        }
    });
}


/*comments*/


/*categories*/


function getCategoryList() {
    $.ajax('/Blog/getCategories', {
        type: "GET",
        async: false,
        success: function (result) {
            $('#categoryListBody').html("");
            $.each(result, function (i, item) {
                var tr = "<tr>";
                tr += "<td>" + item.Name + "<input type='hidden' id='category_name_" + item.ID + "' value=" + item.Name + "  /></td>";
                tr += "<td>" + item.Uri + "<input type='hidden' id='category_uri_" + item.ID + "' value=" + item.Uri + "  /></td>";
                if (item.IsActive == true) {
                    tr += "<td><span class='alert alert-success btn-xs' style='padding:0px;'>Aktif</span></td>";
                    tr += "<td><button type='button' onclick='updateCategoryState(" + item.ID + ",false)' class='btn btn-xs btn-danger'>Pasife Al</button><button type='button' onclick='editCategory(" + item.ID + ")' class='btn btn-xs btn-warning'>Düzenle</button></td>";
                } else {
                    tr += "<td><span class='alert alert-danger btn-xs' style='padding:0px;'>Pasif</span></td>";
                    tr += "<td><button type='button' onclick='updateCategoryState(" + item.ID + ",true)' class='btn btn-xs btn-success'>Aktife Al</button><button type='button' onclick='editCategory(" + item.ID + ")' class='btn btn-xs btn-warning'>Düzenle</button></td>";
                }

                tr += "</tr>";
                $('#categoryListBody').append(tr);

            });
        }
    });
}

function editCategory(id) {
    clearInputs();
    $('#CategoryID').val(id);
    $('#CategoryName').val($('#category_name_' + id).val());
    $('#CategoryUri').val($('#category_uri_' + id).val());
}

function clearInputs() {
    $('#CategoryID').val("");
    $('#CategoryName').val("");
    $('#CategoryUri').val("");
}

function addCategory() {
    var obj = new Object();
    obj.ID = $('#CategoryID').val();
    obj.Name = $('#CategoryName').val();
    obj.Uri = $('#CategoryUri').val();

    $.ajax('/Admin/addOrEditCategory', {
        type: "Post",
        dataType: "json",
        data: obj,
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getCategoryList();
                clearInputs();
            }
        }
    });

}

function updateCategoryState(id, state) {

    $.ajax('/Admin/updateCategoryState', {
        type: "GET",
        dataType: "json",
        data: { id: id, state: state },
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getCategoryList();
            }
        }
    });

}

/*categories*/



/*email settings*/

function updateMailSettings() {
    $.ajax({
        url: "/Admin/updateMailSettings",
        dataType: "json",
        type: 'POST',
        data: $('#mailSettingForm').serialize(),
        success: function (data) {
            alertResponse(data);
        }
    });
}


/*email settings*/

/*site settings*/


function updateSiteSettings() {
    $.ajax({
        url: "/Admin/updateSiteettings",
        dataType: "json",
        type: 'POST',
        data: $('#siteSettingForm').serialize(),
        success: function (data) {
            alertResponse(data);
        }
    });
}


/*site settings*/

 

/*menu settings*/


function getMenuList() {

    $.ajax('/Admin/getMenuItems', {
        type: "GET",
        async: false,
        success: function (result) {
            $('#menuListBody').html("");
            $.each(result, function (i, item) {
                var tr = "<tr>";
                tr += "<td>" + item.Title + "<input type='hidden' id='title_" + item.ID + "' value=" + item.Title + "  /></td>";
                tr += "<td>" + item.RowNumber + "<input type='hidden' id='row_number_" + item.ID + "' value=" + item.RowNumber + "  /></td>";

                if (item.IsActive == true) {
                    tr += "<td><span class='alert alert-success btn-xs' style='padding:0px;'>Aktif</span></td>";
                    tr += "<td><button type='button' onclick='updateMenuState(" + item.ID + ",false)' class='btn btn-xs btn-danger'>Pasife Al</button><button type='button' onclick='editMenu(" + item.ID + ")' class='btn btn-xs btn-warning'>Düzenle</button></td>";
                } else {
                    tr += "<td><span class='alert alert-danger btn-xs' style='padding:0px;'>Pasif</span></td>";
                    tr += "<td><button type='button' onclick='updateMenuState(" + item.ID + ",true)' class='btn btn-xs btn-success'>Aktife Al</button><button type='button' onclick='editMenu(" + item.ID + ")' class='btn btn-xs btn-warning'>Düzenle</button></td>";
                }

                tr += "</tr>";
                $('#menuListBody').append(tr);
            });
        }
    });
}


function clearMenuInputs() {
    $('#ID').val("");
    $('#Title').val("");
    $('#RowNumber').val("");
}


function editMenu(id) {
    $('#Title').val($('#title_' + id).val());
    $('#ID').val(id);
    $('#RowNumber').val($('#row_number_' + id).val());
}

function addOrEditMenu() {
    var obj = new Object();
    obj.ID = $('#ID').val();
    obj.Title = $('#Title').val();
    obj.RowNumber = $('#RowNumber').val();

    $.ajax('/Admin/addOrEditMenu', {
        type: "Post",
        dataType: "json",
        data: obj,
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getMenuList();
                clearMenuInputs();
            }
        }
    });

}

function updateMenuState(id, state) {

    $.ajax('/Admin/updateMenuState', {
        type: "GET",
        dataType: "json",
        data: { id: id, state: state },
        success: function (result) {
            alertResponse(result);
            if (result.IsSuccess == true) {
                getMenuList();
            }
        }
    });

}

/*menu settings*/
