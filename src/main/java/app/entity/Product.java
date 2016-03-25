package app.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String category;

    @Lob
    @Type(type = "org.hibernate.type.StringClobType")
    @Column(length = Integer.MAX_VALUE)
    private String description;

    private int price;

    private Date dateOnSite;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Date getDateOnSite() {
        return dateOnSite;
    }

    public void setDateOnSite(Date dateOnSite) {
        this.dateOnSite = dateOnSite;
    }
}
