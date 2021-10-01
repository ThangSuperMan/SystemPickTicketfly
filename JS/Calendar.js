// Selectors
const calendar = document.querySelector(".calendar");
const previousBtn = document.querySelector("#previous-month i");
const nextBtn = document.querySelector("#next-month i");
const contentMonth = document.querySelector("#month-picker");
const contentYear = document.querySelector("#year-picker");
const dayGo = document.querySelectorAll(".point-start__right span");
const exitCalendar = document.querySelector(".calendar i");
const currentDayDisplay = document.querySelector('.point-start__right span:last-child');

// Variables 
const nameMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];


// Functions    
function showDateChooseFly(item) {
    let day = item.innerText;

    // Month plus 1 because month follow index 
    let month = currentMonth.value + 1;
    let year = currentYear.value;

    currentDayDisplay.innerText = `${day}/${month}/${year}`;
}

function handlePickDayFly(event) {
    // Get all days of month
    var daysOfMonth = document.querySelectorAll('.days-of-month div');

    var year = currentYear.value;
    var month = currentMonth.value;

    const dateOfMonths = [31, findFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Get the first day of the month
    let firstDate = new Date(year, month, 1);

    for (let i = 0; i <= dateOfMonths[month] + firstDate.getDay() - 1; i++) {
    
        if (i >= firstDate.getDay()) { 

            //Check the previous picked day and remove the style day be chose
            if(daysOfMonth[i].className === ''){            
            } else if (daysOfMonth[i].className === 'pick-day') {
                // Remove the class pick-day
                daysOfMonth[i].classList.remove('pick-day');
            }
        }
        
    }

    // Add class pick-day for day be chose
    event.target.classList.add('pick-day');

    // Function update the date time and show up for user
    let item = event.target;
    showDateChooseFly(item);

}

function handleDisplayCalendar() {
    calendar.classList.add("active");
}

function handleRemoveCalendar() {
    calendar.classList.remove("active");
}

// FIND THE LEAP YEAR
function isLeapYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0));
}

function findFebDays(year) {
    return isLeapYear(year) ? 29 : 28;
}

// Generate calendar
function generateCalendar(year, month) {
    let dateOfMonth = document.querySelector(".days-of-month");
    dateOfMonth.innerHTML = "";

    const dateOfMonths = [31, findFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currentDate = new Date();

    // Get the first day of the month
    let firstDate = new Date(year, month, 1);

    for (let i = 0; i <= dateOfMonths[month] + firstDate.getDay() - 1; i++) {
        let day = document.createElement("div");

        if (i >= firstDate.getDay()) {
            // Add event when the user click 1 day in calendar
            day.addEventListener('click', handlePickDayFly)

            day.innerHTML = (i - firstDate.getDay()) + 1;
            day.innerHTML += `<span></span>
                                <span></span>
                                <span></span>
                                <span></span>`;

            // Check current day then highlight it
            if (i - firstDate.getDay() + 1 == currentDate.getDate() && month == currentDate.getMonth() && year == currentDate.getFullYear()) {
                day.classList.add("current-date");

                // Remove the animation 
                day.innerHTML = (i - firstDate.getDay()) + 1;
            }
        }

        dateOfMonth.appendChild(day);

    }

    // Update the content of month and year
    contentMonth.children[1].innerText = nameMonths[month];
    contentYear.innerText = year;

}

let currentDate = new Date();
let currentYear = { value: currentDate.getFullYear() };
let currentMonth = { value: currentDate.getMonth() };

generateCalendar(currentYear.value, currentMonth.value);


// Event Listeners
exitCalendar.addEventListener('click', handleRemoveCalendar);

dayGo.forEach((item) => item.addEventListener("click", handleDisplayCalendar));

previousBtn.addEventListener("click", () => {
    // Check when the month out of January
    // 0 is January
    if (currentMonth.value === 0) {
        currentYear.value = currentYear.value - 1;
        currentMonth.value = 11;

        // Generate the calendar with the previous month
        generateCalendar(currentYear.value, currentMonth.value);

    } else {
        currentMonth.value = currentMonth.value - 1;
        // Generate the calendar with the previous month
        generateCalendar(currentYear.value, currentMonth.value);
    }

})

nextBtn.addEventListener("click", () => {
    // Check when the month out of December
    if (currentMonth.value === 11) {
        currentYear.value = currentYear.value + 1;
        currentMonth.value = 0;

        // Generate the calendar with the previous month
        generateCalendar(currentYear.value, currentMonth.value);

    } else {
        currentMonth.value = currentMonth.value + 1;

        // Generate the calendar with the previous month
        generateCalendar(currentYear.value, currentMonth.value);
    }
})

