(function ($) {
    let hasErrors = false;
    function validString(str) {
        if (!str) {
            hasErrors = true;
            return false
        }
        return true;
    }

    let addDailyDataForm = $('#addDailyDataForm');
    let dailyCases = $('#dailyCases');
    let dailyDeath = $('#dailyDeath');
    let dailyVaccination = $('#dailyVaccination');
    let dailyRecover = $('#dailyRecover');
    let sum_of_cases = $('#sum_of_cases');
    let sum_of_death = $('#sum_of_death');
    let sum_of_vaccination = $('#sum_of_vaccination');
    let sum_of_recover = $('#sum_of_recover');
    let change_date = $('#change_date');

    let addDailyData = $('#addDailyData');

    addDailyDataForm.submit((event) => {
        event.preventDefault();
        hasErrors = false;
        addDailyData.prop('disabled', true);

        dailyCases.removeClass('is-invalid is-valid');
        dailyDeath.removeClass('is-invalid is-valid');
        dailyVaccination.removeClass('is-invalid is-valid');
        dailyRecover.removeClass('is-invalid is-valid');
        sum_of_cases.removeClass('is-invalid is-valid');
        sum_of_death.removeClass('is-invalid is-valid');
        sum_of_vaccination.removeClass('is-invalid is-valid');
        sum_of_recover.removeClass('is-invalid is-valid');
        change_date.removeClass('is-invalid is-valid');

        let info = {
            dailyCases: dailyCases.val().trim(),
            dailyDeath: dailyDeath.val().trim(),
            dailyVaccination: dailyVaccination.val().trim(),
            dailyRecover: dailyRecover.val().trim(),
            sum_of_cases: sum_of_cases.val().trim(),
            sum_of_death: sum_of_death.val().trim(),
            sum_of_vaccination: sum_of_vaccination.val().trim(),
            sum_of_recover: sum_of_recover.val().trim(),
            change_date: change_date.val().trim()
        };

        if (!validString(info.dailyCases)) dailyCases.addClass('is-invalid');
        if (!validString(info.dailyDeath)) dailyDeath.addClass('is-invalid');
        if (!validString(info.dailyVaccination)) dailyVaccination.addClass('is-invalid');
        if (!validString(info.dailyRecover)) dailyRecover.addClass('is-invalid');
        if (!validString(info.sum_of_cases)) sum_of_cases.addClass('is-invalid');
        if (!validString(info.sum_of_death)) sum_of_death.addClass('is-invalid');
        if (!validString(info.sum_of_vaccination)) sum_of_vaccination.addClass('is-invalid');
        if (!validString(info.sum_of_recover)) sum_of_recover.addClass('is-invalid');
        if (!validString(info.change_date)) change_date.addClass('is-invalid');
        
        if (!hasErrors) {
            addDailyDataForm.unbind().submit();
        } else {
            addDailyData.prop('disabled', false);
        }
    });

})(jQuery);