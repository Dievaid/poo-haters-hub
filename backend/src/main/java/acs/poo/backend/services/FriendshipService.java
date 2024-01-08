package acs.poo.backend.services;

import acs.poo.backend.entities.Friendship;
import acs.poo.backend.errors.FriendshipAlreadyExistsError;
import acs.poo.backend.errors.FriendshipNotFoundError;
import acs.poo.backend.errors.UserNotFoundError;
import acs.poo.backend.repositories.FriendshipRepository;
import acs.poo.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public void createFriendship(String sender, String receiver) throws FriendshipAlreadyExistsError, UserNotFoundError {
        var senderData = userRepository.findById(sender).orElseThrow(UserNotFoundError::new);
        var receiverData = userRepository.findById(receiver).orElseThrow(UserNotFoundError::new);

        if (friendshipRepository.findBySenderAndReceiver(senderData, receiverData).isPresent()) {
            throw new FriendshipAlreadyExistsError();
        }

        if (friendshipRepository.findBySenderAndReceiver(receiverData, receiverData).isPresent()) {
            throw new FriendshipAlreadyExistsError();
        }

        Friendship friendship = new Friendship();
        friendship.setSender(senderData);
        friendship.setReceiver(receiverData);
        friendship.setAccepted(false);

        friendshipRepository.save(friendship);
    }

    public void acceptFriendship(String sender, String receiver) throws FriendshipNotFoundError, UserNotFoundError {
        var senderData = userRepository.findById(sender).orElseThrow(UserNotFoundError::new);
        var receiverData = userRepository.findById(receiver).orElseThrow(UserNotFoundError::new);

        var friendships = friendshipRepository.findBySenderAndReceiver(senderData, receiverData);

        var friendship = friendships.stream().findFirst().orElseThrow(FriendshipNotFoundError::new);
        friendship.setAccepted(true);
        friendship.setCreatedAt(Timestamp.from(Instant.now()));
        friendshipRepository.save(friendship);
    }
}
