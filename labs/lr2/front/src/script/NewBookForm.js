// var addBook = function (event) {
//   event.preventDefault ? event.preventDefault() : (event.returnValue = false);

//   let pr1 = new Promise((resolve, reject) => {
//     let data = {};
//     Array.from(event.target).forEach(
//       (e) =>
//         (e.name && (data[e.name] = e.value)) ||
//         (e.type === "file" &&
//           /*
//           hz why no ne robit
//           e.files[0]
//           ? readFile(e.files[0], (text) => {
//               data.img = {
//                 data: text,
//                 type: e.files[0].type,
//                 name: e.files[0].name,
//                 size: e.files[0].size,
//               };
//               resolve(data);
//             })
//           : resolve(data)) */ (() => {
//             debugger;
//             if (e.files[0])
//               readFile(e.files[0], (text) => {
//                 data.img = {
//                   data: text,
//                   type: e.files[0].type,
//                   name: e.files[0].name,
//                   size: e.files[0].size,
//                 };
//                 debugger;
//                 resolve(data);
//               });
//             else resolve(data);
//           })())
//     );
//   });
//   pr1.then((data) => {
//     if (!checkBookForm(data)) {
//       alert("Заполните форму полностью");
//       return;
//     }

//     $http.post("/bookForm", data).then((data) => {
//       data.success
//         ? window.location.replace(data.redirectURL)
//         : alert("Не удалось создать книгу");
//     });
//   });
// };
var addBook = function (event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);

  formParser((data) =>
    $http.post("/bookForm", data).then((data) => {
      data.success
        ? window.location.replace(data.redirectURL)
        : alert("Не удалось создать книгу");
    })
  );
};

var editBookData = function (event, id) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);

  formParser((data) =>
    $http
      .post(`/book/${id}`, {
        action: "edit",
        data,
      })
      .then(updateBookInfo)
  );
};
var formParser = function (cb) {
  let pr1 = new Promise((resolve, reject) => {
    let data = {};
    Array.from(event.target).forEach(
      (e) =>
        (e.name && (data[e.name] = e.value)) ||
        (e.type === "file" &&
          /* 
          hz why no ne robit
          e.files[0]
          ? readFile(e.files[0], (text) => {
              data.img = {
                data: text,
                type: e.files[0].type,
                name: e.files[0].name,
                size: e.files[0].size,
              };
              resolve(data);
            })
          : resolve(data)) */ (() => {
            debugger;
            if (e.files[0])
              readFile(e.files[0], (text) => {
                data.img = {
                  data: text,
                  type: e.files[0].type,
                  name: e.files[0].name,
                  size: e.files[0].size,
                };
                debugger;
                resolve(data);
              });
            else resolve(data);
          })())
    );
  });
  pr1.then((data) => {
    if (!checkBookForm(data)) {
      alert("Заполните форму полностью");
      return;
    }

    // $http.post("/bookForm", data).then((data) => {
    //   data.success
    //     ? window.location.replace(data.redirectURL)
    //     : alert("Не удалось создать книгу");
    // });
    cb(data);
  });
};

var readFile = function (file, cb) {
  let myReader = new FileReader();
  myReader.onloadend = function (e) {
    cb(myReader.result);
  };
  myReader.readAsDataURL(file);
};

var imgOnChange = function (elem) {
  elem.parentNode.lastElementChild.classList = elem.value ? "onload" : "";
};

var checkBookForm = function (data) {
  return Object.values(data)
    .map((val) => val !== "")
    .every((e) => e === true);
};
