package com.api.ecommerce.domain.model.shipment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "envio")
public class ShipmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDENVIO")
    private Long id;

    @Column(name = "NOMBREENVIO")
    private String name;

    @Column(name = "PRECIOENVIO")
    private BigDecimal price;

}
