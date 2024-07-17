package com.api.ecommerce.application.service.shipment;

import com.api.ecommerce.domain.model.shipment.ShipmentEntity;

import java.util.List;
import java.util.Optional;

public interface IShipmentService {

    public List<ShipmentEntity> findAllShipments();
    public Optional<ShipmentEntity> findShipmentById(Long id);
    public Optional<ShipmentEntity> findShipmentByName(String name);

}
