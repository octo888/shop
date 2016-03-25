package app.controller;

import app.entity.DayImage;
import app.entity.Image;
import app.service.DayImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
public class DayImgController {

    @Autowired
    private DayImgService dayImgService;

    @RequestMapping(value = "/addDayImg", method = RequestMethod.POST)
    public void addDayImg(@RequestParam(value = "name") String name,
                          @RequestParam(value = "file") MultipartFile image) throws IOException {

        DayImage obj = new DayImage();
        obj.setName(name);
        obj.setDate(new Date());

        obj.setImage(image.isEmpty() ? null : new Image(image.getOriginalFilename(), image.getBytes()));

        dayImgService.save(obj);
    }

    @RequestMapping("/getAllDayImgs")
    public List<DayImage> getAllDayImgs() {
        return dayImgService.getDayImgs();
    }
}
