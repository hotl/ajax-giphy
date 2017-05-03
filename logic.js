const API_URL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&q=";
const topics = ["Dog", "Gudetama", "Rabbit", "Mouse", "Frog", "Sloth"];
const $_animalBtns = $('#animalBtns');
const $_animals = $('#animals');


function btnRender() {
	for (var i = 0; i < topics.length; i++) {
		let topic = topics[i];
		let btn = $('<button>', {
			text: topic,
			click: function() {
				ajaxRequest(topic);
			}
		});
		btn.addClass('btn-topic');
		$_animalBtns.append(btn);
	}

}

function ajaxRequest(topic) {
	$.ajax({
		url: API_URL + topic,
		method: "GET"
	}).done(function(results) {
		console.log(results);
		gifsCreation(results)
	});
}

function gifsCreation(results) {
	$_animals.empty();

	let data = results.data;
	if (!data || data.length === 0) {
		return false;
	}

	for (var i = 0; i < data.length; i++) {
		// URLs for still/animated versions of the GIF
		var animated = data[i].images.fixed_height.url;
		var still = data[i].images.fixed_height_still.url;

		let img = $("<img width='150' height='100'>", {
			alt: 'Img',
			id: 'gif ' + i
		})	// Adding data-attributes for still/animated
			.attr('src', still)
			.attr('data-still', still)
			.attr('data-animated', animated)
			.attr('data-state', 'still')
			.addClass('animal-btn');

		let btn = $('<button>');
		let p = $('<p>').text("Rating: " + data[i].rating);
		btn.append(img).append(p);
		$_animals.append(btn);
	}
}

$(document).on('click', '.animal-btn', function() {
	let state = $(this).attr('data-state');

	switch (state) {
		case 'still':
			$(this).attr('src', $(this).attr('data-animated'));
			$(this).attr('data-state', 'animated');
			break;
		case 'animated':
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
			break;
	}
});

$(document).ready(function() {
	btnRender();
})

