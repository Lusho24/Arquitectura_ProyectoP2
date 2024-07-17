package com.api.ecommerce.adapter.controller.shipment;

import com.api.ecommerce.application.service.shipment.IShipmentService;
import com.api.ecommerce.domain.model.cart.CartEntity;
import com.api.ecommerce.domain.model.shipment.ShipmentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/by-name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findShipmentByName(@PathVariable String name){
        return ResponseEntity.ok().body(shipmentService.findShipmentByName(name));
    }

}
