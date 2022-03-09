m.feed_index.events(_$ => {
    return; // Disabling
    airtable_data.updates().then(records => {
        _$.act.clear();
        _$.act.load_in_data({ records });
        _$.act.look_for_permalink({ records });
    });
});