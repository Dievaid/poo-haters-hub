package acs.poo.backend.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class CommentDTO {
    private String content;
    private Date createdAt;
    private String createdBy;
}
