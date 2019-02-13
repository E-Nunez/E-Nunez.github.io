$(window).on('scroll', function() {
	$('.target').each(function() {
		if($(window).scrollTop() >= $(this).offset().top) {
			var id = $(this).attr('id');
			$('#sidenav ul li a').removeClass('active');
			$('#sidenav ul li a[href="#'+ id +'"]').addClass('active');
		}
	});
});
	
$('.popover-dismiss').popover({
	trigger: 'focus'
});

$("#sidenav li").mouseenter(function() {
	$("i", this).hide();
	$("p", this).show();
});

$("#sidenav li").mouseleave(function() {
	$("i", this).show();
	$("p", this).hide();
});

$("#hello").mouseenter(function() {
	$(this).hide();
	$("#welcome, #welcome p").show();
	$("#welcome p").writeText("Welcome to my Portfolio!");
});

$("#welcome").mouseleave(function() {
	$("#welcome p").remove();
	$("#welcome").append( '<p class="pt-3" style="display: none;"></p>' );
	$("#hello").show();
});

(function($) {
	$.fn.writeText = function(content) {
		var contentArray = content.split(""),
		current = 0,
		elem = this;
		setInterval(function() {
			if(current < contentArray.length) {
				elem.text(elem.text() + contentArray[current++]);
			}
		}, 100);
	};
})(jQuery);

let appId = 'b8c56aee093070462583520cad843b7e';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
};

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(` http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units} `).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
};

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.getElementById('weatherbg').style.backgroundImage = 'url("./img/clear.jpg")';
            break;

        case 'Clouds':
            document.getElementById('weatherbg').style.backgroundImage = 'url("./img/cloudy.jpg")';
            break;

        case 'Rain':
            document.getElementById('weatherbg').style.backgroundImage = 'url("./img/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.getElementById('weatherbg').style.backgroundImage = 'url("./img/storm.jpg")';
            break;

        case 'Snow':
            document.getElementById('weatherbg').style.backgroundImage = 'url("./img/snow.jpg")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    let weatherMsg = document.getElementById('weatherMsg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    weatherMsg.style.visibility = "hidden";
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
};

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
});