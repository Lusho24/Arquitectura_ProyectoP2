package com.api.ecommerce.adapter.controller.shipment;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.service.shipment.IShipmentService;
import com.api.ecommerce.domain.model.cart.CartEntity;
import com.api.ecommerce.domain.model.shipment.ShipmentEntity;
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
@RequestMapping("/api/ecommerce/shipment")
public class ShipmentRestController {

    @Autowired
    private IShipmentService shipmentService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<ShipmentEntity>> findAllShipments(){
        return ResponseEntity.ok().body(shipmentService.findAllShipments());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findShipmentById(@PathVariable Long id){
        return ResponseEntity.ok().body(shipmentService.findShipmentById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveShipment(@Valid @RequestBody ShipmentEntity shipment, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(getValidationErrors(result));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(shipmentService.saveShipment(shipment));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id){
        shipmentService.deleteShipmentById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder().statusCode(200).message("Envio eliminado exitosamente.").build()
        );
    }

    @GetMapping("/by-name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findShipmentByName(@PathVariable String name){
        return ResponseEntity.ok().body(shipmentService.findShipmentByName(name));
    }

}
