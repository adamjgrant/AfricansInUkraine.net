m.main_nav.acts({
    go_back(_$, args) {
        const vp = document.querySelector(".viewport");
        vp.classList.remove("show-feed-view");
        vp.classList.remove("show-menu-back");
    }
})