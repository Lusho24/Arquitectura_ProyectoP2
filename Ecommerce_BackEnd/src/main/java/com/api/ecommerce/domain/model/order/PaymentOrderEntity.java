package com.api.ecommerce.domain.model.order;

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
@Table(name = "orden_pago")
public class PaymentOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPAGO")
    private Long id;

    @Column(name = "IDCARRITO")
    private Long cartId;

    @Column(name = "IDENVIO")
    private Long shipmentId;

    @Column(name = "METODOPAGO")
    private String method;

    @Column(name = "ESTADOPAGO")
    private String state;

    @Column(name = "TOTALPAGO")
    private BigDecimal total;

}
