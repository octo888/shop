package app.controller;

import app.entity.Blog;
import app.entity.Comment;
import app.entity.Image;
import app.service.BlogService;
import app.util.Constant;
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
                          @RequestParam(value = "mainImg") String mainImg,
                          @RequestParam(value = "urls", required = false) String[] urls
    ) throws IOException {
        Blog blog = new Blog();

        blog.setName(name);
        blog.setBody(body);
        blog.setDate(new Date());
        blog.setMainImg(Constant.IMG_PATH + "/blog/" + mainImg);

        List<String> arr = new ArrayList<>();
        for (int i = 0; i < urls.length; i++) {
            arr.add(Constant.IMG_PATH + "/blog/" + urls[i]);
        }
        blog.setUrls(arr);

        blogService.save(blog);

    }
}
