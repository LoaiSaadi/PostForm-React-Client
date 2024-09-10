import React, { useState, useEffect } from 'react';
import '../styles/PostForm.css';

function PostForm() {
    const [formData, setFormData] = useState({
        orderNumber: '',
        orderId: '',
        orderPrice: '',
        shippingAddress: '',
        clientEmail: '',
    });

    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editOrderId, setEditOrderId] = useState(null);

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to fetch orders from the server
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission for new orders
    const handleAdd = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Order added successfully');
                fetchOrders();  // Refresh the orders list after adding
                resetForm();
            } else {
                alert('Failed to add the order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle form submission for updating orders
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/update/${editOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Order updated successfully');
                fetchOrders();  // Refresh the orders list after updating
                resetForm();
            } else {
                alert('Failed to update the order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdate();
        } else {
            handleAdd();
        }
    };

    // Handle order deletion
    const handleDelete = async (id) => {
        console.log("Trying to delete order with id: ", id);
        try {
            const response = await fetch(`http://localhost:3000/orders/delete/${id}`, {
                method: 'DELETE',
            });
            console.log('Response status:', response.status);
            if (response.ok) {
                alert('Order deleted successfully');
                fetchOrders();  // Refresh the orders list after deletion
            } else {
                alert('Failed to delete the order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle order editing
    const handleEdit = (order) => {
        setFormData({
            orderNumber: order.orderNumber,
            orderId: order.orderId,
            orderPrice: order.orderPrice,
            shippingAddress: order.shippingAddress,
            clientEmail: order.clientEmail,
        });
        setIsEditing(true);
        setEditOrderId(order._id);
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            orderNumber: '',
            orderId: '',
            orderPrice: '',
            shippingAddress: '',
            clientEmail: '',
        });
        setIsEditing(false);
        setEditOrderId(null);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <p><strong>Order Number:</strong></p>
                <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <p><strong>Order ID:</strong></p>
                <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <p><strong>Price:</strong></p>
                <input
                    type="number"
                    id="orderPrice"
                    name="orderPrice"
                    value={formData.orderPrice}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <p><strong>Shipping Address:</strong></p>
                <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <p><strong>Client Email:</strong></p>
                <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className="input"
                    required
                />

                <button type="submit" className="button">{isEditing ? 'Update' : 'Submit'}</button>
            </form>

            <div className="order-list">
                <h2>Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders available.</p>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className="order-item">
                            <p><strong>Order Number:</strong> {order.orderNumber}</p>
                            <p><strong>Order ID:</strong> {order.orderId}</p>
                            <p><strong>Price:</strong> ${order.orderPrice}</p>
                            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                            <p><strong>Client Email:</strong> {order.clientEmail}</p>
                            <button onClick={() => handleEdit(order)} className="button edit">Edit</button>
                            <button onClick={() => handleDelete(order._id)} className="button delete">Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PostForm;
