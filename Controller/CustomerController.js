//Customer Save
$("#btnCusSave").on('click', () => {
    let name = $("#customerName").val()
    let gender = $("input[name='gender']:checked").val();
    let joinDate = $("#cusJoinDate").val()
    let level = $("#cus_level").val()
    let totalPoint = $("input[name='cusTotalPoint']").val()
    let dob = $("#cusDob").val()
    let address01 = $("input[name='address1']").val()
    let address02 = $("input[name='address2']").val()
    let address03 = $("input[name='address3']").val()
    let address04 = $("input[name='address4']").val()
    let address05 = $("input[name='address5']").val()
    let contactNo = $("#cusContactNo").val()
    let email = $("#cusEmail").val()
    let recentPurchaseDateAndTime = $("#purchase_date_and_time").val()


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

    let customerData= {
        customer_name: name,
        gender: gender,
        join_date: joinDate,
        level: level,
        total_point: totalPoint,
        dob: dob,
        address_01: address01,
        address_02: address02,
        address_03: address03,
        address_04: address04,
        address_05: address05,
        contact_no: contactNo,
        email: email,
        purchase_data : recentPurchaseDateAndTime
    }

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
                resetField()
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



//////////////////////////////////////////////////////////////////////////////////////////////////

$("#btnCustomerForm").on("click", () => {
    loadCustomerData();
})

// Load Data
function loadCustomerData() {
    $.ajax({
        url: "http://localhost:9090/shop/api/v1/customer/getAllCus",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setValue(response);
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}


//data set to the table
const setValue = (response) => {
    $("#customer-table").empty();
    response.map((customer) => {
        let recode = `<tr class=''>
                                    <td>${customer.customer_name}</td>
                                    <td class='email'>${customer.email}</td>
                                    <td class='gender'>${customer.gender}</td>
                                    <td class='join_date'>${customer.join_date}</td>
                                    <td class='level'>${customer.level}</td>
                                    <td class='total_point'>${customer.total_point}</td>
                                    <td class='dob'>${customer.dob}</td>
                                    <td class='address_01'>${customer.address_01} ${customer.address_02} ${customer.address_03} ${customer.address_04} ${customer.address_05}</td>
                                    <td class='contact_no'>${customer.contact_no}</td>
                                    <td class='purchase_data'>${customer.purchase_data}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger" id="CusDelete"> Delete</button>
                                        <button type="button" class="btn btn-warning">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </td>
                              </tr>`
        $("#customer-table").append(recode)
        $("#customer-table")
            .find("tr:last .btn-danger")
            .click(() => handleDeleteOnClick(customer))
        $("#customer-table")
            .find("tr:last .btn-warning")
            .click(() => handleEditOnClick(customer))

    })
}
///////////////////////////////////////////////////////////


//Reset data from customer
$("#btnCusReset").on("click", () => {
    resetField()
})
const resetField = () => {
    $("#btnCusSave").prop("disabled", false)
    $("#btnCusUpdate").prop("disabled", true)


    $("#customerName").val("")
    $("input[name='gender']:checked").val(null)
    $("#cusJoinDate").val("")
    $("#cus_level").val(null)
    $("input[name='cusTotalPoint']").val("")
    $("#cusDob").val("")
    $("input[name='address1']").val("")
    $("input[name='address2']").val("")
    $("input[name='address3']").val("")
    $("input[name='address4']").val("")
    $("input[name='address5']").val("")
    $("#cusContactNo").val("")
    $("#cusEmail").val("")
    $("#purchase_date_and_time").val("")
}


/////////////////////////////////////////////////////




// table inside edit button function
window.handleEditOnClick = (customer) => {
    $("#btnCusUpdate").prop("disabled", false)
    $("#btnCusSave").prop("disabled", true)

    selectedCusId = customer.customer_code
    $("#customerName").val(customer.customer_name)
    $("input[name='gender']:checked").val(customer.gender)
    $("#cusJoinDate").val(customer.join_date)
    $("#cus_level").val(customer.level)
    $("input[name='cusTotalPoint']").val(customer.total_point)
    $("#cusDob").val(customer.dob)
    $("input[name='address1']").val(customer.address_01)
    $("input[name='address2']").val(customer.address_02)
    $("input[name='address3']").val(customer.address_03)
    $("input[name='address4']").val(customer.address_04)
    $("input[name='address5']").val(customer.address_05)
    $("#cusContactNo").val(customer.contact_no)
    $("#cusEmail").val(customer.email)
    $("#purchase_date_and_time").val(customer.purchase_data)
}


function setData(response) {
    $("select[name='level']").val(response.level)
    $("select[name='gender']").val(response.gender)
    $("#cusDob").val(response.dob)
    $("#cusJoinDate").val(response.purchase_data)


}

// Update Customer

$("#btnCusUpdate").prop("disabled", true)
let selectedCusId = null

$("#btnCusUpdate").on("click", () => {
    console.log("selected customer id", selectedCusId)

    let name = $("#customerName").val()
    let gender = $("input[name='gender']:checked").val();
    let joinDate = $("#cusJoinDate").val()
    let level = $("#cus_level").val()
    let totalPoint = $("input[name='cusTotalPoint']").val()
    let dob = $("#cusDob").val()
    let address01 = $("input[name='address1']").val()
    let address02 = $("input[name='address2']").val()
    let address03 = $("input[name='address3']").val()
    let address04 = $("input[name='address4']").val()
    let address05 = $("input[name='address5']").val()
    let contactNo = $("#cusContactNo").val()
    let email = $("#cusEmail").val()
    let recentPurchaseDateAndTime = $("#purchase_date_and_time").val()


    if (!name) {
        Swal.fire({
            icon: "error",
            title: "Please Check Name Field",
            text: "Something went wrong!"
        })
        return
    }

    if (gender === "Select Gender") {
        Swal.fire({
            icon: "error",
            title: "Please Check Gender Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!joinDate) {
        Swal.fire({
            icon: "error",
            title: "Please Check Join Date Field",
            text: "Something went wrong!"
        })
        return
    }

    if (level === "Select Level") {
        Swal.fire({
            icon: "error",
            title: "Please Check Level Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!totalPoint) {
        Swal.fire({
            icon: "error",
            title: "Please Check Total Point Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!dob) {
        Swal.fire({
            icon: "error",
            title: "Please Check DOB Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!address01) {
        Swal.fire({
            icon: "error",
            title: "Please Check Address 01 Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!address02) {
        Swal.fire({
            icon: "error",
            title: "Please Check Address 02 Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!address03) {
        Swal.fire({
            icon: "error",
            title: "Please Check Address 03 Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!address04) {
        Swal.fire({
            icon: "error",
            title: "Please Check Address 04 Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!address05) {
        Swal.fire({
            icon: "error",
            title: "Please Check Address 05 Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!contactNo) {
        Swal.fire({
            icon: "error",
            title: "Please Check Contact No Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!email) {
        Swal.fire({
            icon: "error",
            title: "Please Check Email Field",
            text: "Something went wrong!"
        })
        return
    }

    if (!recentPurchaseDateAndTime) {
        Swal.fire({
            icon: "error",
            title: "Please Check Recent Purchase date & time Field",
            text: "Something went wrong!"
        })
        return
    }

    let customerData = {
        customer_code:selectedCusId,
        customer_name: name,
        level: level,
        gender: gender,
        dob: dob,
        join_date: joinDate,
        total_point: totalPoint,
        address_01: address01,
        address_02: address02,
        address_03: address03,
        address_04: address04,
        address_05: address05,
        contact_no: contactNo,
        email: email,
        purchase_data : recentPurchaseDateAndTime
    }

    let jsonData = JSON.stringify(customerData)

    console.log(localStorage.getItem("token"))

    $.ajax({
        url: "http://localhost:9090/shop/api/v1/customer/update",
        type: "PUT",
        contentType: "application/json",
        data: jsonData,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },

        success: function (response) {
            console.log("------------" + response)
            if (response === true) {
                Swal.fire({
                    icon: "success",
                    title: "Customer Update Successful",
                    showConfirmButton: false,
                    timer: 1500
                })
                resetField()
                loadCustomerData()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred while updating customer data."
                })
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while updating customer data. Please try again."
            })
        }
    })
    loadCustomerData()
})

window.loadCustomerData = loadCustomerData




//delete Customer
window.handleDeleteOnClick = (customer) => {
    console.log(customer)

    let formData = new FormData();
    formData.append("customer_code", customer.customer_code);

    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'

    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:9090/shop/api/v1/customer/delete",
                type: "DELETE",
                processData: false,
                contentType: false,
                data: formData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire(
                        'Deleted!',
                        `${customer.customer_code} has been deleted.`,
                        'success'
                    )
                    loadCustomerData()
                },
                error: function (xhr, status, error) {
                    console.error("Error:", xhr.status);
                    if (xhr.status === 403) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Can not delete Customer, Please try again ?',
                            text: 'Something went wrong!'
                        })
                    }
                }
            });
        }
    });
    loadCustomerData()
}
