package app.service;

import app.entity.Image;
import app.entity.Item;
import app.repository.ImageRepository;
import app.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ImageRepository imageRepository;

    public List<Item> getItemsById(List<Long> id) {
        return itemRepository.findById(id);
    }

    public void save(Item item) {
        itemRepository.save(item);
    }

    public Image getImage(long id) {
        return imageRepository.findOne(id);
    }

    public Item findOne(Long id) {
        return itemRepository.findOne(id);
    }

    public List findAll() {

        List<Item> items = itemRepository.findAll();

        for (Item item : items) {
            List<Image> imgs = imageRepository.findByItem(item);

            List<Long> listId = new ArrayList<>();

            for (Image i : imgs) {
                listId.add(i.getId());
            }
            item.setImagesId(listId);
            item.setImages(null);
        }
        return items;
    }

    public Item findWithImagesId(Long id) {
        Item item = itemRepository.findOne(id);
        List<Image> imgs = imageRepository.findByItem(item);
        List<Long> listId = new ArrayList<>();

        for (Image i : imgs) {
            listId.add(i.getId());
        }
        item.setImagesId(listId);
        item.setImages(null);
        return item;
    }

    public void removeItem(Long id) {
        itemRepository.delete(id);
    }


}
