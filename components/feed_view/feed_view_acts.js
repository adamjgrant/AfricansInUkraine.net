m.feed_view.acts({
    load_in_data(_$, args) {
        const record = _$.act.get_record_by_id(args);
        const date = ((datetime_string) => {
            let d = new Date(new Date(datetime_string).toLocaleString("en-US", { timeZone: "Europe/Kiev" }));
            return [d.toDateString(), d.toLocaleTimeString('en-US')].join(" ") + " Ukraine Time";
        })(record.fields["Modified on"]);

        _$.me().innerHTML = `
          <h1>${record.fields.Title}</h1>
          <header>${record.fields.Author.name}<br>${date}</header>
          <article>${converter.makeHtml(record.fields.Body)}</article>
        `;
        location.href = `#updates-${record.id}`;

        if (!args.silent) {
            const vp = document.querySelector(".viewport")
            vp.classList.add("show-feed-view");
            vp.classList.add("show-menu-back");
        }
    },

    priv: {
        get_record_by_id(_$, args) {
            return airtable_data.data.updates.find(record => record.id === args.id);
        }
    }
});