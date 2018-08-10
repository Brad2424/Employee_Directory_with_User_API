const employeeDivs = document.querySelectorAll('main div');
let employeesArr = [];

// -----------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------

function fetchData() { return fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture')
    .then(response => response.json())
    .then(data => employeesArr = data.results)
};

fetchData();
generateEmployees(employeesArr);

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function generateEmployees(arr) {

    for (let i = 0; i < arr.length; i++) {
        let employee = arr[i];
        let html = `
                    <img src="${employee.picture.thumbnail.value}" alt="faceshot of ">
                    <h2 id="name">${employee.name.first.value} ${employee.name.last.value}</h2>
                    <p id="email">${employee.email.value}</p><br>
                    <p id="location">${employee.location.city.value}</p>
                    `;

        employeeDivs[i].setAttribute("class", `employee__${i}`)
        employeeDivs[i].innerHTML(html);

    };
}
