const components = [
    "feed_index",
    "feed_view",
    "main_nav",
    "spinner"
];

// AIRTABLE DATA
const read_only_api_key = "keyJs2secz3N4e6FT";
let airtable_data = {
    data: {
        updates: []
    },
    updates() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.airtable.com/v0/appMFPyBf3gvvhoPD/Updates?view=API", true);
            xhr.setRequestHeader("Authorization", `Bearer ${read_only_api_key}`);

            xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    airtable_data.data.updates = JSON.parse(this.response).records;
                    resolve(airtable_data.data.updates);
                } else {
                    reject();
                }
            };

            xhr.onerror = function() {
                reject();
                // There was a connection error of some sort
            };

            xhr.send();
        })
    },

    about() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.airtable.com/v0/appMFPyBf3gvvhoPD/About?view=API&maxRecords=1", true);
            xhr.setRequestHeader("Authorization", `Bearer ${read_only_api_key}`);

            xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    airtable_data.data.about = JSON.parse(this.response).records;
                    airtable_data.data.about = airtable_data.data.about[0];
                    resolve(airtable_data.data.about);
                } else {
                    reject();
                }
            };

            xhr.onerror = function() {
                reject();
                // There was a connection error of some sort
            };

            xhr.send();
        })
    },

    channels() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.airtable.com/v0/appMFPyBf3gvvhoPD/Channels?view=About%20Page", true);
            xhr.setRequestHeader("Authorization", `Bearer ${read_only_api_key}`);

            xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    airtable_data.data.channels = JSON.parse(this.response).records;
                    airtable_data.data.channels = airtable_data.data.channels;
                    resolve(airtable_data.data.channels);
                } else {
                    reject();
                }
            };

            xhr.onerror = function() {
                reject();
                // There was a connection error of some sort
            };

            xhr.send();
        })
    }
}

const converter = new showdown.Converter();
class Component extends Mozart {};
let m = Component.index;

components.forEach(component => new Component(component));

// Duplicate filters into updates pane for desktop view
const filters = document.querySelector("ul.filters");
const updates_pane = document.querySelector(".viewport [data-pane='updates']");
updates_pane.innerHTML += `<ul class="filters"><h1>Filters</h1>${filters.innerHTML}</ul>`;

// Populate about page
airtable_data.about().then(record => {
    const about_pane = document.querySelector(".viewport [data-pane='about']");
    const body = converter.makeHtml(record.fields.Body.replace(/\n/g, "\n\n"));
    about_pane.innerHTML += `
      <article>
        <h1>${record.fields.Heading}</h1>
        <img src="${record.fields.Logo ? record.fields.Logo[0].thumbnails.large.url : ""}">
        ${body}
        <br>
        <div class="donate">
            <h2>Donate</h2>
            <img src="${record.fields["Donate QR code"] ? record.fields["Donate QR code"][0].thumbnails.large.url : ""}">
            <p><a href="${record.fields["Donate Link"]}">
              ${record.fields["Donate Text"]} 
            </a></p>
        </div>
      </article>
      <aside>
        <h2>Social Media</h2>
        <div class="social">
          <a href="https://instagram.com/${record.fields["Instagram handle"]}">
            <i class="fa-brands fa-instagram"></i>
            @${record.fields["Instagram handle"]}
          </a>
        </div>
        <div class="social">
          <a href="https://twitter.com/${record.fields["Twitter handle"]}">
            <i class="fa-brands fa-twitter"></i>
            @${record.fields["Twitter handle"]}
          </a>
        </div>
      </aside>
    `;

    airtable_data.channels().then(records => {
        const about_pane_aside = document.querySelector(".viewport [data-pane='about'] aside");
        let html = "<h2>Telegram Groups</h2>";
        records.forEach(record => {
            html += `
            <div class="group">
                <h1><a href="${record.fields.Link}"><i class="fa-brands fa-telegram"></i> ${record.fields.Name}</a></h1>
                <p>${record.fields.Description}</p>
            </div>
            `;
        });
        html += "</aside>";
        about_pane_aside.innerHTML += html;
    });
});