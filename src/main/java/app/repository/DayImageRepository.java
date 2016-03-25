package app.repository;


import app.entity.DayImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayImageRepository extends JpaRepository<DayImage, Long> {
}
