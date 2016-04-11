package app.controller;


import app.service.BlogService;
import app.service.DayImgService;
import app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class CommonController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private BlogService blogService;

    @Autowired
    private DayImgService dayImgService;

    @RequestMapping("/searchAllByName")
    public List search(@RequestParam("name") String name, @RequestParam("type") int type) {
        if (type == 2) {
            return blogService.search(name);
        }
        else if (type == 3) {
            return dayImgService.search(name);
        } else {
            return itemService.search(name);
        }
    }

   /* @RequestMapping("/image/{file_id}")
    public void getImage(HttpServletRequest request, HttpServletResponse response, @PathVariable("file_id") long id) throws IOException {
        try {
            Image content = itemService.getImage(id);
            response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
            response.getOutputStream().write(content.getBody());
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/
}
