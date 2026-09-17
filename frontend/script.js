const API_URL = "http://localhost:8080/customers";

const customerForm = document.getElementById("customerForm");
const loadCustomersBtn = document.getElementById("loadCustomersBtn");
const customerTableBody = document.getElementById("customerTableBody");


customerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const customer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    try {

        const response = await fetch(API_URL, {
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


loadCustomersBtn.addEventListener("click", loadCustomers);


async function loadCustomers() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();

        customerTableBody.innerHTML = "";

        customers.forEach(function (customer) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button class="edit-btn"
                        onclick="editCustomer(${customer.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
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


async function deleteCustomer(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete customer");
        }

        const message = await response.text();

        alert(message);

        loadCustomers();

    } catch (error) {

        console.error(error);
        alert("Error deleting customer");

    }

}


async function editCustomer(id) {

    const name = prompt("Enter new customer name:");
    const email = prompt("Enter new customer email:");
    const phone = prompt("Enter new customer phone:");

    if (!name || !email || !phone) {
        return;
    }

    const customer = {
        name: name,
        email: email,
        phone: phone
    };

    try {

        const response = await fetch(`${API_URL}/${id}`, {
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