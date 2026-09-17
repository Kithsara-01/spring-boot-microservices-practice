package com.example.order_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.order_service.model.Order;
import com.example.order_service.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
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

        return "Order deleted successfully";
    }
}