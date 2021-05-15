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

        let genderValue = $('#genderLable').html().trim().toLowerCase();
        if(genderValue){
            $('.genderRadio[value = ' + genderValue + ']').prop('checked', true);
        } else {
            $('.genderRadio[value = ""]').prop('checked', true);
        }
        $('#genderLable').css({ display: "none" });
        $('#genderDiv').css({ display: "block" });
        

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
                let arr = result.birthday.split("/");
                let birthdayFormat = arr[2] + "-" + arr[0] + "-" + arr[1];
                $('#birthday').val(birthdayFormat);
                $('#birthday').attr("disabled", "true");
                $('#addressLine').val(result.address.addressLine);
                $('#addressLine').attr("disabled", "true");
                $('#apartment_suite_unitNumber').val(result.address.apartment_suite_unitNumber);
                $('#apartment_suite_unitNumber').attr("disabled", "true");
                $('#city').val(result.address.city);
                $('#city').attr("disabled", "true");
                $('#county').val(result.address.county);
                $('#county').attr("disabled", "true");
                $('#state').val(result.address.state);
                $('#state').attr("disabled", "true");
                $('#postalCode').val(result.address.postalCode);
                $('#postalCode').attr("disabled", "true");
                $('#insuranceName').val(result.insurance.insuranceName);
                $('#insuranceName').attr("disabled", "true");
                $('#medicalGroupNumber').val(result.medicalGroupNumber);
                $('#medicalGroupNumber').attr("disabled", "true");
                $('#medicalid').val(result.medicalid);
                $('#medicalid').attr("disabled", "true");

                $('#genderLable').html(result.gender);
                $('#genderLable').css({ display: "inline" });
                $('#genderDiv').css({ display: "none" });

                let raceValue = $('#raceaft').val();
                $('#racebef').val(raceValue);
                $('#raceaft').css({ display: "none" });
                $('#racebef').css({ display: "block" });

                let ethnicityValue = $('#ethnicityaft').val();
                $('#ethnicitybef').val(ethnicityValue);
                $('#ethnicityaft').css({ display: "none" });
                $('#ethnicitybef').css({ display: "block" });

                let insuranceTypeValue = $('#insuranceTypeaft').val();
                $('#insuranceTypebef').val(insuranceTypeValue);
                $('#insuranceTypeaft').css({ display: "none" });
                $('#insuranceTypebef').css({ display: "block" });

                $("#editSubmit").css({ display: "none" })
            })
        } catch (error) {
            alert(error);
        }
    });



})(jQuery);
