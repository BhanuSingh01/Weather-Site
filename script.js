
let userLocation = document.getElementById("userLocation"),
   converter = document.getElementById("converter"),
   heading = document.querySelector(".heading"),

   weatherIcon = document.querySelector(".weatherIcon"),
   temprature = document.querySelector(".temprature"),
   feelsLike = document.querySelector(".feelsLike"),
   description = document.querySelector(".description"),
   date = document.querySelector(".date"),
   city = document.querySelector(".city"),

   ground_level_value = document.getElementById("ground_level_value"),
   sea_level_value = document.getElementById("sea_level_value"),
   min_temp_value = document.getElementById("min_temp_value"),
   max_temp_value = document.getElementById("max_temp_value"),
   wind_degree_value = document.getElementById("wind_degree_value"),
   humid_value = document.getElementById("humid_value"),
   wind_speed_value = document.getElementById("wind_speed_value"),
   sunrise_value = document.getElementById("sunrise_value"),
   sunset_value = document.getElementById("sunset_value"),
   cloud_value = document.getElementById("cloud_value"),
   visibility_value = document.getElementById("visibility_value"),
   pressure_value = document.getElementById("pressure_value"),

   Forecast = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?appid={api key}&q=';
WEATHER_DATA_ENDPOINT ='https://api.openweathermap.org/data/2.5/weather?appid={api key}&exclude=minutely&units=metric&';

function findUserLocation(){
    
    fetch(WEATHER_API_ENDPOINT + userLocation.value).then((response)=>response.json()).then((data)=>{
        if(data.cod != "" && data.cod != 200){
            alert(data.message)
            return;
        }
        console.log(data);
        city.innerHTML=data.name +" , " + data.sys.country;
        weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

        fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`).then((response)=>response.json()).then((data)=>{
            console.log(data);

            temprature.innerHTML = tempConverter(data.main.temp);
            feelsLike.innerHTML = 'Feels Like: '+ tempConverter(data.main.feels_like) ;
            description.innerHTML = `<i class = "fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;
            const options={
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            date.innerHTML = getLongFormateDateTime(
                data.dt,
                data.timezone,
                options
            );

            humid_value.innerHTML = Math.round(data.main.humidity) + "<span> %</span>";      
            wind_speed_value.innerHTML = Math.round(data.wind.speed) + "<span> m/s</span>";

            const options1={
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            sunrise_value.innerHTML = getLongFormateDateTime(data.sys.sunrise , data.timezone, options1);
            sunset_value.innerHTML = getLongFormateDateTime(data.sys.sunset , data.timezone, options1);

            cloud_value.innerHTML = Math.round(data.clouds.all) + "<span> %<span/>";
            visibility_value.innerHTML = Math.round(data.visibility) + "<span> m<span/>" ;
            pressure_value.innerHTML = Math.round(data.main.pressure) + "<span> hPa<span/>";

            ground_level_value.innerHTML = Math.round(data.main.grnd_level) + "<span> m</span>";
            sea_level_value.innerHTML = Math.round(data.main.sea_level) + "<span> msl</span>";
            min_temp_value.innerHTML = tempConverter(Math.round(data.main.temp_min));
            max_temp_value.innerHTML = tempConverter(Math.round(data.main.temp_max)) ;
            wind_degree_value.innerHTML = Math.round(data.wind.deg) + "<span> degree</span>";


        });

    });

}


function formatUnixTime(dtValue, offSet ,options){
    const date = new Date((dtValue + offSet)*1000);
    return date.toLocaleTimeString([], {timezone: "UTC", ...options});
}

function getLongFormateDateTime(dtValue , offSet , options){
    return formatUnixTime(dtValue,offSet,options);
}

function tempConverter(temp){
    let tempValue = Math.round(temp);
    let message = "";
    if(converter.value == "°C"){
        message = tempValue+"<span>"+"\xB0C</span>";
    }
    else{
        let ctof = (tempValue*9)/5+32;
        message = ctof+"<span>"+"\xB0F</span>";
    }
    return message;
}


