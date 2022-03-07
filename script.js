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
                    airtable_data.data.about = JSON.parse(this.response).records;
                    airtable_data.data.about = airtable_data.data.channels[0];
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
    about_pane.innerHTML = `
      <h1>${record.fields.Heading}</h1>
      <article>
        ${body}
        <br>
      </article>
      <aside>
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
});

airtable_data.channels().then(record => {
    const about_pane = document.querySelector(".viewport [data-pane='about']");
    about_pane.innerHTML += `
    `;
});