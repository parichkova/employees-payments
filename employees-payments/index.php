<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="./client/styles/main.css">
    </head>
    <body>
        <div class="employees-app">
            <header class="employees-app--header">
                <h1 class="employees-app--title">Employees Taxes Information</h1>
            </header>
            <div class="search-form">
                <div class="custom-input-field has-icon">
                    <input type="text" class="custom-input user-input" placeholder="Enter name">
                    <i class="material-icons">person</i>
                </div>
            <div class="suggestions-box-holder hidden">
                <ul class="suggestions-box"></ul>
            </div>
            </div>
            <div class="user-data-fields">
            <p id="user-message"></p>
            <p> Income Tax: <span id="income-tax-field"></span></p>
            <p> National Insurance: <span id="national-insurance-field"></span></p> 
        </div>
        <script src="client/js/main.js"></script>
    </body>
</html>
