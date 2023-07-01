const key = "fdf78662799a8b6f3bd3212c2cb7a8a6"
// this api thing need internet access so check if internet working if ot working code.
// calling variables to change in html
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp p");
const desc = document.querySelector(".description p");
const loc = document.querySelector(".location p")

// storage object for data from api
const weather = {
    "temperature":{
        "value":"--",
        "unit":"celcius",
    },
    "icon":"unkown",
    "description":"--",
    "location":"--",
    "country":"--"
}

// to display above data, manipulate innerhtml pick data value from above object weather
function displayWeather(){
    icon.innerHTML = `<img src="icons/${weather.icon}.png">`;
    // very carefull overiding elements know what how much provided in variable, like in above case we need to mention png out of variable as not deliever by api and out img have same extensions.
    temp.innerHTML = `<p>${weather.temperature.value}<span><sup> o </sup> C </span></p>`;
    // just enter any html code with variable as string and it create that element like above not just text but img or else
    desc.innerHTML=weather.description;
    loc.innerHTML=`${weather.location},${weather.country}`

    // to access data in json file first see what object and properties it have
}


// kelvin to celsius funtion to put while fetching api
function tocelcius(kelvin){
    const cel = Math.floor(kelvin-273);
    return cel;
};
// to convert into ferhenhit
function toferhenhit(cel){
    const farhen = Math.floor((cel*9/5)+32);
    return farhen
}

// adding function of changing cel to ferhen
// addeventlistner takes one even and one function as arguement not other values it shold be in function
temp.addEventListener("click",function(){
    if(weather.temperature.unit == "celcius"){
        const f = toferhenhit(weather.temperature.value)
        weather.temperature.unit="ferhanhit";
        temp.title = "Click to change to Celsius"
        temp.innerHTML = `<p>${f}<span><sup> o </sup> F </span></p>`;
        // create a new p element with span so in ``
    }else{

        temp.innerHTML = `<p>${weather.temperature.value}<span><sup> o </sup> C </span></p>`
        weather.temperature.unit="celcius";
        temp.title = "Click to change to Farhenhit"

    }
    // first we change value to far, and unit to far if unit was cel, but when click if unit is far, change value to cel, and must change back unit to cel.
})

// now all set so get weather using geolocation;
// must see if geolocation working or not if yes return pos, if not return error
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success,error);
}else{
    alert("Your web browser don't support Geolocation!")
}
// geolocation return pos pos we name it it can be name anything but have property of position and other properties on sucess and message on erro as arguement in callback funtions so use them
function success(pos){
    // as the value of pos changes so set let not const
    let lattitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    // upon getting pos coords, we callback function to set request to api with this coords.
    getWeather(lattitude,longitude);
}
function error(err){
    let error = `${err.code}:${err.message}`;
    return error;
}

// now to get weather data using coords and key, this function automaticaly calls as the pos is gotten and that function ends, this is what callbacks done, it wait for that funtion to end.
function getWeather(latt,long){
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${key}`;
    // console.log(api)
    // request api
    fetch(api)
    // what after fetch responded thus .then in its scope ask function create as many then required
        .then(function(respons){
            // as get response as arguement as json file make it text file or object to access
            let data = respons.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = tocelcius(data.main.temp);
            weather.description=data.weather[0].description;
            weather.location=data.name;
            weather.country=data.sys.country;
            weather.icon=data.weather[0].icon;
            // know how to access values deep down to.
            // as description and icon in array so access using index
            // all info in api data so no need to look extra
            
            // now after converting respons to data as object can access it
            // now extract data and send in weather object that created to store weather data
            // as data is also object access like it objectname.property.property convert calvin to cel
            // weather.temperature.value = tocelcius(data);
        })
        .then(function(){
            displayWeather()

        })
        // always call function in then(function(){})
        // now got data use it and display it but do it in .then ladder.

}
