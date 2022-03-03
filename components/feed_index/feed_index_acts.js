m.feed_index.acts({
    clear(_$, args) {
        _$.me().innerHTML = "";
    },

    load_in_data(_$, args) {
        const markup = args.records.map(record => {
            return _$.act.create_row_markup({ record });
        }).join("");
        _$.me().innerHTML = markup;
        _$.act.bind_rows();
    },

    priv: {
        create_row_markup(_$, args) {
            const r = args.record;

            const date = ((datetime_string) => {
                let d = new Date(new Date(datetime_string).toLocaleString("en-US", { timeZone: "Europe/Kiev" }));
                return [d.toDateString(), d.toLocaleTimeString('en-US')].join(" ") + " Ukraine Time";
            })(r.fields["Modified on"]);

            const truncated_body = ((text) => {
                const truncation_length = 150;
                return text.slice(0, truncation_length) + (text.length > truncation_length ? "..." : "");
            })(converter.makeHtml(r.fields.Body));

            return `
              <div data-component="feed_index_item" data-feed-item-id=${r.id}>
                <h1><a href="#updates-${r.id}">${r.fields.Title}</a></h1>
                <article>${truncated_body}</article>
                <footer>${r.fields.Author.name}<br>${date}</footer>
              </div>
            `;
        },

        bind_rows(_$, args) {
            _$.me().addEventListener("click", (e) => {
                // TODO: Probably a better way to handle propagation
                let target = e.target;
                const good_target = (target) => target && target.dataset && target.dataset.feedItemId;
                if (!good_target(target)) {
                    target = target.parentNode;
                }
                if (!good_target(target)) {
                    target = target.parentNode;
                }
                if (target && target.dataset && target.dataset.feedItemId) {
                    m.feed_view.act.load_in_data({ id: target.dataset.feedItemId });
                }
            });
        }
    }
})