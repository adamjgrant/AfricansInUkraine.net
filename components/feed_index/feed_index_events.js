m.feed_index.events(_$ => {
    airtable_data.updates().then(records => {
        _$.act.clear();
        _$.act.load_in_data({ records });
        m.feed_view.act.load_in_data({ id: records[0].id, silent: true });
    });
});