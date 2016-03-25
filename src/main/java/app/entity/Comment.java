package app.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue
    private long id;

    private String author;

    @Lob
    @Type(type = "org.hibernate.type.StringClobType")
    @Column(length = Integer.MAX_VALUE)
    private String body;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }
}
