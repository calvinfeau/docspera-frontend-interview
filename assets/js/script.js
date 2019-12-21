function loadCases(data) {
    $("loading").hide();
    data.cases.forEach(function($case, idx) {
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
        </div>`)
        $(`#${idx+1}`).addClass(`${$case.details["case_type"].toLowerCase()}`)
    });
}

$(function() {
    $.get("https://dalazaro.github.io/ds-json-example/example.json", loadCases)
    .fail(function() {
        $("loading").hide();
        $("body").append('<div class="title">Error: data not found</div>');
    });
})