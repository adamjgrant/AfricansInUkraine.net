m.spinner.acts({
    hide(_$, args) {
        _$.me().style.display = "none";
    },

    show(_$, args) {
        _$.me().style.display = "flex";
    }
});