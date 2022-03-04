m.spinner.acts({
    bind_spinner(_$, args) {
        let iframe = document.createElement("iframe");
        iframe.classList.add("airtable-embed");
        iframe.src = "https://airtable.com/embed/shr2dXeqcnfjqvRbJ?backgroundColor=green";
        iframe.frameborder = "0"
        iframe.onmousewheel = "";
        iframe.width = "100%";
        iframe.height = "533";
        iframe.style = "background: transparent; border: 1px solid #ccc;";
        const help_frame = document.querySelector("[data-pane='help']");

        iframe.addEventListener("load", _$.act.hide);
        help_frame.appendChild(iframe);
    },

    hide(_$, args) {
        _$.me().style.display = "none";
    }
});