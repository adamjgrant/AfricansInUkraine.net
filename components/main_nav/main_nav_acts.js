m.main_nav.acts({
    go_back(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.remove("show-feed-view");
        vp.classList.remove("show-menu-back");
    },

    toggle_menu(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.toggle("show-menu");
    },

    hide_menu(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.remove("show-menu");
    },

    show_pane(_$, args) {
        const name = args.target.dataset.showPane;
        const my_pane = document.querySelector(`[data-pane="${name}"]`);
        _$.act.hide_all_panes();
        my_pane.classList.remove("hide");
        _$.act.hide_menu();
    },

    priv: {
        hide_all_panes(_$, args) {
           const panes = Array.from(document.querySelectorAll("[data-pane]"));
           panes.forEach(pane => pane.classList.add("hide"));
        }
    }
})