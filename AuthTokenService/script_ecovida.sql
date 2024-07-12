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
    PASSWORDUSUARIO  VARCHAR(255)  NULL,
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
    FECHACREACIONCARRITO TIMESTAMP          NULL,
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
    FECHAENVIONOTIFICACION TIMESTAMP          NULL,
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
    FECHAORDPEDIDO  TIMESTAMP          NULL,
    ESTADOORDPEDIDO VARCHAR(8)         NULL,
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
    FECHACREACION TIMESTAMP          NULL,
    PRIMARY KEY (IDTICKET),
    CONSTRAINT FK_TICKET_USUARIO FOREIGN KEY (IDUSUARIO)
        REFERENCES usuario (IDUSUARIO)
);



/*==============================================================*/
/* DATOS INICIALES                                              */
/*==============================================================*/

-- INSERTAR datos iniciales de tienda
INSERT INTO tienda (NOMBRETIENDA, DIRECCIONTIENDA, TELFTIENDA, DESCRIPCIONTIENDA, LOGOTIENDA)
VALUES ('EcoVida', 'Calle Principal 123', '09926145', 'Esta es una tienda de ejemplo', 'URL_del_logo_o_imagen');

-- INSERTAR datos iniciales de usuario
INSERT INTO usuario (IDUSUARIO, IDTIENDA, NOMBREUSUARIO, EMAILUSUARIO, PASSWORDUSUARIO, DIRECCIONUSUARIO, TELFUSUARIO)
VALUES ('1726189754', 1, 'Francisco Suntaxi', 'stalynfran007@gmail.com', '$2a$10$zueRIsWPeExEwEk14ARFBuorhC2SsM/ezh5lfcflcYBeDes6RnVL6', 'Calle Principal 456', '09987654321');

-- INSERTAR datos iniciales de rol
INSERT INTO rol (NOMBREROL)
    VALUE ('ADMIN'),
    ('USER');

-- INSERTAR datos iniciales de usuario_rol
INSERT INTO usuario_rol (IDUSUARIO,IDROL)
    VALUE ('1726189754',1),
    ('1726189754',2);



