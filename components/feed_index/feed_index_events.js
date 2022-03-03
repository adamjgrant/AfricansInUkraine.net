m.feed_index.events(_$ => {
  airtable_data.updates().then(records => {
      _$.act.clear();
      _$.act.load_in_data({ records });
  });
});