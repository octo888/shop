package app.service;


import app.entity.Item;
import app.repository.ItemRepository;
import app.wrappers.ObjectWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service
@Transactional
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;



    public List<Item> getItemsById(List<Long> id) {
        return itemRepository.findById(id);
    }

    public void save(Item item) {
        itemRepository.save(item);
    }

    public Item findOne(Long id) {
        return itemRepository.findOne(id);
    }

    public List findAll() {
        return itemRepository.findAll();
    }


    public void removeItem(Long id) {
        itemRepository.delete(id);
    }


    public List search(String name) {
        List<Item> list = itemRepository.findAll();
        List<Item> res = new ArrayList<>();

        for (Item item : list) {
            if (item.getName().toLowerCase().contains(name.toLowerCase())) {
                res.add(item);
            }
        }
        return res;
        //return itemRepository.findByName(name);
    }

    public void edit(long id, String name, String category, boolean top, String desc, int price, String charact,
                     String mainImg, String[] urls) throws IOException {
        int categoryId = Integer.parseInt(category);

        Item item = itemRepository.findOne(id);
        item.setCategoryType(categoryId);
        item.setName(name);
        item.setDescription(desc);
        item.setPrice(price);
        item.setTop(top);
        item.setDateOnSite(new Date());
        item.setMainImg(mainImg);

        List<String> arr = new ArrayList<>();
        if (urls != null) {
            for (int i = 0; i < urls.length; i++) {
                arr.add(urls[i]);
            }
        }
        item.setUrls(arr);

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(charact, ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        item.setCharact(map);
        itemRepository.saveAndFlush(item);
    }
}
