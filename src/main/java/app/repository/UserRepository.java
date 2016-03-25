package app.repository;

import app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.security.Principal;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);
}
