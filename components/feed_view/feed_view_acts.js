m.feed_view.acts({
    load_in_data(_$, args) {
        const record = _$.act.get_record_by_id(args);
        _$.me().innerHTML = `
          <h1>${record.fields.Title}</h1>
          <article>${converter.makeHtml(record.fields.Body)}</article>
        `;
    },

    priv: {
        get_record_by_id(_$, args) {
            return airtable_data.data.find(record => record.id === args.id);
        }
    }
});