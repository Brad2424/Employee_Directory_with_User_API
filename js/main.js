const employeeDivs = document.querySelectorAll('main div');
let employeesArr = [];

fetchData();

// -----------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------

function fetchData() { return fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture')
    .then(response => response.json())
    .then(data => {

        employeesArr = data.results
    })
    .then(generateEmployees(employeesArr))
};

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function generateEmployees(arr) {

    for (let i = 0; i < arr.length; i++) {
        let employee = arr[i];
        let html = `
                    <img src="${employee.picture.thumbnail}" alt="faceshot of ">
                    <h2 id="name">${employee.name.first} ${employee.name.last}</h2>
                    <p id="email">${employee.email}</p><br>
                    <p id="location">${employee.location.city}</p>
                    `;

        employeeDivs[i].setAttribute("class", `employee__${i}`)
        employeeDivs[i].innerHTML(html);

    };
};

