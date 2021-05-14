(function ($) {
    $('#changeUsername').on("click", function () {
        $('#username').removeAttr("disabled");
        // $('#username').width("70%");
        $('#username').after("<input id='updateUser' type='button' class='w-100 btn btn-primary' value='submit'>");
        $('#changeUsername').unbind("click");
    });

    $('#usernameDiv').on("click", "#updateUser", function () {
        let username = $('#username').val();
        try {
            if (!username) {
                throw "No username provided";
            }
            let requestConfig = {
                method: "POST",
                url: '/users/account1/',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username
                })
            }
            $.ajax(requestConfig).then(function (result) {
                $('#username').val(result.username);
                $('#username').attr("disabled", "true");
                $('#updateUser').remove();
            })
        } catch (error) {
            alert("No username provided");
        }
    });

    $('#changePassword').on("click", function () {
        $('#password').removeAttr("disabled");
        $('#password').attr("type", "text");
        $('#password').after("<input id='updatePsw' type='button' class='w-100 btn btn-primary' value='submit'>");
        $('#changePassword').unbind("click");
    });

    $('#passwordDiv').on("click", "#updatePsw", function () {
        let password = $('#password').val();
        try {
            if (!password) {
                throw "No password provided";
            }
            let requestConfig = {
                method: "POST",
                url: '/users/account2/',
                contentType: 'application/json',
                data: JSON.stringify({
                    password: password
                })
            }
            $.ajax(requestConfig).then(function (result) {
                $('#password').val(result.password);
                $('#password').attr("type", "password");
                $('#password').attr("disabled", "true");
                $('#updatePsw').remove();
            })
        } catch (error) {
            alert("No password provided");
        }
    });

    $('#edit_info').on("click", function () {
        $('#firstName').removeAttr("disabled");
        $('#lastName').removeAttr("disabled");
        $('#email').removeAttr("disabled");
        $('#birthday').removeAttr("disabled");
        $('#addressLine').removeAttr("disabled");
        $('#apartment_suite_unitNumber').removeAttr("disabled");
        $('#city').removeAttr("disabled");
        $('#county').removeAttr("disabled");
        $('#state').removeAttr("disabled");
        $('#postalCode').removeAttr("disabled");

        let genderValue = $('#genderLable').html().trim();
        $('#genderLable').css({ display: "none" });
        $('#genderDiv').css({ display: "block" });
        $('.genderRadio[value = ' + genderValue + ']').prop('checked', true)

        let raceValue = $('#racebef').val();
        $('#racebef').css({ display: "none" });
        $('#raceaft').css({ display: "block" });
        $("#raceaft").find("option[value='" + raceValue + "']").attr("selected", true);

        let ethnicityValue = $('#ethnicitybef').val();
        $('#ethnicitybef').css({ display: "none" });
        $('#ethnicityaft').css({ display: "block" });
        $("#ethnicityaft").find("option[value='" + ethnicityValue + "']").attr("selected", true);

        let insuranceTypeValue = $('#insuranceTypebef').val();
        $('#insuranceTypebef').css({ display: "none" });
        $('#insuranceTypeaft').css({ display: "block" });
        $("#insuranceTypeaft").find("option[value='" + insuranceTypeValue + "']").attr("selected", true);

        $('#insuranceName').removeAttr("disabled");
        $('#medicalGroupNumber').removeAttr("disabled");
        $('#medicalid').removeAttr("disabled");

        $("#editSubmit").css({ display: "block" })
    });

    $('#editForm').submit(function (event) {
        event.preventDefault();
        // $('#editForm').unbind().submit();





        let requestConfig = {
            method: "POST",
            url: '/users/account3/',
            // contentType: 'multipart/form-data',
            dataType: 'json',
            data: $("#editForm").serialize(),
            // contentType: 'application/json',
            // data: JSON.stringify({
            //     password: password
            // })
        }
        try {
            $.ajax(requestConfig).then(function (result) {
                $('#firstName').val(result.name.firstName);
                $('#firstName').attr("disabled", "true");
                $('#lastName').val(result.name.lastName);
                $('#lastName').attr("disabled", "true");
                $('#email').val(result.email);
                $('#email').attr("disabled", "true");
                $('#birthday').val(result.birthday);
                $('#birthday').attr("disabled", "true");
                $('#addressLine').val(result.addressLine);
                $('#addressLine').attr("disabled", "true");
                $('#apartment_suite_unitNumber').val(result.apartment_suite_unitNumber);
                $('#apartment_suite_unitNumber').attr("disabled", "true");
                $('#city').val(result.city);
                $('#city').attr("disabled", "true");
                $('#county').val(result.county);
                $('#county').attr("disabled", "true");
                $('#state').val(result.state);
                $('#state').attr("disabled", "true");
                $('#postalCode').val(result.postalCode);
                $('#postalCode').attr("disabled", "true");
                $('#insuranceName').val(result.insuranceName);
                $('#insuranceName').attr("disabled", "true");
                $('#medicalGroupNumber').val(result.medicalGroupNumber);
                $('#medicalGroupNumber').attr("disabled", "true");
                $('#medicalid').val(result.medicalid);
                $('#medicalid').attr("disabled", "true");

                $('#genderLable').html(result.gender);
                $('#genderLable').css({ display: "block" });
                $('#genderDiv').css({ display: "none" });

                $('#racebef').val(result.race);
                $('#racebef').text(result.race);
                $('#racebef').css({ display: "block" });
                $('#raceaft').css({ display: "none" });

                $('#ethnicitybef').val(result.ethnicity);
                $('#ethnicitybef').text(result.ethnicity);
                $('#ethnicitybef').css({ display: "block" });
                $('#ethnicityaft').css({ display: "none" });

                $('#insuranceTypebef').val(result.insurance);
                $('#insuranceTypebef').text(result.insurance);
                $('#insuranceTypebef').css({ display: "block" });
                $('#insuranceTypeaft').css({ display: "none" });

                $("#editSubmit").css({ display: "none" })
            })
        } catch (error) {
            alert(error);
        }
    });



})(jQuery);
