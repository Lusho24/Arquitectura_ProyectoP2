package com.api.ecommerce.adapter.controller.order;

import com.api.ecommerce.application.dto.CreatePaymentOrderDTO;
import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.service.order.IPaymentOrderService;
import com.api.ecommerce.domain.model.order.PaymentOrderEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.api.ecommerce.util.ValidationUtil.getValidationErrors;

@RestController
@RequestMapping("/api/ecommerce/payment-order")
public class PaymentOrderRestController {

    @Autowired
    private IPaymentOrderService paymentOrderService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity <List<PaymentOrderEntity>> findAllPaymentOrders(){
        return ResponseEntity.status(HttpStatus.OK).body(paymentOrderService.findAllPaymentOrders());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findPaymentOrderById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(paymentOrderService.findPaymentOrderById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> savePaymentOrder(@Valid @RequestBody CreatePaymentOrderDTO paymentOrderDTO, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getValidationErrors(result));
        }

        PaymentOrderEntity paymentOrder = PaymentOrderEntity.builder()
                .cartId(paymentOrderDTO.getCartId())
                .shipmentId(paymentOrderDTO.getShipmentId())
                .method(paymentOrderDTO.getMethod().toUpperCase())
                .state(paymentOrderDTO.getState().toUpperCase())
                .total(paymentOrderDTO.getTotal())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(paymentOrderService.savePaymentOrder(paymentOrder));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePaymentOrderById(@PathVariable Long id){
        paymentOrderService.deletePaymentOrderById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder()
                        .statusCode(200)
                        .message("Orden de pago eliminada exitosamente.")
                        .build()
        );
    }

}
