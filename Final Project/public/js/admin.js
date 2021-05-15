(function ($) {
    // let updateSiteForm = $('.updateSiteForm');
    let updateSite = $('.updateSite');
    let deleteSite = $('.deleteSite');
    // let deleteData = $('.deleteData');

    updateSite.on("click", function (event) {
        let parent = $(this).parents('.option');

        let siteid = parent.children('p').html().trim();

        let nameInput = parent.siblings().eq(0);
        let nameValue = nameInput.html().trim();
        nameInput.empty().append("<input type='text' name='name' class='name' value='" + nameValue + "'>");

        let addressLineInput = parent.siblings().eq(1);
        let addressLineValue = addressLineInput.html().trim();
        addressLineInput.empty().append("<input type='text' name='address' class='address' value='" + addressLineValue + "'>");

        let apartment_suite_unitNumberInput = parent.siblings().eq(2);
        let apartment_suite_unitNumberValue = apartment_suite_unitNumberInput.html().trim();
        apartment_suite_unitNumberInput.empty().append("<input type='text' name='apartment_suite_unitNumber' class='apartment_suite_unitNumber' value='" + apartment_suite_unitNumberValue + "'>");

        let cityInput = parent.siblings().eq(3);
        let cityValue = cityInput.html().trim();
        cityInput.empty().append("<input type='text' name='city' class='city' value='" + cityValue + "'>");

        let countyInput = parent.siblings().eq(4);
        let countyValue = countyInput.html().trim();
        countyInput.empty().append("<input type='text' name='county' class='county' value='" + countyValue + "'>");

        let stateInput = parent.siblings().eq(5);
        let stateValue = stateInput.html().trim();
        stateInput.empty().append("<input type='text' name='state' class='state' value='" + stateValue + "'>");

        let postalCodeInput = parent.siblings().eq(6);
        let postalCodeValue = postalCodeInput.html().trim();
        postalCodeInput.empty().append("<input type='text' name='postalCode' class='postalCode' value='" + postalCodeValue + "'>");

        let ratingInput = parent.siblings().eq(7);
        let ratingValue = ratingInput.html().trim();

        parent.children('.upAndDel').attr('hidden','true');
        parent.children('.confirm').removeAttr('hidden');

        event.preventDefault();

        // let updateSiteForm = parent.parents('.updateSiteForm');
        parent.on('click', '.confirm', function (event) {
            event.preventDefault();

            let requestConfig = {
                method: "post",
                url: '/vaccineInjectionSite/update',
                contentType: 'application/json',
                data: JSON.stringify({
                    siteId: siteid,
                    name: nameValue,
                    address: {
                        addressLine: addressLineInput.children().val(),
                        apartment_suite_unitNumber: apartment_suite_unitNumberInput.children().val(),
                        city: cityInput.children().val(),
                        county: countyInput.children().val(),
                        state: stateInput.children().val(),
                        postalCode: postalCodeInput.children().val()
                    },
                    rating: ratingValue
                })
            }

            try {
                $.ajax(requestConfig).then(function (result) {
                    nameInput.empty().append(result.name);

                    addressLineInput.empty().append(result.address.addressLine);

                    apartment_suite_unitNumberInput.empty().append(result.address.apartment_suite_unitNumber);

                    cityInput.empty().append(result.address.city);

                    countyInput.empty().append(result.address.county);

                    stateInput.empty().append(result.address.state);

                    postalCodeInput.empty().append(result.address.postalCode);

                    parent.children('.upAndDel').removeAttr('hidden');
                    parent.children('.confirm').attr('hidden','true');
                    // parent.empty().append("<a class='updateSite btn btn-primary' href='#'>Update</a> <a class="deleteSite btn btn-danger" href="#">Delete</a>")

                });
            } catch (error) {
                alert(error);
            }

        });
    })

    deleteSite.on("click", function (event) {
        let parent = $(this).parents('.option');
        // let parent = $(this).parent();
        let id = parent.children('p').html().trim();
        let siteBody = $('#siteBody');
        event.preventDefault();
        let requestConfig = {
            method: "delete",
            url: '/vaccineInjectionSite',
            contentType: 'application/json',
            data: JSON.stringify({
                _id: id
            })
        }
        $.ajax(requestConfig).then(function (result) {
            let trParent = parent.parent();
            trParent.remove();
        });
        // deleteSite.unbind().submit();
    });

})(jQuery);