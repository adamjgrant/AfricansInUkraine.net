m.main_nav.events(_$ => {
    _$("button.back").addEventListener("click", _$.act.go_back);
    _$("button.menu").addEventListener("click", _$.act.toggle_menu);
    [].concat(Array.from(_$("[data-show-pane]"))).forEach(pane_trigger => {
        console.log(pane_trigger)
        pane_trigger.addEventListener("click", (e) => _$.act.show_pane({ target: e.target }));
    })
});