package app.controller;

import app.entity.Item;
import app.service.ItemService;
import app.util.Constant;
import app.util.Utils;
import app.wrappers.ItemWrap;
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
    public void doAddItem(@RequestBody ItemWrap wrap) throws IOException {
        int categoryId = Integer.parseInt(wrap.getCategory());
        String imgPartPath = Utils.parseCatTypeById(categoryId);

        Item item = new Item();
        item.setCategoryType(categoryId);
        item.setName(wrap.getName());
        item.setDescription(wrap.getDesc());
        item.setPrice(wrap.getPrice());
        item.setTop(wrap.isTop());
        item.setDateOnSite(new Date());
        item.setMainImg(Constant.IMG_PATH + "/" + imgPartPath + "/" + wrap.getMainImg());

        List<String> arr = new ArrayList<>();
        for (int i = 0; i < wrap.getUrls().length; i++) {
            arr.add(Constant.IMG_PATH + "/" + imgPartPath + "/" + wrap.getUrls()[i]);
        }
        item.setUrls(arr);

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(wrap.getCharact(), ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        item.setCharact(map);
        itemService.save(item);
    }

    @RequestMapping(value = "/editItem", method = RequestMethod.POST)
    public void doEditItem(@RequestBody ItemWrap wrap) {
        try {
            itemService.edit(wrap.getId(), wrap.getName(), wrap.getCategory(), wrap.isTop(), wrap.getDesc(),
                    wrap.getPrice(), wrap.getCharact(), wrap.getMainImg(), wrap.getUrls());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
