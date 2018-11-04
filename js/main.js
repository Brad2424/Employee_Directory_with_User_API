const employeeDivs = document.querySelectorAll('div.employee');
const modalWindows = document.getElementsByClassName('modalWindow');
let employeesArr = [];
let amployeeNames = [];
let employeeLocations = [];

// -----------------------------------------
// FETCH DATA FROM API AND RENDER TO PAGE
// -----------------------------------------

(async () => { 
    let response = await fetch('https://randomuser.me/api/?results=12&nat=nz&inc=name,email,location,picture,cell,dob');
    let data = await response.json();
    let employeesArr = data.results;

    renderEmployee(employeesArr);
    modalButtons();
})();

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function renderEmployee(arr) {

    for (let i = 0; i < arr.length; i++) {
        const employee = arr[i];
        const html = `
            <div class ="modalWindow" >
                <span class="close">&times;</span>

                <div class="modalContent">
                    <span class="left">&#8678;</span>
                    <span class="right">&#8680;</span>
                    <img src="${employee.picture.large}" alt="faceshot of ${employee.name.first} ${employee.name.last}">
                    <div class="personalInfo">
                        <h2 id="name">${employee.name.first} ${employee.name.last}</h2>
                        <a id="email">${employee.email}</a>
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
                    <h2 id="name">${employee.name.first} ${employee.name.last}</h2>
                    <a id="email">${employee.email}</a>
                    <p id="location">${employee.location.city}</p>
                </div>
            </div>
            `;

        employeeDivs[i].setAttribute("class", `employee__${i}`);
        employeeDivs[i].setAttribute("data-search", `${employee.name.first}${employee.name.last} ${employee.location.city}`);

        employeeDivs[i].innerHTML += html;
    }
}


function modalButtons() {
    const closeSpans = document.getElementsByClassName('close');
    const leftSpans = document.getElementsByClassName('left');
    const rightSpans = document.getElementsByClassName('right');
    
    for (let i = 0; i < employeeDivs.length; i++) {
        const closeSpan = closeSpans[i];
        const leftSpan = leftSpans[i];
        const rightSpan = rightSpans[i];
        const employeeDiv = employeeDivs[i];
        const modalWindow = modalWindows[i];

        leftSpan.addEventListener('click', function() {
            modalWindow.style.display = "none";
            modalWindows[i-1].style.display = "block";
        })

        rightSpan.addEventListener('click', function() {
            modalWindow.style.display = "none";
            modalWindows[i+1].style.display = "block";
        })

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
    }
}

// -----------------------------------------
// SEARCH BOX FUNCTIONALITY
// -----------------------------------------

function searchBox() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();

    for (let i = 0; i < employeeDivs.length; i++) {
        if (employeeDivs[i].innerText.toUpperCase().indexOf(filter) > -1) {
            employeeDivs[i].style.display = "";
        } else {
            employeeDivs[i].style.display = "none";
        }
    }
}

