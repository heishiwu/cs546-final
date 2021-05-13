(function ($) {
    // let updateSiteForm = $('.updateSite');
    let deleteSite = $('.deleteSite');
    let deleteData = $('.deleteData');

    updateSiteForm.submit((event) => {
        event.preventDefault();
        updateSiteForm.unbind().submit();
    });

    deleteSite.on("click", function (event) {
        let parent = $(this).parent();
        let id = parent.children('p').html().trim();
        let siteBody = $('#siteBody');
        event.preventDefault();
        let requestConfig = {
            method: "POST",
            url: 'vaccine/vaccineInjectionSite/' + id,
            // contentType: 'application/json',
            // data: JSON.stringify({
            //     _id: id
            // })
        }
        $.ajax(requestConfig).then(function (result) {
            siteBody.clear();
            let content = "";
            result.forEach(element => {
                content += "<tr>" +
                    "<td>" + element.name + "</td>" +
                    "<td>" + element.address.addressLine + "</td>" +
                    "<td>" + element.address.city + "</td>" +
                    "<td>" + element.address.county + "</td>" +
                    "<td>" + element.address.state + "</td>" +
                    "<td>" + element.address.postalCode + "</td>" +
                    "<td>" + element.rating + "</td>" +
                    "<td> <p hidden>" + element._id + "</p> <a class='updateSite' href='#'>Update</a> <a class='deleteSite' href='#'>Delete</a></td>" +
                    "</tr>";
            });
            siteBody.append(content);
        });
        // deleteSite.unbind().submit();
    });

    deleteData.on("click", function (event) {
        let parent = $(this).parent();
        let id = parent.children('p').html().trim();
        let dailydataBody = $('#dailydataBody');
        event.preventDefault();
        let requestConfig = {
            method: "DELETE",
            url: 'daily/dailyData',
            contentType: 'application/json',
            data: JSON.stringify({
                _id: id
            })
        }
        $.ajax(requestConfig).then(function (result) {
            dailydataBody.clear();
            let content = "";
            result.forEach(element => {
                content += "<tr>" +
                    "<td>" + element.dailyCases + "</td>" +
                    "<td>" + element.dailyDeath + "</td>" +
                    "<td>" + element.dailyVaccination + "</td>" +
                    "<td>" + element.dailyRecover + "</td>" +
                    "<td>" + element.sum_of_cases + "</td>" +
                    "<td>" + element.sum_of_death + "</td>" +
                    "<td>" + element.sum_of_vaccination + "</td>" +
                    "<td>" + element.sum_of_recover + "</td>" +
                    "<td>" + element.change_date + "</td>" +
                    "<td> <p hidden>" + element._id + "</p> <a class='updateSite' href='#'>Update</a> <a class='deleteSite' href='#'>Delete</a></td>" +
                    "</tr>";
            });
            dailydataBody.append(content);
        });
        // deleteSite.unbind().submit();
    });

})(jQuery);