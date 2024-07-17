package com.api.ecommerce.domain.repository.shipment;

import com.api.ecommerce.domain.model.shipment.ShipmentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IShipmentRepository extends CrudRepository<ShipmentEntity, Long> {
    Optional<ShipmentEntity> findByName(String name);

}
