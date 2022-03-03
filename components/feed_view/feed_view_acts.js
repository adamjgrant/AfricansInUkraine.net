m.feed_view.acts({
    load_in_data(_$, args) {
        const record = _$.act.get_record_by_id(args);
        const date = ((datetime_string) => {
            let d = new Date(new Date(datetime_string).toLocaleString("en-US", { timeZone: "Europe/Kiev" }));
            return [d.toDateString(), d.toLocaleTimeString('en-US')].join(" ") + " Ukraine Time";
        })(record.fields["Modified on"]);
        const body = converter.makeHtml(record.fields.Body.replace(/\n/g, "\n\n"));

        _$.me().innerHTML = `
          <h1>${record.fields.Title}</h1>
          <header>
            ${record.fields.Author.name}
            <br>
            Last update: ${date}
            <div class="tags">
              ${m.feed_index.act.make_tags_for_strings({ strings: record.fields.Locations })}
            </div>
          </header>
          <article>${body}</article>
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