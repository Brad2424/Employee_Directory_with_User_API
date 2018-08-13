
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

const employeeDivs = document.querySelectorAll('div.employee');
let employeesArr = [];

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

const modalContentDivs = document.getElementsByClassName('modalContent');
const modalWindows = document.getElementsByClassName('modalWindow');
const modalWindowLinks = document.getElementsByClassName('modalLink');
const closeSpans = document.getElementsByClassName('close'); 

function addEventHandlers() {
    
    for (let i = 0; i < modalWindowLinks.length; i++) {
        const modalWindowLink = modalWindowLinks[i];
        const modalWindow = modalWindows[i];
        const closeSpan = closeSpans[i];

        modalWindowLink.addEventListener('click', function () {
                modalWindow.style.display = "block";
        })

        closeSpan.addEventListener('click', function() {
                modalWindow.style.display = "none";
        })

        // window.onclick = function(event) {
        //     if (event.target == modalWindow[i]) {
        //         modalWindow.style.display = "none";
        //     }
        // }
    }
}