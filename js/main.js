const employeeDivs = document.querySelectorAll('div.employee');
const modalWindows = document.getElementsByClassName('modalWindow');
const closeSpans = document.getElementsByClassName('close'); 
let employeesArr = [];
let allNames = [];

// -----------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------

function fetchAndAddToPage() { return fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture,cell,dob')
    .then(response => response.json())
    .then(data => {
        employeesArr = data.results
        allNames = data.results.map(employee => {
            return employee.name
        });
        console.log(data.results);
        addToPage(employeesArr);
        addEventHandlers();
        addAutoComplete();
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
                        <span class="close">&times;</span>
                        <div class="modalContent">
                            <img src="${employee.picture.large}" alt="faceshot of ${employee.name.first} ${employee.name.last}">
                            <div class="personalInfo">
                                <h2 id="name">${employee.name.first} ${employee.name.last}</h2><br>
                                <a id="email">${employee.email}</a><br>
                                <p id="location">${employee.location.city}</p>
                            </div>
                            <div class="personalInfo extraInfo">
                                <p id="cell">${employee.cell}</p>
                                <p id="address">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
                                <p id="dob">Birthday: ${employee.dob.date.substring(5,7)}/${employee.dob.date.substring(8,10)}/${employee.dob.date.substring(0,4)}</p>
                            </div>
                        </div>
                    </div>
                    <div class = card>
                        <img src="${employee.picture.medium}" alt="faceshot of ${employee.name.first} ${employee.name.last}">
                        <div class="personalInfo">
                            <h2 id="name">${employee.name.first} ${employee.name.last}</h2><br>
                            <a id="email">${employee.email}</a><br>
                            <p id="location">${employee.location.city}</p>
                        </div>
                    </div>
                    `;

        employeeDivs[i].setAttribute("class", `employee__${i}`);
        employeeDivs[i].setAttribute("data-search", `${employee.name.first}${employee.name.last} ${employee.location.city}`);
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

function addAutoComplete() {
    const firstNames = {
        url: allNames,
        getValue: "first"
        };

    const lastNames = {
        url: allNames,
        getValue: "last"
    };
        
    $(".search-game").easyAutocomplete(firstNames);
    $(".search-game").easyAutocomplete(lastNames);
}