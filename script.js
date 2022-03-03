const components = [
    "feed_index",
    "feed_view"
];

const read_only_api_key="keyJs2secz3N4e6FT";

class Component extends Mozart {};
var m = Component.index;

components.forEach(component => new Component(component));