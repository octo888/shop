package app.controller;

import app.entity.Order;
import app.service.ItemService;
import app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ItemService itemService;

    @RequestMapping( value = "/addOrder", method = RequestMethod.POST)
    public Order addOrder(@RequestParam(value = "username") String username,
                         @RequestParam(value = "email") String email,
                         @RequestParam(value = "phone") String phone,
                         @RequestParam(value = "amount") int amount,
                         @RequestParam(value = "items") List<Long> id)
    {
        Order order = new Order();
        order.setUsername(username);
        order.setEmail(email);
        order.setPhone(phone);
        //order.setBooks(bookService.getBooksById(id));
        order.setOrderDate(new Date());
        order.setOrderSum(amount);
        orderService.save(order);
        return order;
    }

    @RequestMapping("/getOrderList")
    public List getOrders() {
        return orderService.findAll();
    }

    @RequestMapping("/getOrderDetails")
    public Order getOrder(@RequestParam(value = "id") long id) {
        return orderService.findOneById(id);
    }

}
