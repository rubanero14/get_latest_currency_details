const util = require("../utility");

/**
 * Returns a string of scripts to be injected into DOM for web scraping page
 *
 * @param {number} timerInMiliseconds - timer in miliseconds for auto refresh intervals
 * @returns {string} JavaScript code injection into DOM
 */
exports.currencyModel = async (timerInMiliseconds = 60 * 60 * 2 * 1000) => {
  let currencies = [];

  await util
    .currencyValueExtractor()
    .then((data) => (currencies = data))
    .catch(() => (currencies = util.mockData));

  return `
    // Currency data swap every 30 seconds
        const swapInterval = 30000;
        const [create, appendInto] = [${util.create}, ${util.appendInto}];
        const data = ${JSON.stringify(currencies)};
        let [maxAllowed, idx] = [10, 0];
        document.querySelector('body').classList.add('px-5');
        // Last Updated
        const now = new Date(Date.now());
        const log = create("span", "Last Update: " + now.toString(),"text-light log d-flex justify-content-end mb-2");

        const table = create("table", null, "table table-warning table-hover table-bordered mb-0");
        tableWrapper = create("div", null, "table-responsive");
        const linkTask1 = create("a", "&#x25c0; Back to Homepage");

        body.classList.add('container', 'p-0');

        linkTask1.setAttribute('href', '/');
        linkTask1.setAttribute('class', 'mainNav btn btn-custom text-center p-1 mb-3');

        // Table Header
        const headerRow = create("tr");
        const header = create("thead");
        const currencyNameHeader = create("th", "Country Name");
        const countryFlagHeader = create("th", "Country Flag");
        const buyHeader = create("th", "Buy Rate");
        const sellHeader = create("th", "Sell Rate");

        // Table Body
        const tableBody = create("tbody");

        appendInto(headerRow, [
            currencyNameHeader,
            countryFlagHeader,
            buyHeader,
            sellHeader,
        ]);
        appendInto(header, [
            headerRow
        ]);
        appendInto(table, [
            header,
            tableBody
        ]);
        appendInto(tableWrapper, [
            table,
        ]);
        appendInto(body, [
            linkTask1,
            create("br"),
            log,
            tableWrapper,
        ]);

        const generateDynamicTableBody = () => {
            // reset data and DOM
            tableBody.innerHTML = "";

            // Data table display swapping logic
            data.slice(idx, (idx + maxAllowed) > data.length - 1 ? data.length : idx + maxAllowed).map(currency => {
                const formattedCountryName = currency["Currency Name"]
                    .replace("Chinese","China")
                    .replace("Australian","Australia")
                    .replace("Canadian","Canada")
                    .replace("Swiss","Switzerland")
                    .replace("US","United States")
                    .replace("Pound Sterling","Britain")
                    .replace("UAE","United Arab Emirates")
                    .replace("The Euro","European Union")
                    .replace("Danish Kroner","Denmark")
                    .replace("Swedish Kroner","Sweden")
                    .replace("Norwegian Kroner","Norway")
                    .replace("Indonesian Rupiah","Indonesia")
                    .replace("Indian","India")
                    .replace("Thai Baht","Thailand")
                    .replace("South African Rand","South Africa")
                    .replace("ese Yen","")
                    .replace(" Riyal","")
                    .replace(" Dirham","")
                    .replace(" Franc","")
                    .replace(" Dollar","")
                    .replace(" Renminbi","")
                    .replace(" Rupee","")
                    .replace(" Peso","s");

                const bodyRow = create("tr");
                const countryNameBody = create("td", formattedCountryName);
                const countryFlagBody = create("td");
                const countryFlag = create("img", null, "flag");
                countryFlag.setAttribute('src', currency.flag);
                const buyBody = create("td", currency["TT Buy"]);
                const sellBody = create("td", currency["TT Sell"]);

                appendInto(countryFlagBody, [
                    countryFlag
                ]);
                appendInto(bodyRow, [
                    countryNameBody,
                    countryFlagBody,
                    buyBody,
                    sellBody,
                ]);
                appendInto(tableBody, [
                    bodyRow
                ]);
            });
            idx = (idx + maxAllowed) > data.length - 1 ? 0 : idx + maxAllowed;
            setInterval(() => {
                location.reload();
            }, ${timerInMiliseconds});
        }
        generateDynamicTableBody();
        setInterval(() => generateDynamicTableBody(), swapInterval);
    `;
};

exports.wireframeModel = () => `
    const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
    const title = create("h1", "UI/UX Wireframe", "text-center text-light mb-3");
    const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
    const linkTask1 = create("a", "UI/UX Task");
    const pdf = create("embed", null, "text-center w-100 card mb-3");

    linkTask1.setAttribute('href', '/task1/screen1');

    setAttr([linkTask1], { 'class': 'mainNav btn btn-custom text-center me-2 p-1 mb-3'});
    setAttr([pdf], {
        "src": "https://drive.google.com/file/d/1SGjFyFTEqYCvfuxXNOrnzeCuVKe5CBQ0/preview",
        "width": 500,
        "height": 500,
        "allow":"autoplay",
        "type":"application/pdf"
    })

    appendInto(linkWrapper, [
        linkTask1,
    ]);
    appendInto(body, [
        title,
        pdf,
        linkWrapper,
    ]);
`;

exports.homeModel = () => `
    const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
    const title = create("h1", "Tasks", "text-center text-light mb-5");
    const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
    const linkTask1 = create("a", "UI/UX");
    const linkTask2 = create("a", "Website Scraping");
    const linkTask3 = create("a", "News API");
    const linkTask4 = create("a", "Source Code");

    linkTask1.setAttribute('href', '/task1/wireframe');
    linkTask2.setAttribute('href', '/task2');
    linkTask3.setAttribute('href', '/newsapi');
    linkTask4.setAttribute('href', 'https://github.com/rubanero14/get-latest-currency-details');
    setAttr([linkTask1, linkTask2, linkTask3, linkTask4], { 'class': 'mainNav btn btn-custom text-center me-2 p-1 mb-3'});

    appendInto(linkWrapper, [
        linkTask1,
        create("br"),
        linkTask2,
        create("br"),
        linkTask3,
        create("br"),
        linkTask4
    ]);
    appendInto(body, [
        title,
        linkWrapper
    ]);
`;

exports.screen1Model = () => `
    const [create, appendInto, setAttr, createLabel] = [${util.create}, ${util.appendInto}, ${util.setAttr}, ${util.createLabel}];
    const title1 = create("span", "Sila pilih perkhidmatan", "title fw-bold text-center d-flex justify-content-center text-light mb-2");
    const title2 = create("span", "Please select a service", "title text-center d-flex justify-content-center text-light mb-5");
    const linkWrapper = create("div", null, "text-center");

    // button labels
    const label1 = createLabel("Pascabayar", "Postpaid");
    const label2 = createLabel("Peranti Rumah", "Home Fibre");
    const label3 = createLabel("Tawaran Korporat", "Corporate Deals");
    const label4 = createLabel("Perkhidmatan lain-lain", "Other Services");
    const [linkTask1, linkTask2, linkTask3, linkTask4] = [create("a"), create("a"), create("a"), create("a")];
    
    setAttr([linkTask1, linkTask2, linkTask3, linkTask4], {
        'href': '/task1/screen2',
        'class': 'mainNav btn btn-custom text-center p-1 mb-3'
    })

    appendInto(linkTask1, [
        label1,
    ]);
    appendInto(linkTask2, [
        label2,
    ]);
    appendInto(linkTask3, [
        label3,
    ]);
    appendInto(linkTask4, [
        label4,
    ]);
    appendInto(linkWrapper, [
        linkTask1,
        create("br"),
        linkTask2,
        create("br"),
        linkTask3,
        create("br"),
        linkTask4,
    ]);
    appendInto(body, [
        title1,
        title2,
        linkWrapper
    ]);
`;

exports.screen2Model = () => `
    const [create, appendInto, setAttr, createLabel, createSelect] = [${
      util.create
    }, ${util.appendInto}, ${util.setAttr}, ${util.createLabel}, ${
  util.createSelect
}];
    const title1 = create("span", "Sila masukkan nombor telefon anda untuk menerima notis tiket melalui SMS", "title fw-bold text-center d-flex justify-content-center text-light mb-2");
    const title2 = create("span", "Please enter your mobile number to receive notification via SMS", "title text-center d-flex justify-content-center text-light mb-5");
    const form = create("form");
    
    const selectWrapper = create("div", null, "col-12 position-relative text-center mb-3");
    const inputWrapper = create("div", null, "col-12 position-relative text-center mb-3");

    const select = createSelect([
        null,
        'Malaysia',
        'Singapore',
        'Thailand',
        'Indonesia'
    ], "Please select country code..");
    const input = create("input");
    const button = create("button", null, 'mainNav btn btn-custom text-center p-1 w-100 mt-4');

    const selectLabel = createLabel("Kod panggilan negara", "Country code", "text-custom text-center mb-2");
    const inputLabel = createLabel("Nombor telefon", "Mobile number", "text-custom text-center mb-2");
    const buttonLabel = createLabel("Dapatkan tiket", "Get a ticket");

    const selectInvalidTooltip = create("div", "Please select a valid country code", "invalid-tooltip");
    const inputInvalidTooltip = create("div", "Please input valid mobile number, eg: 011-23456789", "invalid-tooltip");

    setAttr([body], {
        'class': 'row g-3 needs-validation text-center px-5',
    })

    setAttr([form], {
        'class': 'row g-3 needs-validation text-center',
        'novalidate': true,
        'action': '/task1/screen6',
        'method': 'get'
    })
    setAttr([input], {
        'class': 'form-control py-2 mt-2',
        'type': 'text',
        'inputmode': 'numeric',
        'pattern': '[0]{1}[1]{1}[0-9]{1}-[1-9]{1}[0-9]{6,7}',
        'required': true
    })
    setAttr([select], {
        'class': 'form-select py-2 mt-2',
        'required': true
    })
    setAttr([button], {'type': 'submit'});
    
    appendInto(button, [buttonLabel]);
    appendInto(selectWrapper, [
        selectLabel,
        select,
        selectInvalidTooltip,
    ]);
    appendInto(inputWrapper, [
        inputLabel,
        input,
        inputInvalidTooltip,
    ]);
    appendInto(form, [
        selectWrapper,
        inputWrapper,
        button
    ]);
    appendInto(body, [
        title1,
        title2,
        form
    ]);
    ${util.bootstrapFormValidation()}
`;

exports.screen6Model = () => `
    const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
    const title1 = create("span", "Terima Kasih", "title text-custom bold text-center d-flex justify-content-center mb-3");
    const title2 = create("span", "Thank You", "title text-custom text-center d-flex justify-content-center mb-3");
    appendInto(body, [
        title1,
        title2
    ]);
`;

exports.notFoundModel = () => `
    const [create, appendInto, setAttr] = [${util.create}, ${util.appendInto}, ${util.setAttr}];
    const title = create("h1", "404: Not Found", "title text-center text-light mb-5");
    const linkWrapper = create("div", null, "d-block d-md-flex justify-content-center");
    const linkTask1 = create("a", "&#x25c0; Back to Homepage");

    setAttr([linkTask1], {
        'href': '/',
        'class': 'mainNav btn btn-custom mb-3 p-1'
    });

    appendInto(linkWrapper, [
        linkTask1,
    ]);
    appendInto(body, [
        title,
        linkWrapper
    ]);
`;

exports.newsAPIModel = () => `
    <style>
      form {
        padding: 30px;
      }
      select, button, input {
        width: 300px;
      }
    </style>
    <form method="POST" action="/newsapi/result">
      <select name="feedType">
        <option selected disabled>Choose a Feed Type</option>
        <option value="all">Everything</option>
        <option value="top">Headlines</option>
      </select>
      <br/><br/>
      <input placeholder="Search" type="text" name="searchQuery"/>
      <br/><br/>
      <select name="category" class="hidden">
        <option selected disabled>Choose a category</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="general">General</option>
      </select> 
      <br class="hidden"/><br class="hidden"/>
      <button>Submit</button>
    </form>
    <script>
      const type = document.querySelector('[name="feedType"]');
      const category = document.querySelectorAll('.hidden');
      type.addEventListener('change', (e) => {
        if(e.target.value === 'all') {
          category.forEach(cat => cat.style.display = 'none');
        } else {
          category.forEach(cat => cat.style.display = 'block');
        }
      })
    </script>
  `;
