
var formParser = function (form, cb) {
    // let pr1 = new Promise((resolve, reject) => {
    //     let data = {};
    //     Array.from(form).map(

    //         (e) =>
    //             (e.name && (data[e.name] = e.value)) ||
    //             (e.type === "file" && (() => {
    //                 ;
    //                 if (e.files[0])
    //                     readFile(e.files[0], (text) => {
    //                         data.img = {
    //                             data: text,
    //                             type: e.files[0].type,
    //                             name: e.files[0].name,
    //                             size: e.files[0].size,
    //                         };
    //                         ;
    //                         resolve(data);
    //                     });
    //                 else resolve(data);
    //             })())
    //     );
    // });
    let data = {}
    return new Promise((resolve, reject) => {
        var pr1 = Promise.all(Array.from(form).map(async (e) =>
            (e.name && (data[e.name] = e.value)) ||
            (e.type === "file" &&
                e.files[0] &&
                await readAsDataURL(e.files[0]).then((text) =>
                    data.img = {
                        data: text,
                        type: e.files[0].type,
                        name: e.files[0].name,
                        size: e.files[0].size,
                    }
                )
            )
        ))

        pr1.then((arr) => {
            // //  console.log(arr)
            checkForm(data) ? resolve(data) : alert("Заполните форму полностью")
        });
    })

};


const readAsDataURL = function (file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = function () {
            resolve(fr.result)
        }
        fr.readAsDataURL(file);
    });
}

window.imgOnChange = function (elem) {
    elem.parentNode.lastElementChild.classList = elem.value ? "onload" : "";
};

var checkForm = function (data) {
    return Object.values(data).every((e) => e !== "");
};

// module.exports = { formParser, readAsDataURL, checkForm, }