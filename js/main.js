const employeeDivs = document.querySelectorAll('div.employee');
const modalWindowLinks = document.querySelectorAll('.modalWindow');
const modalContentDivs = document.querySelectorAll('.modalContent');
let employeesArr = [];

fetchAndAddToPage();

// -----------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------

function fetchAndAddToPage() { return fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture,cell,dob')
    .then(response => response.json())
    .then(data => {
        employeesArr = data.results
        addToPage(employeesArr)
        // addToModalWindow(employeesArr)
    })
    // .then(addToModalWindow(employeesArr))
};

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function addToPage(arr) {

    for (let i = 0; i < arr.length; i++) {
        const employee = arr[i];
        const html = `
                    <img src="${employee.picture.medium}" alt="faceshot of ${employee.name.first} ${employee.name.last}">
                    <div class="personalInfo">
                        <h2 id="name">${employee.name.first} ${employee.name.last}</h2><br>
                        <a id="email">${employee.email}</a><br>
                        <p id="location">${employee.location.city}</p>
                    </div>
                    `;

        employeeDivs[i].setAttribute("class", `employee__${i}`);
        employeeDivs[i].innerHTML += html;
    }
}

function addToModalWindow(arr) {

    for (let i = 0; i < arr.length; i++) {
        const employee = arr[i];
        const html = `
                    <span class="close">&times;</span>
                    <img src="${employee.picture.large}" alt="faceshot of ${employee.name.first} ${employee.name.last}">
                    <div class="personalInfo">
                        <h2 id="name">${employee.name.first} ${employee.name.last}</h2><br>
                        <a id="email">${employee.email}</a><br>
                        <p id="location">${employee.location.city}</p>
                    </div>
                    <div class="personalInfo">
                        <p id="cell">${employee.cell}</p>
                        <p id="address">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p id="dob">${employee.dob.date}</p>
                    </div>                    
                    `;

        modalContentDivs[i].classList.add(`employee__${i}`);
        modalContentDivs[i].innerHTML = html;
    }
}

