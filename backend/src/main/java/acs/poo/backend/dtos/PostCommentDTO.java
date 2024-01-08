package acs.poo.backend.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class PostCommentDTO {
    private String content;
    private Date createdAt;
    private String createdBy;
    private List<CommentDTO> comments;
}
