m.main_nav.iframes = {
    // map: "https://liveuamap.com/"
    map: "https://www.google.com/maps/d/embed?mid=180u1IkUjtjpdJWnIC0AxTKSiqK4G6Pez&hl=en_US&ehbc=2E312F"
}
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

    has_page_name(_$, args) {
        const page_name = location.pathname.split("/").filter(i => i !== "").reverse()[0];
        return !!page_name;
    },

    look_for_page_name(_$, args) {
        const page_name = location.pathname.split("/").filter(i => i !== "").reverse()[0];
        if (page_name) _$.act.show_pane({ name: page_name });
    },

    show_pane(_$, args) {
        let name = args.name;
        if (!name) {
            if (!args.target.dataset || !args.target.dataset.showPane) args.target = args.target.parentElement;
            name = args.target.dataset.showPane;
        }
        const my_pane = document.querySelector(`[data-pane="${name}"]`);
        _$.act.hide_all_panes();
        my_pane.classList.remove("hide");
        _$.act.hide_filters();
        window.history.pushState(window.history.state, `${name}`, `/${name}`);
        _$.act.set_active_tab({ name: name });
        _$.act.load_iframe({ name: name });
    },

    priv: {
        hide_all_panes(_$, args) {
            const panes = Array.from(document.querySelectorAll("[data-pane]"));
            panes.forEach(pane => pane.classList.add("hide"));
        },

        load_iframe(_$, args) {
            if (!args.name || !m.main_nav.iframes[args.name]) return console.info(`No iframe for ${args.name}`);
            const pane = document.querySelector(`[data-pane="${args.name}"] .iframe-container`);
            const iframe = document.createElement("iframe");
            iframe.src = m.main_nav.iframes[args.name];
            pane.innerHTML = "";
            pane.appendChild(iframe);
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