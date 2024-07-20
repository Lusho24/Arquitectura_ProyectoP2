package com.api.ecommerce.adapter.controller.order;

import com.api.ecommerce.application.dto.order.CreatePurchaseOrderDTO;
import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.service.order.IPurchaseOrderService;
import com.api.ecommerce.domain.model.order.PurchaseOrderEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.api.ecommerce.util.ValidationUtil.getValidationErrors;

@RestController
@RequestMapping("/api/ecommerce/purchase-order")
public class PurchaseOrderRestController {

    @Autowired
    private IPurchaseOrderService purchaseOrderService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<PurchaseOrderEntity>> findAllPurchaseOrders(){
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOrderService.findAllPurchaseOrders());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Optional<?>> findPurchaseOrderById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOrderService.findPurchaseOrderById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> savePurchaseOrder(@Valid @RequestBody CreatePurchaseOrderDTO purchaseOrderDTO,
                                                 BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getValidationErrors(result));
        }

        PurchaseOrderEntity purchaseOrder = PurchaseOrderEntity.builder()
                .paymentOrderId(purchaseOrderDTO.getPaymentOrderId())
                .state(purchaseOrderDTO.getState().toUpperCase())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(purchaseOrderService.savePurchaseOrder(purchaseOrder));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePurchaseOrderById(@PathVariable Long id){
        purchaseOrderService.deletePurchaseOrderById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder()
                        .statusCode(200)
                        .message("Orden de pedido/compra eliminada exitosamente.")
                        .build()
        );
    }

    @PatchMapping("/{id}/state")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> updateState(@PathVariable Long id,
                                         @Valid @RequestBody Map<String,String> updateState){
        String state = updateState.get("state");
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOrderService.updateState(id, state));
    }

}
