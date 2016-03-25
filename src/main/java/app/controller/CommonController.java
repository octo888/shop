package app.controller;

import app.entity.Image;
import app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class CommonController {

    @Autowired
    private ItemService itemService;

    @RequestMapping("/image/{file_id}")
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
    }
}
