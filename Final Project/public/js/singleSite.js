(function ($) {
    
    let firstItem = $('.carousel-item')[0];
    $(firstItem).addClass('active');

    // Google Map
    let map;
    let geocoder;

    window.initMap = () => {
        let latlng = new google.maps.LatLng(40.7440, -74.0324); // Hoboken
        let mapOptions = {
            zoom: 15,
            center: latlng
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        geocoder = new google.maps.Geocoder();
        let address = $('#addressLine').html() + ", " + $('#city').html();
        geocoder.geocode({'address': address}, (results, status) => {
            if (status == 'OK') {
                // Display map of the restaurant with a marker
                map.setCenter(results[0].geometry.location);
                
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            }
        });
    }

    // Rating
    function validNumber(num) {
        // Must be a whole integer between 1 and 5
        if (!num|| parseInt(num) < 1 || parseInt(num) > 5) {
            hasErrors = true;
            return false;
        }
        return true;
    }

    let commentForms = $('.comment-form');
    if (commentForms.length > 0) {
        commentForms.each((index) => {
            let currentForm = $(commentForms[index]);
            currentForm.submit((event) => {
                event.preventDefault();

                let commentInput = $('#comment-text');
                commentInput.removeClass('is-invalid is-valid');
                let ratingInput = $('#comment-rating');
                ratingInput.removeClass('is-valid is-invalid');

                let commentText = commentInput.val().trim();
                console.log(".val()")

                console.log(ratingInput)
                let rating = ratingInput.val().trim();
                //let reviewId = currentForm.data('review');
                let hasErrors = false;
                
                if (!commentText) {
                    commentInput.addClass('is-invalid');
                    hasErrors = true;
                }

                if (!validNumber(rating)) {
                    ratingInput.addClass('is-invalid');
                    hasErrors = true;
                }
                
                if (!hasErrors) {
                    let siteId = $('#siteId').html().trim();
                    let requestConfig = {
                        method: 'POST',
                        url: '/vaccineInjectionSite/' + siteId,
                        contentType: 'application/json',
                        data: JSON.stringify({
                            rating: rating,
                            comment: commentText
                        })
                    }

                    $.ajax(requestConfig).then((response) => {
                        let commentList = $('#comment-list');
                        commentList.append("<input type='text' name='comment' class='comment' value='" + response.comment + "'>")
                        commentList.append(response);
                    })
                }
                commentInput.val('');
                ratingInput.val('');
            });
        });
    }
})(jQuery);