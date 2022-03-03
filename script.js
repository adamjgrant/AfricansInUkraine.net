const components = [
    "feed_index",
    "feed_view"
];

// AIRTABLE DATA
const read_only_api_key="keyJs2secz3N4e6FT";
let airtable_data = {
    updates() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.airtable.com/v0/appMFPyBf3gvvhoPD/Updates", true);
            xhr.setRequestHeader("Authorization", `Bearer ${read_only_api_key}`);

            xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.response);
                    resolve(data.records);
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