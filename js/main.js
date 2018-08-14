const employeeDivs = document.querySelectorAll('div.employee');
const modalWindows = document.getElementsByClassName('modalWindow');
const closeSpans = document.getElementsByClassName('close'); 
let employeesArr = [];

// -----------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------

function fetchAndAddToPage() { return fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture,cell,dob')
    .then(response => response.json())
    .then(data => {
        employeesArr = data.results
        addToPage(employeesArr);
        addEventHandlers()
    })
};

fetchAndAddToPage();

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function addToPage(arr) {

    for (let i = 0; i < arr.length; i++) {
        const employee = arr[i];
        const html = `
                    <div class ="modalWindow" >
                        <div class="modalContent">
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
                        </div>
                    </div>
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


function addEventHandlers() {
    
    for (let i = 0; i < employeeDivs.length; i++) {
        const employeeDiv = employeeDivs[i];
        const modalWindow = modalWindows[i];
        const closeSpan = closeSpans[i];

        closeSpan.addEventListener('click', function() {
                modalWindow.style.display = "none";
        })

        modalWindow.addEventListener('click', function(e) {
                modalWindow.style.display = "none";
        })

        employeeDiv.addEventListener('click', function (e) {
            if (e.target.tagName !== 'SPAN' && e.target !== modalWindow) {
                modalWindow.style.display = "block";
            }
        })
    };
}
