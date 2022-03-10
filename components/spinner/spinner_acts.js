m.spinner.acts({
    bind_spinner(_$, args) {
        /*
        let iframe = document.createElement("iframe");
        iframe.classList.add("airtable-embed");
        iframe.src = "https://airtable.com/embed/shr2dXeqcnfjqvRbJ?backgroundColor=green";
        iframe.frameborder = "0"
        iframe.onmousewheel = "";
        iframe.width = "100%";
        iframe.height = "533";
        iframe.style = "background: transparent; border: 1px solid #ccc;";
        */

        let iframe = document.createElement("iframe");
        iframe.src = "https://docs.google.com/forms/d/15Tbnq-HijSjYEYFjEP5CCUMevY1fy3YU8V4x4_KmTbI/viewform?ts=6223a907&edit_requested=true";
        const help_frame = document.querySelector("[data-pane='help']");

        iframe.addEventListener("load", _$.act.hide);
        help_frame.appendChild(iframe);
    },

    hide(_$, args) {
        _$.me().style.display = "none";
    },

    show(_$, args) {
        _$.me().style.display = "flex";
    }
});