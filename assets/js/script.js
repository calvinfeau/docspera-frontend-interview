function loadCases(data) {
    // hide the loading element
    $("loading").hide();
    // check if the array of data coming back is not empty
    data.cases.length ?
        // loop through each cases
        data.cases.forEach(function($case, idx) {
            // append the html inside the method to the body element
            // the data is rendered dynamically using template literals
            $("body").append(`     
            <div id=${idx+1} class="card">
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
            </div>`);
            // dynamically add a class to each card (after each card is created) to style them with the proper color (surgery / clinical)
            $(`#${idx+1}`).addClass(`${$case.details["case_type"].toLowerCase()}`);
        })
        :
        // render a message if the array of cases is empty
        $("body").append("<div class='title'>There's no cases available.</div>");
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