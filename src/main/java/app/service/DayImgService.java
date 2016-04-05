package app.service;

import app.entity.DayImage;
import app.repository.DayImageRepository;
import app.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DayImgService {

    @Autowired
    private DayImageRepository dayImageRepository;

    @Autowired
    private ImageRepository imageRepository;

    public void save(DayImage obj) {
        dayImageRepository.save(obj);
    }

    public List<DayImage> getDayImgs() {
        return dayImageRepository.findAll();
    }

    public List search(String name) {
        List<DayImage> list = dayImageRepository.findAll();
        List<DayImage> res = new ArrayList<>();

        for (DayImage item : list) {
            if (item.getName().toLowerCase().contains(name.toLowerCase())) {
                res.add(item);
            }
        }
        return res;
    }
}
