// select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML
const suggestionsElement: HTMLElement = document.getElementById('suggestions') as HTMLElement
const sunElement: HTMLSelectElement = document.getElementById('sun') as HTMLSelectElement
const moonElement: HTMLSelectElement = document.getElementById('moon') as HTMLSelectElement
const risingElement: HTMLSelectElement = document.getElementById('rising') as HTMLSelectElement


// Here, when the value of sun is changed, we will call the method postAndUpdate.
// Do the same for moon and rising
sunElement.addEventListener('change', postAndUpdate);
moonElement.addEventListener('change', postAndUpdate);
risingElement.addEventListener('change', postAndUpdate);


// : Define a type for the request data object here.
type MatchesRequestData = {
    sun: string;
    moon: string;
    rising: string;
}

// : Define a type for the response data object here.
type Matches = {
    matches: string[]
}

function postAndUpdate(): void {
    // empty the suggestionList (you want new suggestions each time someone types something new)
    //  HINT: use .innerHTML
    suggestionsElement.innerHTML = "";

    // add a type annotation to make this of type MatchesRequestData
    const postParameters: MatchesRequestData = {
        sun: sunElement.value,
        moon: moonElement.value,
        rising: risingElement.value
        // get the text inside the input box
        //  HINT: use sun.value to get the value of the sun field, for example
    };

    // make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!

// Example POST method implementation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    postData('http://localhost:4567/matchmaking', postParameters)
        // .then((response: Response) => response.json())
        .then((data: Matches) => {
            updateSuggestions(data.matches);
        });


    // Call and fill in the updateSuggestions method in one of the .then statements in the Promise
    //  Parse the JSON in the response object
    //  HINT: remember to get the specific field in the JSON you want to use

}

function updateSuggestions(matches: string[]): void {
    // for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.

    suggestionsElement.innerHTML = "";
    for (let i: number = 0; i < matches.length; i++) {
        suggestionsElement.innerHTML += `<li tabindex="${i}">${matches[i]}</li>`
    }

}

//  create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

document.addEventListener("keyup", function () {
    updateValues("Leo", "Aquarius", "Scorpio").then(postAndUpdate);
})

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void> {
    // This line asynchronously waits 1 second before updating the values.
    // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
    await new Promise(resolve => setTimeout(resolve, 1000));

    sunElement.value = sunval;
    moonElement.value = moonval;
    risingElement.value = risingval;
}
