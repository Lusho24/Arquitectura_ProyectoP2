package com.api.ecommerce.domain.model.cart;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "carrito")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCARRITO")
    private Long id;

    @Column(name = "IDUSUARIO")
    private String userId;

    @Column(name = "FECHACREACIONCARRITO")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime creationDate;

    @Column(name = "TOTALCARRITO")
    private BigDecimal total;

    @PrePersist
    public void prePersist(){
        ZoneId zoneId = ZoneId.of("America/Guayaquil");
        this.creationDate = ZonedDateTime.now(zoneId).toLocalDateTime();
    }

}
