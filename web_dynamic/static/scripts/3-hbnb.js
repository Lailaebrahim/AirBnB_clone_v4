$(document).ready(function () {
  let amenitiesChecked = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitiesChecked[amenityId] = amenityName;
    } else {
      delete amenitiesChecked[amenityId];
    }

    const amenitiesList = Object.values(amenitiesChecked).join(', ');
    $('div.amenities h4').text(amenitiesList);
  });
});


$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});


$.ajax({

    type: 'POST',

    url: 'http://0.0.0.0:5001/api/v1/places_search/',

    contentType: 'application/json',

    data: JSON.stringify({}),

    success: function (data) {

      const placesSection = document.querySelector('section.places');

      placesSection.innerHTML = '';


      data.forEach(place => {

        const article = document.createElement('article');

        article.className = 'place';
	const title = document.createElement('h2');

        title.textContent = place.name;

        article.appendChild(title);


        const priceByNight = document.createElement('div');

        priceByNight.className = 'price_by_night';

        priceByNight.textContent = `$${place.price_by_night}`;

        article.appendChild(priceByNight);


        const info = document.createElement('div');

        info.className = 'info';

        article.appendChild(info);


        const maxGuests = document.createElement('div');

        maxGuests.className = 'max_guests';

        maxGuests.textContent = `${place.max_guests} Guests`;

        info.appendChild(maxGuests);


        const numberRooms = document.createElement('div');

        numberRooms.className = 'number_rooms';

        numberRooms.textContent = `${place.number_rooms} Rooms`;

        info.appendChild(numberRooms);


        const numberBeds = document.createElement('div');

        numberBeds.className = 'number_beds';

        numberBeds.textContent = `${place.number_beds} Beds`;

        info.appendChild(numberBeds);


        const numberBaths = document.createElement('div');

        numberBaths.className = 'number_baths';

        numberBaths.textContent = `${place.number_baths} Baths`;

        info.appendChild(numberBaths);


        placesSection.appendChild(article);

      });

    }

  });

});


