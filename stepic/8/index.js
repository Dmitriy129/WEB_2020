$(document).ready(
    $("button").on("click", () =>
        $("#resizable").width(function (i, val) {
            debugger;
            return val === 100 ? 200 : 100;
        })
    )
);