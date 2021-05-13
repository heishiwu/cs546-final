(function ($) {
    let addDailyDataForm = $('#addDailyDataForm');

    addDailyDataForm.submit((event) => {
        event.preventDefault();
        addDailyDataForm.unbind().submit();
    });
})(jQuery);