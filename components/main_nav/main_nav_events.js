m.main_nav.events(_$ => {
    _$("button.back").addEventListener("click", _$.act.go_back);
    _$("button.filters").addEventListener("click", _$.act.toggle_filters);
    const show_pane_buttons = [].concat(Array.from(_$("[data-show-pane]")));
    show_pane_buttons.forEach(pane_trigger => {
        pane_trigger.addEventListener("click", (e) => _$.act.show_pane({ target: e.target }));
    })
    if (!_$.act.has_page_name()) {
        _$.act.show_pane({ target: show_pane_buttons[0] });
    }
    else {
        _$.act.look_for_page_name();
    }
});