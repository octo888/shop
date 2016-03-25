package app.service;

import app.entity.Role;
import app.entity.User;
import app.repository.RoleRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import javax.xml.bind.DatatypeConverter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class InitDBService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {

        if (roleRepository.findByName("ROLE_ADMIN") == null) {
            Role roleUser = new Role();
            roleUser.setName("ROLE_USER");
            roleRepository.save(roleUser);

            Role roleAdmin = new Role();
            roleAdmin.setName("ROLE_ADMIN");
            roleRepository.save(roleAdmin);

            User userAdmin = new User();
            userAdmin.setEnabled(true);
            userAdmin.setName("admin");

            String salt = BCrypt.gensalt(12);
            String hashed_password = BCrypt.hashpw("admin", salt);
            userAdmin.setPassword(hashed_password);

            List<Role> roles = new ArrayList<>();
            roles.add(roleAdmin);
            roles.add(roleUser);
            userAdmin.setRoles(roles);
            userRepository.save(userAdmin);
        }

    }
}
