// The Code propose

/* This is the Client Side JS code which we use to take the information from the user and getting the corresponding data from the external API */
/* All of this during the connections between the external API and our server */

// Declaring of the variables 

/* Global Variables */
const API_KEY = "&appid=ae98acc53a919213ca149a1958df1130&units=imperial";
const API_URL = "http://localhost:3000/";
let get_ZIP = document.getElementById('zip');
let get_Feelings = document.getElementById('feelings');
let get_Date = document.getElementById('date');
let get_Temp = document.getElementById('temp');
let get_Content = document.getElementById('content');
let error_Catch = (error) => console.error('Some ErrorHas Been => ', error);

// Declaring the main functions

/* Declaring a function posting the data to the API */
function on_Gen() {
    let data = {
        ZIP: get_ZIP.value,
        content: get_Feelings.value,
        date: new Date()
    };
/* Declaring a function geting the ZIP code information from the API */
async function ZIP_Info(ZIP) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${ZIP}${API_KEY}`)).json()
};

/* Post Data To Api For Get Zip Code Information */
ZIP_Info(data.ZIP).then(zipInfo => {
    // If error
    if (zipInfo.cod != 200)
        return alert(zipInfo.message)
    // If Ok
    data.temp = zipInfo.list[0].main.temp;
    post_Data(data);
}).catch(error_Catch);
};

// Main code and the posting functions

/* Posting the data to the server and catching if there is an error or not */
async function post_Data(data) {
    let response = await fetch(`${API_URL}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Sorry you entered an inavlid ZIP Code');
            return;
        };
       
        response.json().then(data => {
            if (response.ok)
                UI_Update();
            else
                alert('Sorry you entered an inavlid ZIP Code');
        }).catch(error_Catch);

    } catch (error) {
        error_Catch(error);
    };
};

/* Declaring the updating function to the UI  */
async function UI_Update() {
    let response = await fetch(`${API_URL}getAll`);
    try {
        response.json().then(data => {
            get_Date.innerHTML = `Today's date is: ${data.date}`;
            get_Temp.innerHTML = `Today's temperature is: ${data.temp}`;
            get_Content.innerHTML = `Your are now: ${data.content}`;
        }).catch(error_Catch);
    } catch (error) {
        error_Catch(error);
    };
};

// Adding the event listener 
document.getElementById('generate').addEventListener('click', on_Gen);

// The End of the code