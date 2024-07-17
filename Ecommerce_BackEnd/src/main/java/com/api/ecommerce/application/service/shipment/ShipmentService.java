package com.api.ecommerce.application.service.shipment;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.shipment.ShipmentNotFoundException;
import com.api.ecommerce.domain.model.shipment.ShipmentEntity;
import com.api.ecommerce.domain.repository.shipment.IShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService implements IShipmentService{

    @Autowired
    private IShipmentRepository shipmentRepository;

    @Override
    public List<ShipmentEntity> findAllShipments() {
        return (ArrayList<ShipmentEntity>)shipmentRepository.findAll();
    }

    @Override
    public Optional<ShipmentEntity> findShipmentById(Long id) {
        if (shipmentRepository.existsById(id)){
            return shipmentRepository.findById(id);
        }
        throw new ShipmentNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El envío que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public Optional<ShipmentEntity> findShipmentByName(String name) {
        Optional<ShipmentEntity> existShipment = shipmentRepository.findByName(name);
        if (existShipment.isPresent()){
            return existShipment;
        }
        throw new ShipmentNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("El envío que esta buscando no existe.")
                        .build()
        );
    }

}
