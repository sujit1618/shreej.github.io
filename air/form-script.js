const airtableToken = 'patcCtmXb2WYsPu1K.6bc5df61f62b80ef14b66b578978fe6f35447d3f09b1d6dc88e1d93599a1a4a6';

let jobName = {
    old: 'Nokia Boxes',
    new: ''
};

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    document.getElementById('jobName').setAttribute('value', jobName.old);
});


function makeEditable(button) {
    let buttonId = button.id;
    let parentElement = button.parentElement;
    let formId = parentElement.querySelector('input').id;
    document.getElementById(formId).removeAttribute('readonly');

    button.setAttribute('onclick', 'saveValue(this)');
    button.innerHTML = 'Save';
}

function saveValue(button) {
    let buttonId = button.id;
    let parentElement = button.parentElement;
    let formId = parentElement.querySelector('input').id;

    document.getElementById(formId).setAttribute('readonly', '');
    button.setAttribute('onclick', 'makeEditable(this)');
    button.innerHTML = 'Edit';

    jobName.new = document.getElementById(formId).value;
    console.log(jobName.new);
}

//AIRTABLE SHTUFF
function airT() {
    var Airtable = require('airtable');
    var base = new Airtable({
        apiKey: airtableToken
    }).base('appe5vnQC7Rh19mee');

    base('Jobs').select({
        // Selecting the first 3 records in Jobs to be checked for update:
        maxRecords: 3,
        view: "Jobs to be checked for update"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            console.log('Retrieved', record.get('Job Card | Company | Calendar | Quantity'));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}