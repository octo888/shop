package app.service;

import app.entity.Order;
import app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void save(Order order) {
        orderRepository.save(order);
    }

    public List findAll() {
        return orderRepository.findAll();
    }

    public Order findOneById(long id) {
        return orderRepository.findOne(id);
    }
}
