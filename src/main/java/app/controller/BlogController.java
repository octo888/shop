package app.controller;

import app.entity.Blog;
import app.entity.Comment;
import app.service.BlogService;
import app.util.Constant;
import app.wrappers.BlogWrap;
import app.wrappers.CommentWrap;
import app.wrappers.ObjectWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

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

    @RequestMapping(value = "/addBlog", method = RequestMethod.POST)
    public void doAddBlog(
            @RequestBody BlogWrap wrap
    ) throws IOException {
        Blog blog = new Blog();

        blog.setName(wrap.getName());

        blog.setDate(new Date());
        blog.setMainImg(Constant.IMG_PATH + "/blog/" + wrap.getImg());

        List<String> arr = new ArrayList<>();
        for (int i = 0; i < wrap.getUrls().length; i++) {
            arr.add(Constant.IMG_PATH + "/blog/" + wrap.getUrls()[i]);
        }
        blog.setUrls(arr);

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(wrap.getText(), ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        blog.setText(map);

        blogService.save(blog);
    }

    @RequestMapping(value = "/editBlog", method = RequestMethod.POST)
    public void editBlog(@RequestBody BlogWrap blog
    ) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        List<ObjectWrapper> list = Arrays.asList(mapper.readValue(blog.getText(), ObjectWrapper[].class));

        Map<String, String> map = new HashMap<>();
        for (ObjectWrapper obj : list) {
            map.put(obj.getField(), obj.getValue());
        }

        blogService.edit(blog.getId(), blog.getName(), map, blog.getImg(), blog.getUrls());
    }

    @RequestMapping(value = "/addComment", method = RequestMethod.POST)
    public void addComment(@RequestBody CommentWrap comm) {
        blogService.addComment(comm.getBlogId(), comm.getAuthor(), comm.getBody());
    }
}
