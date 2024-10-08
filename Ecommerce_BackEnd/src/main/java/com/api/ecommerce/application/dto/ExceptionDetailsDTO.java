package com.api.ecommerce.application.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExceptionDetailsDTO {
    private int statusCode;
    private String message;
}
