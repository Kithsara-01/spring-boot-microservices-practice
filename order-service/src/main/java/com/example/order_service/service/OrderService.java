package com.example.order_service.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.order_service.model.Order;
import com.example.order_service.repository.OrderRepository;
import com.example.order_service.client.CustomerClient;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final CustomerClient customerClient;

    public OrderService(OrderRepository orderRepository, CustomerClient customerClient) {
        this.orderRepository = orderRepository;
        this.customerClient = customerClient;
    }

    public Order saveOrder(Order order) {

        String customer = customerClient.getCustomerById(order.getCustomerId());

        if (customer == null) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND, 
                    "Customer not found");
        }
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order updateOrder(Long id, Order order) {

        Order existingOrder = orderRepository.findById(id).orElse(null);

        if (existingOrder == null) {
            return null;
        }

        existingOrder.setCustomerId(order.getCustomerId());
        existingOrder.setProduct(order.getProduct());
        existingOrder.setQuantity(order.getQuantity());

        return orderRepository.save(existingOrder);
    }

    public String deleteOrder(Long id) {

        orderRepository.deleteById(id);

        return "Order DELETED successfully";
    }

    public String getCustomerDetails(Long customerId) {
        return customerClient.getCustomerById(customerId);
    }

}