package acs.poo.backend.services;

import acs.poo.backend.entities.User;
import acs.poo.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void addUser(String uid) {
        var user = new User();
        user.setUid(uid);
        userRepository.save(user);
    }
}
