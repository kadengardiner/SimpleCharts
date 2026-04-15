const hospitals = [
    {
        id: 'atrius',
        name: 'Atrius Health',
        baseUrl: 'https://myhealth.atriushealth.org/MyChart',
        paths: {
            schedule: '/Scheduling',
            results: '/app/test-results',
            meds: '/Clinical/Medications',
            billing: '/Billing/Summary',
            messages: '/app/communication-center',
            upcoming: '/Visits',
        },
    },
    {
        id: 'mgb',
        name: 'Mass General Brigham',
        baseUrl: 'https://patientgateway.massgeneralbrigham.org/mychart-PRD',
        paths: {
            schedule: '/Scheduling',
            results: '/app/test-results',
            meds: '/Clinical/Medications',
            billing: '/Billing/Summary',
            messages: '/app/communication-center',
            upcoming: '/Visits',
        },
    },
    {
        id: 'bilh',
        name: 'Beth Israel Lahey Health',
        baseUrl: 'https://mychart.bilh.org/MyChart-BILH',
        paths: {
            schedule: '/Scheduling',
            results: '/app/test-results',
            meds: '/Clinical/Medications',
            billing: '/Billing/Summary',
            messages: '/app/communication-center',
            upcoming: '/Visits',
        },
    },
    {
        id: 'umass',
        name: 'UMass Memorial Health',
        baseUrl: 'https://mychartonline.umassmemorial.org/MyChart',
        paths: {
            schedule: '/Scheduling',
            results: '/app/test-results',
            meds: '/Clinical/Medications',
            billing: '/Billing/Summary',
            messages: '/app/communication-center',
            upcoming: '/Visits',
        },
    },
    {
        id: 'bmc',
        name: 'Boston Medical Center',
        baseUrl: 'https://mychart.bmc.org/MyChart',
        paths: {
            schedule: '/Scheduling',
            results: '/app/test-results',
            meds: '/Clinical/Medications',
            billing: '/Billing/Summary',
            messages: '/app/communication-center',
            upcoming: '/Visits',
        },
    },
]

export default hospitals