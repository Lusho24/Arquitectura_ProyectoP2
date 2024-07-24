package com.api.ecommerce.application.service.order;

import com.api.ecommerce.application.dto.ExceptionDetailsDTO;
import com.api.ecommerce.application.exceptions.order.OrderNotFoundException;
import com.api.ecommerce.domain.model.order.OrderDetailEntity;
import com.api.ecommerce.domain.repository.order.IOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService implements IOrderDetailService{

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetailEntity> findAllOrderDetails() {
        return (ArrayList<OrderDetailEntity>)orderDetailRepository.findAll();
    }
    @Override
    public List<OrderDetailEntity> findOrderDetailsByPurchaseOrderId(Long purchaseOrderId) {
        return orderDetailRepository.findByPurchaseOrderId(purchaseOrderId);
    }

    @Override
    public Optional<OrderDetailEntity> findOrderDetailById(Long id) {
        if (orderDetailRepository.existsById(id)){
            return orderDetailRepository.findById(id);
        }
        throw new OrderNotFoundException(
                ExceptionDetailsDTO.builder()
                        .statusCode(404)
                        .message("EL detalle de la orden que esta buscando no existe.")
                        .build()
        );
    }

    @Override
    public OrderDetailEntity saveOrderDetail(OrderDetailEntity orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public void deleteOrderDetailById(Long id) {
        if (orderDetailRepository.existsById(id)){
            orderDetailRepository.deleteById(id);
        } else {
            throw new OrderNotFoundException(
                    ExceptionDetailsDTO.builder()
                            .statusCode(404)
                            .message("EL detalle de la orden ya no existe.")
                            .build());
        }
    }

}
