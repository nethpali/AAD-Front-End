$("#btnSupSave").on('click', () => {
    let name = $("#supplier_name").val()
    let category = $("select[name='category']").val();
    let address01 = $("input[name='address01']").val()
    let address02 = $("input[name='address02']").val()
    let address03 = $("input[name='address03']").val()
    let address04 = $("input[name='address04']").val()
    let address05 = $("input[name='address05']").val()
    let address06 = $("input[name='address06']").val()
    let contactNo1 =$("#contact_no_01").val();
    let contactNo2 = $("#contact_no_02").val();
    let email =$("#supplier_email").val();


    // if (!name) {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Please Check Name Field",
    //         text: "Something went wrong!"
    //     })
    //     return
    // }
    //
    // if (level==="Select Level") {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Level Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!gender) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Gender Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!dob){
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Date Of Birthday Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!join_date){
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Join Date Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!total_point) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Total Point Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!address_01) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Address 1 Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!address_02) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Address 2 Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!address_03) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Address 3 Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!address_04) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Address 4 Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!address_05) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Address 5 Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!contact_no){
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Contact No Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!email) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Email Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }
    //
    // if (!purchase_data) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Recent Purchase Date And Time Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
    // }

    let supplier_data= {
        supplier_name: name,
        category: category,
        address_01: address01,
        address_02: address02,
        address_03: address03,
        address_04: address04,
        address_05: address05,
        address_06: address06,
        contact_no_01:contactNo1,
        contact_no_02:contactNo2,
        email: email,
    }

    let jsonData = JSON.stringify(supplier_data);

    $.ajax({
        url: 'http://localhost:9090/shop/api/v1/supplier/save',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Supplier data saved successfully.'
            })
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while saving supplier data. Please try again.'
            });
        }

    });
   // loadSupplierData();
})

// $("#btnSupplierForm").on("click", () => {
//     loadSupplierData();
// })

//Load Data
// function loadSupplierData() {
//     $.ajax({
//         url: "http://localhost:9090/shop/api/v1/supplier/getAllSup",
//         type: "GET",
//         processData: false,
//         contentType: false,
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         },
//         success: function (response) {
//             setValue(response);
//             console.log(response);
//         },
//         error: function (xhr, status, error) {
//             console.error("Error:", xhr.responseText);
//         }
//     });
// }

$("#btnSupReset").on("click", () => {
    resetField()
})
const resetField = () => {
    $("#btnSupSave").prop("disabled", false)
    $("#btnSupUpdate").prop("disabled", true)


    $("#supplier_name").val("")
    $("select[name='category']").val("");
    $("input[name='address01']").val("")
    $("input[name='address02']").val("")
    $("input[name='address03']").val("")
    $("input[name='address04']").val("")
    $("input[name='address05']").val("")
    $("input[name='address06']").val("")
    $("#contact_no_01").val("")
    $("#contact_no_02").val("")
    $("#supplier_email").val("")
}

//set value to the table
// const setValue = (response) => {
//     $("#Supplier-table").empty();
//     response.map((supplier) => {
//         let recode = `
//             <tr>
//                 <td>${supplier.supplier_name}</td>
//                 <td class='category'>${supplier.category}</td>
//                 <td class='address_01'>${supplier.address_01} ${supplier.address_02} ${supplier.address_03} ${supplier.address_04} ${supplier.address_05} ${supplier.address_06}</td>
//                 <td class='contact_no'>${supplier.contact_no_01} ${supplier.contact_no_02}</td>
//                 <td class='email'>${supplier.email}</td>
//                 <td>
//                     <button type="button" class="btn btn-danger" id="SupDelete">Delete</button>
//                     <button type="button" class="btn btn-warning">
//                         <i class="fa-solid fa-pen-to-square"></i>
//                     </button>
//                 </td>
//             </tr>`;
//
//         $("#Supplier-table").append(recode);
//         $("#Supplier-table")
//             .find("tr:last .btn-danger")
//             .click(() => handleDeleteOnClick(supplier));
//         $("#Supplier-table")
//             .find("tr:last .btn-warning")
//             .click(() => handleEditOnClick(supplier));
//     });
// }
//
//
