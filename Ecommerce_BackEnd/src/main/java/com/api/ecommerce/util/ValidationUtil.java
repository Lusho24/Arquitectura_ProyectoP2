package com.api.ecommerce.util;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationUtil {

    public static List<Map<String, Object>> getValidationErrors(BindingResult result) {
        List<Map<String, Object>> errors = new ArrayList<>();

        for (FieldError error : result.getFieldErrors()) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("field", error.getField());
            errorMap.put("message", error.getDefaultMessage());
            errors.add(errorMap);
        }

        return errors;
    }

}
