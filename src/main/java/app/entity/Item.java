package app.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String category;

    private int categoryType;

    @Lob
    @Type(type = "org.hibernate.type.StringClobType")
    @Column(length = Integer.MAX_VALUE)
    private String description;

    private int price;

    private Date dateOnSite;

    private boolean top;

    @ElementCollection
    private Map<String,String> charact;

    @ElementCollection
    private List<Long> imagesId;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images;

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

    public Map<String, String> getCharact() {
        return charact;
    }

    public void setCharact(Map<String, String> charact) {
        this.charact = charact;
    }

    public List<Long> getImagesId() {
        return imagesId;
    }

    public void setImagesId(List<Long> imagesId) {
        this.imagesId = imagesId;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public int getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(int categoryType) {
        this.categoryType = categoryType;
    }

    public boolean isTop() {
        return top;
    }

    public void setTop(boolean top) {
        this.top = top;
    }
}
