package app.service;

import app.entity.Blog;
import app.entity.Comment;

import app.repository.BlogRepository;
import app.repository.CommentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;


    public void save(Blog blog) {
        blogRepository.save(blog);
    }

    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    public Blog findOne(long id) {
        Blog blog = blogRepository.findOne(id);

        List<Comment> list = commentRepository.findByBlog(blog);
        if (!list.isEmpty()) {
            blog.setComments(list);
        }

        return blog;
    }


    public List search(String name) {
        List<Blog> list = blogRepository.findAll();
        List<Blog> res = new ArrayList<>();

        for (Blog item : list) {
            if (item.getName().toLowerCase().contains(name.toLowerCase())) {
                res.add(item);
            }
        }
        return res;
    }

    public void edit(long id, String name, Map<String, String> map, String mainImg, String[] urls) {
        Blog blog = blogRepository.findOne(id);
        blog.setName(name);
        blog.setText(map);

        blog.setMainImg(mainImg);

        List<String> arr = new ArrayList<>();
        if (urls != null) {
            for (int i = 0; i < urls.length; i++) {
                arr.add(urls[i]);
            }
        }
        blog.setUrls(arr);
        blogRepository.saveAndFlush(blog);
    }

    public void addComment(long blogId, String author, String body) {
        Blog blog = blogRepository.findOne(blogId);
        List<Comment> list = new ArrayList<>();
        Comment comm = new Comment();
        comm.setAuthor(author);
        comm.setBody(body);
        comm.setDate(new Date());
        comm.setBlog(blog);
        list.add(comm);
        blog.setComments(list);
        blogRepository.save(blog);
    }

}
