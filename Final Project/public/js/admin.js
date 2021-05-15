(function ($) {
     let updateSiteForm = $('.updateSite');
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
            dailydataBody.empty();
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