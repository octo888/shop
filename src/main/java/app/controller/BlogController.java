package app.controller;

import app.entity.Blog;
import app.entity.Comment;
import app.entity.Image;
import app.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @RequestMapping(value = "/getAllBlogs")
    public List<Blog> getBlogs() {
        return blogService.findAll();
    }

    @RequestMapping("/getBlogDetails")
    public Blog getOne(@RequestParam(value = "blogId") long id) {
        return blogService.findOne(id);
    }

    @RequestMapping("/addCommentToBlog")
    public void addComment(@RequestParam(value = "blogId") long id,
                           @RequestBody Comment comment) {
        blogService.addComment(id, comment);
    }

    @RequestMapping(value = "/addBlog", method = RequestMethod.POST)
    public void doAddBlog(@RequestParam(value = "name") String name,
                          @RequestParam(value = "body", required = false) String body,
                          @RequestParam(value = "file1", required = false) MultipartFile image1,
                          @RequestParam(value = "file2", required = false) MultipartFile image2,
                          @RequestParam(value = "file3", required = false) MultipartFile image3,
                          @RequestParam(value = "file4", required = false) MultipartFile image4,
                          HttpServletResponse response
    ) throws IOException {
        Blog blog = new Blog();

        blog.setName(name);
        blog.setBody(body);
        blog.setDate(new Date());

        List<Image> images = new ArrayList<>();

        if (image1 != null) {
            images.add(new Image(image1.getOriginalFilename(), image1.getBytes(), blog));
        }
        if (image2 != null) {
            images.add(new Image(image2.getOriginalFilename(), image2.getBytes(), blog));
        }
        if (image3 != null) {
            images.add(new Image(image3.getOriginalFilename(), image3.getBytes(), blog));
        }
        if (image4 != null) {
            images.add(new Image(image4.getOriginalFilename(), image4.getBytes(), blog));
        }

        blog.setImages(images);
        blogService.save(blog);

    }
}
