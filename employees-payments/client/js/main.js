let mainModule = (() => {
    const doc = document;
    let timer = null;
    let button = null;
    let userInputField = null;
    let suggestionsBox = null;

    (function initialise() {
        doc.addEventListener('DOMContentLoaded', () => {
            selectElements();
            addEventListeners();    
        });
    })();

    function selectElements() {
        button = doc.getElementById('butt');
        userInputField = doc.getElementsByClassName('user-input')[0];
        suggestionsBox = doc.getElementsByClassName('suggestions-box')[0];
    }

    function addEventListeners() {
        let userInputEvents = ['input', 'keyup'];

        userInputEvents.forEach((event) => {
            userInputField.addEventListener(event, searchForUser);
        });

        userInputField.addEventListener('blur', () => {
            suggestionsBox.parentNode.classList.add('hidden');
            suggestionsBox.innerHTML = '';
        });
    }

    function searchForUser(ev) {
        let inputValueTrimmed = userInputField.value.trim();
        let lastQuery = '';
        
        clearTimeout(timer);

        if (!inputValueTrimmed) {
            removeSuggestionBoxAndClearQuery();

            return false;
        }

        switch(ev.keyCode) {
            //enter
            case 13:
                //the logic should be the same as clicking the button
                lastQuery = inputValueTrimmed;
                getSingleUserData();
                break;
            case 27:
                ev.stopPropagation();
                userInputField.value = '';
                removeSuggestionBoxAndClearQuery();

                return false;
            case 38:
                ev.stopPropagation();
                previousSuggestion();
                break;
            case 37:
            case 39:
                return false;
            case 40:
                nextSuggestion();

                return false;
            default:
                break;
        }

        if (lastQuery === inputValueTrimmed || inputValueTrimmed.length < 2) {
            return false;
        }

        timer = setTimeout(() => {
            lastQuery = inputValueTrimmed;
            getSuggestionOptions(inputValueTrimmed);
        }, 300);
    }

    function removeSuggestionBoxAndClearQuery() {
        if (suggestionsBox) {
            suggestionsBox.parentNode.classList.add('hidden');
            suggestionsBox.innerHTML = '';
        }

        lastQuery = '';
    }

    function getSuggestionOptions(searchedString) {
        const req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                biuldSuggestionBox(JSON.parse(req.responseText));
            }
        };

        req.open("GET", `../../ttish/server/instantiate.php?searched_name=${searchedString}`, true);
        req.send();
    }

    function biuldSuggestionBox(responseObj) {
        const userMessage = doc.getElementById('user-message');
        let str = '';

        if (responseObj.dbResult && responseObj.dbResult.length) {
            responseObj.dbResult.forEach((el) => {
                str += `<li data-key=${el.id}>${el.first_name} ${el.last_name}</li>`;
            });

            userMessage.innerText = '';
            suggestionsBox.parentNode.classList.remove('hidden');    
        } else {
            userMessage.innerText = 'No such user';
            suggestionsBox.parentNode.classList.add('hidden');
        }

        suggestionsBox.innerHTML = str;

        if (suggestionsBox.children.length) {
            suggestionsBox.addEventListener('click', chooseTarget);
            suggestionsBox.children[0].classList.add('selected');
        }
    }

    function chooseTarget(ev) {
        if (ev.target.nodeName === 'LI') {
            inputValueTrimmed = ev.target.innerText;
            sendSearchQuery();
        }
    
    }
    function previousSuggestion() {
        let el = suggestionsBox.querySelector('.selected');
        
        if (el.previousElementSibling) {
            el.classList.remove('selected');
            el.previousElementSibling.classList.add('selected');
        }
    }

    function nextSuggestion() {
        let el = suggestionsBox.querySelector('.selected');
        
        if (el.nextElementSibling) {
            el.classList.remove('selected');
            el.nextElementSibling.classList.add('selected');
        }
    }

    function getSingleUserData() {
        let selected = suggestionsBox.getElementsByClassName('selected')[0];
        
        if (!selected) {
            return;
        }

        const req = new XMLHttpRequest();
        let id = parseInt(selected.getAttribute('data-key'), 10);

        suggestionsBox.parentNode.classList.add('hidden');
    
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                showUserData(JSON.parse(req.responseText));
            }
        };

        req.open("GET", `../../ttish/server/instantiate.php?show_taxes=true&id=${id}`, true);
        req.send();
    }

    function showUserData(res) {
        if (!res.isValid) {
            return;
        }

        if (res.dbResult) {
            const incomeTax = doc.getElementById('income-tax-field')
            const insurance = doc.getElementById('national-insurance-field');

            if (incomeTax) {
                incomeTax.innerText = res.dbResult[0].income;
            }

            if (insurance) {
                insurance.innerText = res.dbResult[0].insurance;
            }
        }
    }
})();