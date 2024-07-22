package com.api.ecommerce.domain.model.order;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "detalle_orden")
public class OrderDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDDETALLEORD")
    private Long id;

    @Column(name = "IDORDPEDIDO")
    private Long purchaseOrderId;

    @Column(name = "NOMBREDETALLEPROD")
    private String name;

    @Column(name = "CANTIDADDETALLEPROD")
    private int productQuantity;

    @Column(name = "PRECIODETALLEPROD")
    private BigDecimal price;

}
