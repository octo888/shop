package app.controller;

import app.entity.Image;
import app.entity.Item;
import app.service.ItemService;
import app.wrappers.ObjectWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @RequestMapping("/getAllItems")
    public List findItems() {
        return itemService.findAll();
    }

    @RequestMapping("/getItem")
    public Item getItem(@RequestParam("itemId") Long id) {
        return itemService.findWithImagesId(id);
    }

    @RequestMapping("/removeItem")
    public void removeItem(@RequestParam("itemId") Long id, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (int i = 0; i < cookies.length; i++) {
            if (cookies[i].getName().equals("admin_sid")) {
                itemService.removeItem(id);
            }
        }
    }

    @RequestMapping(value = "/addItem", method = RequestMethod.POST)
    public void doAddItem(@RequestParam(value = "name") String name,
                          @RequestParam(value = "category") String category,
                          @RequestParam(value = "desc", required = false) String desc,
                          @RequestParam(value = "price") Integer price,
                          @RequestParam(value = "charact", required = false) String charact,
                          @RequestParam(value = "file1", required = false) MultipartFile image1,
                          @RequestParam(value = "file2", required = false) MultipartFile image2,
                          @RequestParam(value = "file3", required = false) MultipartFile image3,
                          @RequestParam(value = "file4", required = false) MultipartFile image4,
                          HttpServletResponse response
    ) throws IOException {
        Item item = new Item();
        item.setCategoryType(Integer.parseInt(category));
        item.setName(name);
        item.setDescription(desc);
        item.setPrice(price);
        item.setDateOnSite(new Date());

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(charact, ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        item.setCharact(map);

        List<Image> images = new ArrayList<>();

        if (image1 != null) {
            images.add(new Image(image1.getOriginalFilename(), image1.getBytes(), item));
        }
        if (image2 != null) {
            images.add(new Image(image2.getOriginalFilename(), image2.getBytes(), item));
        }
        if (image3 != null) {
            images.add(new Image(image3.getOriginalFilename(), image3.getBytes(), item));
        }
        if (image4 != null) {
            images.add(new Image(image4.getOriginalFilename(), image4.getBytes(), item));
        }
       /* images.add(image1.isEmpty() ? null : new Image(image1.getOriginalFilename(), image1.getBytes(), item));
        images.add(image2.isEmpty() ? null : new Image(image2.getOriginalFilename(), image2.getBytes(), item));
        images.add(image3.isEmpty() ? null : new Image(image3.getOriginalFilename(), image3.getBytes(), item));
        images.add(image4.isEmpty() ? null : new Image(image4.getOriginalFilename(), image4.getBytes(), item));*/

        item.setImages(images);
        itemService.save(item);

    }


}
