// =================================
// API URLs
// =================================

const CUSTOMER_API_URL = "http://localhost:8080/customers";

const ORDER_API_URL = "http://localhost:8081/orders";


// =================================
// NAVIGATION
// =================================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".service-section");

    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    const selectedSection =
        document.getElementById(sectionId);

    selectedSection.classList.add(
        "active-section"
    );


    const customerNavBtn =
        document.getElementById(
            "customerNavBtn"
        );

    const orderNavBtn =
        document.getElementById(
            "orderNavBtn"
        );


    customerNavBtn.classList.remove("active");

    orderNavBtn.classList.remove("active");


    if (sectionId === "customerSection") {

        customerNavBtn.classList.add("active");

    }


    if (sectionId === "orderSection") {

        orderNavBtn.classList.add("active");

    }

}


// =================================
// CUSTOMER ELEMENTS
// =================================

const customerForm =
    document.getElementById("customerForm");

const loadCustomersBtn =
    document.getElementById("loadCustomersBtn");

const customerTableBody =
    document.getElementById("customerTableBody");

const customerSubmitBtn =
    document.getElementById("customerSubmitBtn");

const cancelCustomerBtn =
    document.getElementById("cancelCustomerBtn");


// =================================
// ORDER ELEMENTS
// =================================

const orderForm =
    document.getElementById("orderForm");

const loadOrdersBtn =
    document.getElementById("loadOrdersBtn");

const orderTableBody =
    document.getElementById("orderTableBody");

const orderSubmitBtn =
    document.getElementById("orderSubmitBtn");

const cancelOrderBtn =
    document.getElementById("cancelOrderBtn");


// =================================
// EDIT IDs
// =================================

let editingCustomerId = null;

let editingOrderId = null;


// =================================
// SWEETALERT
// =================================

function showSuccess(message) {

    Swal.fire({

        icon: "success",

        title: "Success",

        text: message,

        timer: 1800,

        showConfirmButton: false

    });

}


function showError(message) {

    Swal.fire({

        icon: "error",

        title: "Error",

        text: message

    });

}


// =================================
// CUSTOMER - ADD / UPDATE
// =================================

customerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const customer = {

            name:
                document.getElementById("name")
                    .value
                    .trim(),

            email:
                document.getElementById("email")
                    .value
                    .trim(),

            phone:
                document.getElementById("phone")
                    .value
                    .trim()

        };


        try {

            let response;


            if (editingCustomerId !== null) {

                response =
                    await fetch(
                        `${CUSTOMER_API_URL}/${editingCustomerId}`,
                        {

                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(customer)

                        }
                    );

            } else {

                response =
                    await fetch(
                        CUSTOMER_API_URL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(customer)

                        }
                    );

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to save customer"
                );

            }


            if (editingCustomerId !== null) {

                showSuccess(
                    "Customer updated successfully!"
                );

            } else {

                showSuccess(
                    "Customer added successfully!"
                );

            }


            resetCustomerForm();

            loadCustomers();

        } catch (error) {

            console.error(error);

            showError(
                "Unable to save customer. Please try again."
            );

        }

    }
);


// =================================
// CUSTOMER - LOAD
// =================================

loadCustomersBtn.addEventListener(
    "click",
    loadCustomers
);


async function loadCustomers() {

    try {

        const response =
            await fetch(CUSTOMER_API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load customers"
            );

        }


        const customers =
            await response.json();


        customerTableBody.innerHTML = "";


        customers.forEach(function (customer) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${customer.id}</td>

                <td>${customer.name}</td>

                <td>${customer.email}</td>

                <td>${customer.phone}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editCustomer(${customer.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCustomer(${customer.id})">

                        Delete

                    </button>

                </td>

            `;


            customerTableBody.appendChild(row);

        });


    } catch (error) {

        console.error(error);

        showError(
            "Unable to load customers."
        );

    }

}


// =================================
// CUSTOMER - EDIT
// =================================

async function editCustomer(id) {

    try {

        const response =
            await fetch(
                `${CUSTOMER_API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load customer"
            );

        }


        const customer =
            await response.json();


        document.getElementById("name").value =
            customer.name;

        document.getElementById("email").value =
            customer.email;

        document.getElementById("phone").value =
            customer.phone;


        editingCustomerId = id;


        customerSubmitBtn.textContent =
            "Update Customer";


        cancelCustomerBtn.style.display =
            "inline-block";


        customerForm.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        showError(
            "Unable to load customer details."
        );

    }

}


// =================================
// CUSTOMER - CANCEL
// =================================

cancelCustomerBtn.addEventListener(
    "click",
    function () {

        resetCustomerForm();

    }
);


function resetCustomerForm() {

    editingCustomerId = null;

    customerForm.reset();

    customerSubmitBtn.textContent =
        "Add Customer";

    cancelCustomerBtn.style.display =
        "none";

}


// =================================
// CUSTOMER - DELETE
// =================================

async function deleteCustomer(id) {

    const result =
        await Swal.fire({

            icon: "warning",

            title: "Delete Customer?",

            text:
                "Are you sure you want to delete this customer?",

            showCancelButton: true,

            confirmButtonText:
                "Yes, Delete",

            cancelButtonText:
                "Cancel"

        });


    if (!result.isConfirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${CUSTOMER_API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete customer"
            );

        }


        const message =
            await response.text();


        showSuccess(
            message ||
            "Customer deleted successfully!"
        );


        loadCustomers();


    } catch (error) {

        console.error(error);

        showError(
            "Unable to delete customer."
        );

    }

}


// =================================
// ORDER - ADD / UPDATE
// =================================

orderForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const order = {

            customerId:
                Number(
                    document.getElementById(
                        "customerId"
                    ).value
                ),

            product:
                document.getElementById(
                    "product"
                ).value.trim(),

            quantity:
                Number(
                    document.getElementById(
                        "quantity"
                    ).value
                )

        };


        try {

            let response;


            if (editingOrderId !== null) {

                response =
                    await fetch(
                        `${ORDER_API_URL}/${editingOrderId}`,
                        {

                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(order)

                        }
                    );

            } else {

                response =
                    await fetch(
                        ORDER_API_URL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(order)

                        }
                    );

            }


            if (!response.ok) {

                if (
                    response.status === 404
                ) {

                    throw new Error(
                        "Customer ID does not exist."
                    );

                }


                throw new Error(
                    "Failed to save order"
                );

            }


            if (editingOrderId !== null) {

                showSuccess(
                    "Order updated successfully!"
                );

            } else {

                showSuccess(
                    "Order added successfully!"
                );

            }


            resetOrderForm();

            loadOrders();


        } catch (error) {

            console.error(error);

            showError(
                error.message ||
                "Unable to save order."
            );

        }

    }
);


// =================================
// ORDER - LOAD
// =================================

loadOrdersBtn.addEventListener(
    "click",
    loadOrders
);


async function loadOrders() {

    try {

        const response =
            await fetch(ORDER_API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );

        }


        const orders =
            await response.json();


        const customerResponse =
            await fetch(
                CUSTOMER_API_URL
            );


        if (!customerResponse.ok) {

            throw new Error(
                "Failed to load customers"
            );

        }


        const customers =
            await customerResponse.json();


        const customerMap = {};


        customers.forEach(function (customer) {

            customerMap[customer.id] =
                customer.name;

        });


        orderTableBody.innerHTML = "";


        orders.forEach(function (order) {

            const customerName =
                customerMap[
                    order.customerId
                ] || "Unknown";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${order.id}</td>

                <td>${order.customerId}</td>

                <td>${customerName}</td>

                <td>${order.product}</td>

                <td>${order.quantity}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editOrder(${order.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteOrder(${order.id})">

                        Delete

                    </button>

                </td>

            `;


            orderTableBody.appendChild(row);

        });


    } catch (error) {

        console.error(error);

        showError(
            "Unable to load orders."
        );

    }

}


// =================================
// ORDER - EDIT
// =================================

async function editOrder(id) {

    try {

        const response =
            await fetch(
                `${ORDER_API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load order"
            );

        }


        const order =
            await response.json();


        document.getElementById(
            "customerId"
        ).value =
            order.customerId;


        document.getElementById(
            "product"
        ).value =
            order.product;


        document.getElementById(
            "quantity"
        ).value =
            order.quantity;


        editingOrderId = id;


        orderSubmitBtn.textContent =
            "Update Order";


        cancelOrderBtn.style.display =
            "inline-block";


        orderForm.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        showError(
            "Unable to load order details."
        );

    }

}


// =================================
// ORDER - CANCEL
// =================================

cancelOrderBtn.addEventListener(
    "click",
    function () {

        resetOrderForm();

    }
);


function resetOrderForm() {

    editingOrderId = null;

    orderForm.reset();

    orderSubmitBtn.textContent =
        "Add Order";

    cancelOrderBtn.style.display =
        "none";

}


// =================================
// ORDER - DELETE
// =================================

async function deleteOrder(id) {

    const result =
        await Swal.fire({

            icon: "warning",

            title: "Delete Order?",

            text:
                "Are you sure you want to delete this order?",

            showCancelButton: true,

            confirmButtonText:
                "Yes, Delete",

            cancelButtonText:
                "Cancel"

        });


    if (!result.isConfirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${ORDER_API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete order"
            );

        }


        const message =
            await response.text();


        showSuccess(
            message ||
            "Order deleted successfully!"
        );


        loadOrders();


    } catch (error) {

        console.error(error);

        showError(
            "Unable to delete order."
        );

    }

}