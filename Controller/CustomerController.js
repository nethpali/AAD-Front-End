$("#btnCusSave").on('click', () => {
    let customer_name = $("#customerName").val();
    let level = "NEW";
    let gender = $("input[name='gender']:checked").val();
    let dob = $("#cusDob").val();
    let join_date = $("#cusJoinDate").val();
    let total_point = $("input[name='cutTotalPoint']").val();
    let address_01 = $("input[name='address1']").val();
    let address_02 = $("input[name='address2']").val();
    let address_03 = $("input[name='address3']").val();
    let address_04 = $("input[name='address4']").val();
    let address_05 = $("input[name='address6']").val();
    let contact_no = $("#cusContactNo").val();
    let email = $("#cusEmail").val();
    let purchase_data = $("#purchase_date_and_time").val();

    // if (!customer_name){
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Please Check Name Field',
    //         text: 'Something went wrong!'
    //     });
    //     return;
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

    let customerData = {
        name: customer_name,
        level: level,
        gender: gender,
        dob: dob,
        join_date_as_a_loyalty_customer: join_date,
        total_points: total_point,
        address_line_1: address_01,
        address_line_2: address_02,
        address_line_3: address_03,
        address_line_4: address_04,
        address_line_5: address_05,
        contact_no: contact_no,
        email: email,
        recent_purchase_date_and_time: purchase_data
    };

    let jsonData = JSON.stringify(customerData);

    $.ajax({
        url: 'http://localhost:9090/shop/api/v1/customer/save',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(">>>>>> "+response);
            if (response === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is already registered. Please use a different email.'
                });
            } else if (response === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Customer added successfully.'
                });
                loadCustomerData();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while saving customer data.'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while saving customer data. Please try again.'
            });
        }
    });
    loadCustomerData();
})

// Load Data
function loadCustomerData() {
    $.ajax({
        url: "http://localhost:9090/shop/api/v1/customer/save",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setValue(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}
