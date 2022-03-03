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
            return `
              <div data-component="feed_index_item" data-feed-item-id=${r.id}>
                <h1>${r.fields.Title}</h1>
                <article>${converter.makeHtml(r.fields.Body)}</article>
              </div>
            `;
        },

        bind_rows(_$, args) {
            _$.me().addEventListener("click", (e) => {
                let target = e.target;
                if (!(target && target.dataset && target.dataset.feedItemId)) {
                    target = target.parentNode;
                }
                if (target && target.dataset && target.dataset.feedItemId) {
                    m.feed_view.act.load_in_data({ id: target.dataset.feedItemId });
                }
            });
        }
    }
})