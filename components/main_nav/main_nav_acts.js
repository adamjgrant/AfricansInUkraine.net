m.main_nav.acts({
    go_back(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.remove("show-feed-view");
        vp.classList.remove("show-menu-back");
    },

    toggle_filters(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.toggle("show-filters");
    },

    hide_filters(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.remove("show-filters");
    },

    look_for_page_name(_$, args) {
        const page_name = location.pathname.split("/").filter(i => i !== "").reverse()[0];
        if (page_name) _$.act.show_pane({ name: page_name });
    },

    show_pane(_$, args) {
        if (!args.target.dataset || !args.target.dataset.showPane) args.target = args.target.parentElement;
        const name = args.target.dataset.showPane;
        const my_pane = document.querySelector(`[data-pane="${name}"]`);
        _$.act.hide_all_panes();
        my_pane.classList.remove("hide");
        _$.act.hide_filters();
        location.href = `#${name}`;
        _$.act.set_active_tab({ name: name });
    },

    priv: {
        hide_all_panes(_$, args) {
            const panes = Array.from(document.querySelectorAll("[data-pane]"));
            panes.forEach(pane => pane.classList.add("hide"));
        },

        set_active_tab(_$, args) {
            _$.act.unset_all_active_tabs();
            const tab = _$(`[data-show-pane="${args.name}"]`);
            tab.classList.add("active");
        },

        unset_all_active_tabs(_$, args) {
            const tabs = _$("[data-show-pane]");
            tabs.forEach(tab => tab.classList.remove("active"));
        },
    }
})