package app.entity;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] body;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    public Image() {
    }

    public Image(String name, byte[] body) {
        this.name = name;
        this.body = body;
    }

    public Image(String name, byte[] body, Blog blog) {
        this.name = name;
        this.body = body;
        this.blog = blog;
    }

    public Image(String name, byte[] body, Item item) {
        this.name = name;
        this.body = body;
        this.item = item;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getBody() {
        return body;
    }

    public void setBody(byte[] body) {
        this.body = body;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
