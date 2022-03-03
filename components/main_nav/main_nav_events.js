m.main_nav.events(_$ => {
    _$("button.back").addEventListener("click", _$.act.go_back);
    _$("button.menu").addEventListener("click", _$.act.toggle_menu);
});