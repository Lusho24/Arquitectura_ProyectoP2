package com.api.ecommerce.adapter.controller.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.dto.order.CreateOrderDetailDTO;
import com.api.ecommerce.application.service.order.IOrderDetailService;
import com.api.ecommerce.domain.model.order.OrderDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.api.ecommerce.util.ValidationUtil.getValidationErrors;

@RestController
@RequestMapping("/api/ecommerce/order-detail")
public class OrderDetailRestController {

    @Autowired
    private IOrderDetailService orderDetailService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDetailEntity>> findAllOrderDetails(){
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailService.findAllOrderDetails());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Optional<?>> findOrderDetailById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailService.findOrderDetailById(id));
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> saveOrderDetail(@RequestBody CreateOrderDetailDTO orderDetailDTO,
                                                             BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getValidationErrors(result));
        }

        OrderDetailEntity orderDetail = OrderDetailEntity.builder()
                .purchaseOrderId(orderDetailDTO.getPurchaseOrderId())
                .name(orderDetailDTO.getName())
                .productQuantity(orderDetailDTO.getProductQuantity())
                .price(orderDetailDTO.getPrice())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(orderDetailService.saveOrderDetail(orderDetail));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteOrderDetailById(@PathVariable Long id){
        orderDetailService.deleteOrderDetailById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ExceptionDetailsDTO.builder()
                        .statusCode(200)
                        .message("Detalle de la Orden eliminada exitosamente.")
                        .build()
        );
    }


}
