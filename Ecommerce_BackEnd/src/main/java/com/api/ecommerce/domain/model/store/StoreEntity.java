package com.api.ecommerce.domain.model.store;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tienda")
public class StoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDTIENDA")
    private Long id;

    @Column(name = "NOMBRETIENDA")
    private String name;

    @Column(name = "DIRECCIONTIENDA")
    private String address;

    @Column(name = "TELFTIENDA")
    private String phone;

    @Column(name = "DESCRIPCIONTIENDA")
    private String description;

    @Column(name = "LOGOTIENDA")
    private String imgLogo;

}
