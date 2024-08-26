package com.api.ecommerce.adapter.controller.store;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.dto.store.CreateStoreDTO;
import com.api.ecommerce.application.service.store.IStoreService;
import com.api.ecommerce.domain.model.store.StoreEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.api.ecommerce.util.ValidationUtil.getValidationErrors;

@RestController
@RequestMapping("/api/ecommerce/store")
public class StoreDetailRestController {

    @Autowired
    private IStoreService storeService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<StoreEntity>> findAllStores(){
        return ResponseEntity.ok().body(storeService.findAllStores());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findStoreById(@PathVariable Long id){
        return ResponseEntity.ok().body(storeService.findStoreById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveStore(@Valid @RequestBody CreateStoreDTO storeDTO, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(getValidationErrors(result));
        }

        StoreEntity store = StoreEntity.builder()
                .name(storeDTO.getName())
                .address(storeDTO.getAddress())
                .phone(storeDTO.getPhone())
                .description(storeDTO.getPhone())
                .imgLogo(storeDTO.getImgLogo())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(storeService.saveStore(store));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteStoreById(@PathVariable Long id){
        storeService.deleteStoreById(id);
        return ResponseEntity.ok().body(
                ExceptionDetailsDTO.builder().statusCode(200).message("Tienda eliminada exitosamente.").build()
        );
    }

}
