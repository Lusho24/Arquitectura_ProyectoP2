package com.api.ecommerce.domain.model.cart;

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
@Table(name = "detalle_carrito")
public class CartDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDDETALLE")
    private Long id;

    @Column(name = "IDPRODUCTO")
    private Long productId;

    @Column(name = "IDCARRITO")
    private Long cartId;

    @Column(name = "CANTIDADPRODUCTOCARRITO")
    private int productQuantity;

}
