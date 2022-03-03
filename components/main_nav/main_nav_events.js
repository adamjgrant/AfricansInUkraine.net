m.main_nav.events(_$ => {
    _$("button.back").addEventListener("click", _$.act.go_back);
    _$("button.menu").addEventListener("click", _$.act.toggle_menu);
    const show_pane_buttons = [].concat(Array.from(_$("[data-show-pane]")));
    show_pane_buttons.forEach(pane_trigger => {
        pane_trigger.addEventListener("click", (e) => _$.act.show_pane({ target: e.target }));
    })
    _$.act.show_pane({ target: show_pane_buttons[0] });
});