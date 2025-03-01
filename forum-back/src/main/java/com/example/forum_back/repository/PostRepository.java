package com.example.forum_back.repository;

import com.example.forum_back.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUsername(String username);
}
