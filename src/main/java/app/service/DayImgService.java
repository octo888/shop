package app.service;

import app.entity.DayImage;
import app.repository.DayImageRepository;
import app.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
}
