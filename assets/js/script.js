function createCard($case, idx) {
    // render the html for the full card (the basic part + the detail part)
    return `     
    <div id=${idx+1} class="card ${$case.details["case_type"].toLowerCase()}">
        <section>
            <div class="title">${($case.details && $case.details["case_type"]) ? $case.details["case_type"].toUpperCase() : 'no case type'}</div>
            <div>${($case.details && $case.details["case_title"]) ? $case.details["case_title"] : '<span class="title">No case detail</span>'}</div>
        </section>
        <section>
            <div class="title">DATE OF BIRTH</div>
            <div>${($case.patient && $case.patient.dob) ? moment(`${$case.patient.dob}`, 'YYYYMMDD').format('MM/DD/YYYY') : 'No case dob'}</div>
        </section>
        <section>
            <div class="title">CASE NOTES</div>
            <div>${($case.details && $case.details.notes) ? $case.details.notes : 'No case notes'}</div>
        </section>
        <div class="button down"><i class="fas fa-angle-down"></i></div>

        <div class="details">
            <section class="line"><div class="title">PATIENT DETAILS</div></section>
            <section>
                <div class="title">FIRST NAME</div>
                <div>${($case.patient && $case.patient.name && $case.patient.name.first) ? $case.patient.name.first : 'No patient first name'}</div>
            </section>
            <section>
                <div class="title">LAST NAME</div>
                <div>${($case.patient && $case.patient.name && $case.patient.name.last) ? $case.patient.name.last : 'No patient last name'}</div>
            </section>
            <section>
                <div class="title">MRN</div>
                <div>${($case.patient && $case.patient.mrn) ? $case.patient.mrn : 'No patient mrn'}</div>
            </section>

            <section class="line"><div class="title">CASE DETAILS</div></section>
            <section>
                <div class="title">PHYSICIAN</div>
                <div>${($case.details && $case.details.physician) ? $case.details.physician: 'No physician name available'}</div>
            </section>
            <section>
                <div class="title">STARTING TIME</div>
                <div>${($case.details && $case.details.time && $case.details.time.start) ? moment(timeParser(`${$case.details.time.start}`)).format('lll') : 'No starting time available'}</div>
            </section>            
            <section>            
                <div class="title">ENDING TIME</div>
                <div>${($case.details && $case.details.time && $case.details.time.end) ? moment(timeParser(`${$case.details.time.end}`)).format('lll') : 'No ending time available'}</div>
            </section>
            <div class="button up"><i class="fas fa-angle-up"></i></div>
        </div>
    </div>`;
}

function timeParser(time) {
    // split the date and the time of the data and add a T between to make it supported for the momentjs method
    let date = time.toString().substring(0, 8),
        hour = time.toString().substring(8, 12);
    return date.concat('T', hour);
}

function loadCases(data) {
    // hide the loading element
    $("loading").hide();
    // check if the array of data coming back is not empty
    data.cases.length ?
        // loop through each cases
        data.cases.forEach(function($case, idx) {
            // on each case, append the card (created using the createCard function) to the body
            $("body").append(createCard($case, idx));
            // then immediately hides the detail part of the card
            $(`#${idx+1} > .details`).hide();
            // add the event on the "show detail" button
            $(`#${idx+1} > .button.down > i`).click(function() {
                // when clicked, show the details and hide the "show details" button
                $(`#${idx+1} > .details`).show(200);
                $(`#${idx+1} > .button.down > i`).hide();
            });
            // add the event on the "hide detail" button
            $(`#${idx+1} > .details > .button.up > i`).click(function() {
                // when clicked, hide the details and show the "show details" button
                $(`#${idx+1} > .details`).hide(200);
                $(`#${idx+1} > .button.down > i`).show();
            });
        })
        // render a message if the array of cases is empty
        : $("body").append("<div class='title'>There's no cases available.</div>");
}

$(function() {
    // get the data from the endpoint, then call the "loadCases" function
    $.get("https://dalazaro.github.io/ds-json-example/example.json", loadCases)
    // if the get request doesn't go through, the "fail" method is triggered
    .fail(function() {
        $("loading").hide();
        $("body").append('<div class="title">Error: data not found</div>');
    });
})