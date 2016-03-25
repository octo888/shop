package app.repository;

import app.entity.Blog;
import app.entity.Image;
import app.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByItem(Item item);

    List<Image> findByBlog(Blog b);
}
