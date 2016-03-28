package app.controller;

import app.entity.Image;
import app.entity.Item;
import app.service.ItemService;
import app.util.Constant;
import app.util.Utils;
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
        return itemService.findOne(id);
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
                          @RequestParam(value = "price") int price,
                          @RequestParam(value = "charact", required = false) String charact,
                          @RequestParam(value = "mainImg") String mainImg,
                          @RequestParam(value = "urls", required = false) String[] urls
    ) throws IOException {
        int categoryId = Integer.parseInt(category);
        String imgPartPath = Utils.parseCatTypeById(categoryId);

        Item item = new Item();
        item.setCategoryType(categoryId);
        item.setName(name);
        item.setDescription(desc);
        item.setPrice(price);
        item.setDateOnSite(new Date());
        item.setMainImg(Constant.IMG_PATH + "/" + imgPartPath + "/" + mainImg);

        List<String> arr = new ArrayList<>();
        for (int i = 0; i < urls.length; i++) {
            arr.add(Constant.IMG_PATH + "/" + imgPartPath + "/" + urls[i]);
        }
        item.setUrls(arr);

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(charact, ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        item.setCharact(map);
        itemService.save(item);
    }


}
