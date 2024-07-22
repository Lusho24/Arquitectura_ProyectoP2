-- ** CONFIGURACION INICIAL **
SET NAMES utf8mb4 COLLATE utf8mb4_0900_ai_ci;


/*==============================================================*/
/* Table: TIENDA                                                */
/*==============================================================*/
CREATE TABLE tienda
(
    IDTIENDA          INT AUTO_INCREMENT NOT NULL,
    NOMBRETIENDA      VARCHAR(32)        NULL,
    DIRECCIONTIENDA   VARCHAR(64)        NULL,
    TELFTIENDA        VARCHAR(16)        NULL,
    DESCRIPCIONTIENDA VARCHAR(128)       NULL,
    LOGOTIENDA        LONG VARCHAR       NULL,
    PRIMARY KEY (IDTIENDA)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
CREATE TABLE usuario
(
    IDUSUARIO        VARCHAR(16)  NOT NULL,
    IDTIENDA         INT          NULL,
    NOMBREUSUARIO    VARCHAR(32)  NULL,
    EMAILUSUARIO     VARCHAR(32)  NULL,
    PASSWORDUSUARIO  VARCHAR(255) NULL,
    DIRECCIONUSUARIO VARCHAR(128) NULL,
    TELFUSUARIO      VARCHAR(16)  NULL,
    PRIMARY KEY (IDUSUARIO),
    CONSTRAINT FK_USUARIO_TIENDA FOREIGN KEY (IDTIENDA)
        REFERENCES tienda (IDTIENDA),
    CONSTRAINT UC_EMAIL_UNIQUE UNIQUE (EMAILUSUARIO)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
CREATE TABLE rol
(
    IDROL     INT AUTO_INCREMENT,
    NOMBREROL ENUM ('ADMIN', 'USER') NULL,
    PRIMARY KEY (IDROL)
);

/*==============================================================*/
/* Table: USUARIO_ROL                                           */
/*==============================================================*/
CREATE TABLE usuario_rol
(
    IDUSUARIO VARCHAR(16) NOT NULL,
    IDROL     INT         NOT NULL,
    PRIMARY KEY (IDUSUARIO, IDROL),
    KEY KEYIDUSUARIO (IDUSUARIO),
    CONSTRAINT KEYIDUSUARIO FOREIGN KEY (IDUSUARIO)
        REFERENCES usuario (IDUSUARIO),
    FOREIGN KEY (IDROL)
        REFERENCES rol (IDROL)
);

/*==============================================================*/
/* Table: CATEGORIA_PRODUCTO                                    */
/*==============================================================*/
CREATE TABLE categoria_producto
(
    IDCATEGORIA     INT AUTO_INCREMENT NOT NULL,
    NOMBRECATEGORIA VARCHAR(32)        NULL,
    PRIMARY KEY (IDCATEGORIA)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
CREATE TABLE producto
(
    IDPRODUCTO          INT AUTO_INCREMENT NOT NULL,
    IDCATEGORIA         INT                NOT NULL,
    NOMBREPRODUCTO      VARCHAR(32)        NULL,
    DESCRIPCIONPRODUCTO VARCHAR(64)        NULL,
    IMAGENPRODUCTO      LONG VARCHAR       NULL,
    PRECIOPRODUCTO      DECIMAL(10, 2)     NULL,
    STOCKPRODUCTO       INT                NULL,
    PRIMARY KEY (IDPRODUCTO),
    CONSTRAINT FK_PRODUCTO_CATEGORIA FOREIGN KEY (IDCATEGORIA)
        REFERENCES categoria_producto (IDCATEGORIA)
);

/*==============================================================*/
/* Table: CARRITO                                               */
/*==============================================================*/
CREATE TABLE carrito
(
    IDCARRITO            INT AUTO_INCREMENT NOT NULL,
    IDUSUARIO            VARCHAR(16)        NOT NULL,
    FECHACREACIONCARRITO DATETIME           NULL,
    TOTALCARRITO         DECIMAL(10, 2)     NULL,
    PRIMARY KEY (IDCARRITO),
    CONSTRAINT FK_CARRITO_USUARIO_C_USUARIO FOREIGN KEY (IDUSUARIO)
        REFERENCES usuario (IDUSUARIO)
);

/*==============================================================*/
/* Table: DETALLE_CARRITO                                       */
/*==============================================================*/
CREATE TABLE detalle_carrito
(
    IDDETALLE               INT AUTO_INCREMENT NOT NULL,
    IDPRODUCTO              INT                NOT NULL,
    IDCARRITO               INT                NOT NULL,
    CANTIDADPRODUCTOCARRITO INT                NULL,
    PRIMARY KEY (IDDETALLE),
    CONSTRAINT FK_DETALLE_CARRITO_CARRITO FOREIGN KEY (IDCARRITO)
        REFERENCES carrito (IDCARRITO),
    CONSTRAINT FK_DETALLE_PRODUCTO_PRODUCTO FOREIGN KEY (IDPRODUCTO)
        REFERENCES producto (IDPRODUCTO)
);

/*==============================================================*/
/* Table: ENVIO                                                 */
/*==============================================================*/
CREATE TABLE envio
(
    IDENVIO     INT AUTO_INCREMENT NOT NULL,
    NOMBREENVIO VARCHAR(32)        NULL,
    PRECIOENVIO DECIMAL(10, 2)     NULL,
    PRIMARY KEY (IDENVIO)
);

/*==============================================================*/
/* Table: NOTIFICACION                                          */
/*==============================================================*/
CREATE TABLE notificacion
(
    IDNOTIFICACION         INT AUTO_INCREMENT NOT NULL,
    IDUSUARIO              VARCHAR(16)        NOT NULL,
    MENSAJENOTIFICACION    VARCHAR(64)        NULL,
    FECHAENVIONOTIFICACION DATETIME           NULL,
    PRIMARY KEY (IDNOTIFICACION),
    CONSTRAINT FK_NOTIFICACION_USUARIO FOREIGN KEY (IDUSUARIO)
        REFERENCES usuario (IDUSUARIO)
);

/*==============================================================*/
/* Table: ORDEN_PAGO                                            */
/*==============================================================*/
CREATE TABLE orden_pago
(
    IDPAGO     INT AUTO_INCREMENT NOT NULL,
    IDCARRITO  INT                NOT NULL,
    IDENVIO    INT                NOT NULL,
    METODOPAGO VARCHAR(16)        NULL,
    ESTADOPAGO VARCHAR(16)        NULL,
    TOTALPAGO  DECIMAL(10, 2)     NULL,
    PRIMARY KEY (IDPAGO),
    CONSTRAINT FK_ORDEN_PAGO_ENVIO FOREIGN KEY (IDENVIO)
        REFERENCES envio (IDENVIO),
    CONSTRAINT FK_ORDEN_PAGO_CARRITO FOREIGN KEY (IDCARRITO)
        REFERENCES carrito (IDCARRITO)
);

/*==============================================================*/
/* Table: ORDEN_PEDIDO                                          */
/*==============================================================*/
CREATE TABLE orden_pedido
(
    IDORDPEDIDO     INT AUTO_INCREMENT NOT NULL,
    IDPAGO          INT                NOT NULL,
    FECHAORDPEDIDO  DATETIME           NULL,
    ESTADOORDPEDIDO VARCHAR(16)        NULL,
    PRIMARY KEY (IDORDPEDIDO),
    CONSTRAINT FK_ORDEN_PEDIDO_PAGO FOREIGN KEY (IDPAGO)
        REFERENCES orden_pago (IDPAGO)
);

/*==============================================================*/
/* Table: TICKET                                                */
/*==============================================================*/
CREATE TABLE ticket
(
    IDTICKET      INT AUTO_INCREMENT NOT NULL,
    IDUSUARIO     VARCHAR(16)        NOT NULL,
    ASUNTO        VARCHAR(32)        NULL,
    MENSAJE       VARCHAR(128)       NULL,
    ESTADO        VARCHAR(16)        NULL,
    FECHACREACION DATETIME           NULL,
    PRIMARY KEY (IDTICKET),
    CONSTRAINT FK_TICKET_USUARIO FOREIGN KEY (IDUSUARIO)
        REFERENCES usuario (IDUSUARIO)
);

/*==============================================================*/
/* Table: DETALLE_ORDEN                                         */
/*==============================================================*/
CREATE TABLE detalle_orden
(
    IDDETALLEORD        INTEGER AUTO_INCREMENT NOT NULL,
    IDORDPEDIDO         INTEGER                NOT NULL,
    NOMBREDETALLEPROD   VARCHAR(32)            NULL,
    CANTIDADDETALLEPROD INTEGER                NULL,
    PRECIODETALLEPROD   DECIMAL(10, 2)         NULL,
    PRIMARY KEY (IDDETALLEORD),
    CONSTRAINT FK_DETALLE_ORDEN_ORDEN_PEDIDO FOREIGN KEY (IDORDPEDIDO)
        REFERENCES orden_pedido (IDORDPEDIDO)
);


/*==============================================================*/
/* DATOS INICIALES                                              */
/*==============================================================*/

-- INSERTAR datos iniciales de tienda
INSERT INTO tienda (NOMBRETIENDA, DIRECCIONTIENDA, TELFTIENDA, DESCRIPCIONTIENDA, LOGOTIENDA)
VALUES ('EcoVida', 'Calle Principal 123', '09926145', 'Esta es una tienda de ejemplo', 'URL_del_logo_o_imagen');
-- INSERTAR categorias
INSERT INTO categoria_producto (NOMBRECATEGORIA) 
VALUES 
    ('verduras'), 
    ('frutas'), 
    ('dulces');
-- INSERTAR datos iniciales de usuario
INSERT INTO usuario (IDUSUARIO, IDTIENDA, NOMBREUSUARIO, EMAILUSUARIO, PASSWORDUSUARIO, DIRECCIONUSUARIO, TELFUSUARIO)
VALUES ('1726189754', 1, 'Francisco Suntaxi', 'stalynfran007@gmail.com',
        '$2a$10$3MPdW/Smy64P8Re0Cn.QP.D6Wl2jlFZ7un0zUbsrwYZ5tb7pggGxy', 'Calle Principal 456', '09987654321'),
       ('1712345678', 1, 'Administrador', 'admin@gmail.com',
        '$2a$10$hNk1aZ3.bnJV2fPdctzw7.YIOTLnqAzRTdM51HPhxPLFcTkSebhZm', 'Calle Principal 456, Sangolqui',
        '09987654322'),
       ('1798765430', 1, 'Usuario Casual', 'user@gmail.com',
        '$2a$10$No/R/R6UP/cJqXpfcvCa6udjzFeJsZlEEK9tWeoZZBm8McK4PRboC', 'Avenida Principal, Quito',
        '09887654322');

-- INSERTAR datos iniciales de rol
INSERT INTO rol (NOMBREROL)
    VALUE ('ADMIN'),
    ('USER');

-- INSERTAR datos iniciales de usuario_rol
INSERT INTO usuario_rol (IDUSUARIO, IDROL)
    VALUE ('1726189754', 1),
    ('1726189754', 2);
INSERT INTO usuario_rol (IDUSUARIO, IDROL)
    VALUE ('1712345678', 1),
    ('1712345678', 2);
INSERT INTO usuario_rol (IDUSUARIO, IDROL)
    VALUE ('1798765430', 2);

-- INSERTAR datos iniciales de carrito
INSERT INTO carrito (IDUSUARIO, FECHACREACIONCARRITO, TOTALCARRITO)
    VALUE ('1726189754', '2024-07-15T13:02:31', 0.00),
    ('1712345678', '2024-07-15T14:01:40', 0.00),
    ('1798765430', '2024-07-16T18:58:08', 0.00);

-- INSERTAR datos iniciales de envío
INSERT INTO envio (NOMBREENVIO, PRECIOENVIO)
    VALUE ('Sangolquí', 4.99),
    ('Quito', 2.80),
    ('Ibarra', 8.20);

-- INSERTAR datos iniciales de orden_pago
INSERT INTO orden_pago (IDCARRITO, IDENVIO, METODOPAGO, ESTADOPAGO, TOTALPAGO)
    VALUE (1, 1, 'EFECTIVO', 'PENDIENTE', 29.99),
    (2, 2, 'TRANSFERENCIA', 'EN PROCESO', 15.27),
    (3, 2, 'PAYPAL', 'PAGADO', 99.99);

-- INSERTAR datos iniciales de orden_pedido
INSERT INTO orden_pedido (IDPAGO, FECHAORDPEDIDO, ESTADOORDPEDIDO)
    VALUE (1, '2024-07-16T18:59:08', 'PENDIENTE'),
    (2, '2024-07-16T19:25:08', 'TERMINADO'),
    (3, '2024-07-16T20:12:08', 'TERMINADO');
