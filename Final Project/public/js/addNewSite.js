(function ($) {
    let addNewSiteForm = $('#addNewSiteForm');

    addNewSiteForm.submit((event) => {
        event.preventDefault();
        addNewSiteForm.unbind().submit();
    });
})(jQuery);