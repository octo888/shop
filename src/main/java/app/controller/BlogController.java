package app.controller;

import app.entity.Blog;
import app.entity.Comment;
import app.entity.Image;
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

    /*@RequestMapping("/addCommentToBlog")
    public void addComment(@RequestParam(value = "blogId") long id,
                           @RequestBody Comment comment) {
        blogService.addComment(id, comment);
    }*/

    @RequestMapping(value = "/addBlog", method = RequestMethod.POST)
    public void doAddBlog(
            /*@RequestParam(value = "name") String name,
                          @RequestParam(value = "text", required = false) String text,
                          @RequestParam(value = "mainImg") String mainImg,
                          @RequestParam(value = "urls", required = false) String[] urls*/
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
    public void editBlog(@RequestParam(value = "name") String name,
                          @RequestParam(value = "id") long id,
                          @RequestParam(value = "body", required = false) String body,
                          @RequestParam(value = "mainImg") String mainImg,
                          @RequestParam(value = "urls", required = false) String[] urls
    ) throws IOException {
        blogService.edit(id, name, body, mainImg, urls);
    }

    @RequestMapping(value = "/addComment", method = RequestMethod.POST)
    public void addComment(@RequestBody CommentWrap comm) {
        blogService.addComment(comm.getBlogId(), comm.getAuthor(), comm.getBody());
    }
}
