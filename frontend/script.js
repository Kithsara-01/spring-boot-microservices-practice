// ================================
// Customer Service
// ================================

const CUSTOMER_API_URL = "http://localhost:8080/customers";


// Customer elements

const customerForm = document.getElementById("customerForm");

const loadCustomersBtn =
    document.getElementById("loadCustomersBtn");

const customerTableBody =
    document.getElementById("customerTableBody");


// ================================
// Order Service
// ================================

const ORDER_API_URL = "http://localhost:8081/orders";


// Order elements

const orderForm = document.getElementById("orderForm");

const loadOrdersBtn =
    document.getElementById("loadOrdersBtn");

const orderTableBody =
    document.getElementById("orderTableBody");


// ================================
// Add Customer
// ================================

customerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const customer = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value

    };


    try {

        const response = await fetch(CUSTOMER_API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(customer)

        });


        if (!response.ok) {

            throw new Error("Failed to create customer");

        }


        alert("Customer added successfully!");

        customerForm.reset();

        loadCustomers();


    } catch (error) {

        console.error(error);

        alert("Error adding customer");

    }

});


// ================================
// Load Customers
// ================================

loadCustomersBtn.addEventListener(
    "click",
    loadCustomers
);


async function loadCustomers() {

    try {

        const response =
            await fetch(CUSTOMER_API_URL);


        if (!response.ok) {

            throw new Error("Failed to load customers");

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

        alert("Error loading customers");

    }

}


// ================================
// Delete Customer
// ================================

async function deleteCustomer(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this customer?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(`${CUSTOMER_API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error("Failed to delete customer");

        }


        const message =
            await response.text();


        alert(message);

        loadCustomers();


    } catch (error) {

        console.error(error);

        alert("Error deleting customer");

    }

}


// ================================
// Edit Customer
// ================================

async function editCustomer(id) {

    const name =
        prompt("Enter new customer name:");

    const email =
        prompt("Enter new customer email:");

    const phone =
        prompt("Enter new customer phone:");


    if (!name || !email || !phone) {

        return;

    }


    const customer = {

        name: name,

        email: email,

        phone: phone

    };


    try {

        const response =
            await fetch(`${CUSTOMER_API_URL}/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(customer)

            });


        if (!response.ok) {

            throw new Error("Failed to update customer");

        }


        alert("Customer updated successfully!");

        loadCustomers();


    } catch (error) {

        console.error(error);

        alert("Error updating customer");

    }

}


// ================================
// Add Order
// ================================

orderForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const order = {

        customerId:
            Number(document.getElementById("customerId").value),

        product:
            document.getElementById("product").value,

        quantity:
            Number(document.getElementById("quantity").value)

    };


    try {

        const response =
            await fetch(ORDER_API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(order)

            });


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(errorText);

        }


        alert("Order added successfully!");

        orderForm.reset();

        loadOrders();


    } catch (error) {

        console.error(error);

        alert(
            "Error adding order. Make sure the Customer ID exists."
        );

    }

});


// ================================
// Load Orders
// ================================

loadOrdersBtn.addEventListener(
    "click",
    loadOrders
);


async function loadOrders() {

    try {

        const response =
            await fetch(ORDER_API_URL);


        if (!response.ok) {

            throw new Error("Failed to load orders");

        }


        const orders =
            await response.json();


        orderTableBody.innerHTML = "";


        orders.forEach(function (order) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${order.id}</td>

                <td>${order.customerId}</td>

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

        alert("Error loading orders");

    }

}


// ================================
// Delete Order
// ================================

async function deleteOrder(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this order?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(`${ORDER_API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error("Failed to delete order");

        }


        const message =
            await response.text();


        alert(message);

        loadOrders();


    } catch (error) {

        console.error(error);

        alert("Error deleting order");

    }

}


// ================================
// Edit Order
// ================================

async function editOrder(id) {

    const customerId =
        prompt("Enter new Customer ID:");

    const product =
        prompt("Enter new product:");

    const quantity =
        prompt("Enter new quantity:");


    if (!customerId || !product || !quantity) {

        return;

    }


    const order = {

        customerId: Number(customerId),

        product: product,

        quantity: Number(quantity)

    };


    try {

        const response =
            await fetch(`${ORDER_API_URL}/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(order)

            });


        if (!response.ok) {

            throw new Error("Failed to update order");

        }


        alert("Order updated successfully!");

        loadOrders();


    } catch (error) {

        console.error(error);

        alert(
            "Error updating order. Check the Customer ID."
        );

    }

}