package com.api.ecommerce.domain.model.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "orden_pedido")
public class PurchaseOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDORDPEDIDO")
    private Long id;

    @Column(name = "IDPAGO")
    private Long paymentOrderId;

    @Column(name = "FECHAORDPEDIDO")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime creationDate;

    @Column(name = "ESTADOORDPEDIDO")
    private String state;


    @PrePersist
    public void prePersist(){
        ZoneId zoneId = ZoneId.of("America/Guayaquil");
        this.creationDate = ZonedDateTime.now(zoneId).toLocalDateTime();
    }

}
