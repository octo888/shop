package app.service;

import app.entity.Blog;
import app.entity.Comment;
import app.entity.Image;
import app.repository.BlogRepository;
import app.repository.CommentRepository;
import app.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ImageRepository imageRepository;

    public void save(Blog blog) {
        blogRepository.save(blog);
    }

    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    public Blog findOne(long id) {
        Blog blog = blogRepository.findOne(id);
        blog.setComments(commentRepository.findByBlog(blog));
        return blog;
    }

    /*public void addComment(long id, Comment comment) {
        Blog blog = blogRepository.findOne(id);

        comment.setBlog(blog);
        commentRepository.save(comment);

        List<Comment> list = blog.getComments();
        list.add(comment);
        blog.setComments(list);
        blogRepository.saveAndFlush(blog);
    }*/

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

    public void edit(long id, String name, String body, String mainImg, String[] urls) {
        Blog blog = blogRepository.findOne(id);
        blog.setName(name);
        blog.setBody(body);

        blog.setMainImg(mainImg);

        List<String> arr = new ArrayList<>();
        for (int i = 0; i < urls.length; i++) {
            arr.add(urls[i]);
        }
        blog.setUrls(arr);
        blogRepository.saveAndFlush(blog);
    }

    public void addComment(long blogId, String author, String body) {
        Blog blog = blogRepository.findOne(blogId);
        List<Comment> list = blog.getComments();

        Comment comm = new Comment();
        comm.setAuthor(author);
        comm.setBody(body);
        comm.setDate(new Date());
        comm.setBlog(blog);
        commentRepository.save(comm);

        list.add(comm);
        blog.setComments(list);
        blogRepository.saveAndFlush(blog);
    }

}
