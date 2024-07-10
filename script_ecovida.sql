/*==============================================================*/
/* Table: TIENDA                                                */
/*==============================================================*/
CREATE TABLE tienda
(
   IDTIENDA             INT                             NOT NULL,
   NOMBRETIENDA         VARCHAR(32)                     NULL,
   DIRECCIONTIENDA      VARCHAR(64)                     NULL,
   TELFTIENDA           VARCHAR(16)                     NULL,
   DESCRIPCIONTIENDA    VARCHAR(128)                    NULL,
   LOGOTIENDA       	LONG VARCHAR                    NULL,
   PRIMARY KEY (IDTIENDA)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
CREATE TABLE usuario
(
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   IDTIENDA             INT                             NULL,
   NOMBREUSUARIO        VARCHAR(32)                     NULL,
   EMAILUSUARIO         VARCHAR(32)                     NULL,
   PASSWORDUSUARIO      VARCHAR(16)                     NULL,
   DIRECCIONUSUARIO     VARCHAR(128)                    NULL,
   TELFUSUARIO          VARCHAR(16)                     NULL,
   PRIMARY KEY (IDUSUARIO),
   CONSTRAINT FK_USUARIO_TIENDA FOREIGN KEY (IDTIENDA)
      REFERENCES tienda (IDTIENDA)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
CREATE TABLE rol
(
   IDROL                INT                             NOT NULL,
   NOMBREROL            VARCHAR(16)                     NULL,
   PRIMARY KEY (IDROL)
);

/*==============================================================*/
/* Table: USUARIO_ROL                                           */
/*==============================================================*/
CREATE TABLE usuario_rol 
(
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   IDROL                INT                             NOT NULL,
   PRIMARY KEY (IDUSUARIO, IDROL),
   CONSTRAINT FK_USUARIO_ROL_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES usuario (IDUSUARIO),
   CONSTRAINT FK_USUARIO_ROL_ROL FOREIGN KEY (IDROL)
      REFERENCES rol (IDROL)
);

/*==============================================================*/
/* Table: CATEGORIA_PRODUCTO                                    */
/*==============================================================*/
CREATE TABLE categoria_producto 
(
   IDCATEGORIA          INT                             NOT NULL,
   NOMBRECATEGORIA      VARCHAR(32)                     NULL,
   PRIMARY KEY (IDCATEGORIA)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
CREATE TABLE producto
(
   IDPRODUCTO           INT                             NOT NULL,
   IDCATEGORIA          INT                             NOT NULL,
   NOMBREPRODUCTO       VARCHAR(32)                     NULL,
   DESCRIPCIONPRODUCTO  VARCHAR(64)                     NULL,
   IMAGENPRODUCTO       LONG VARCHAR                    NULL,
   PRECIOPRODUCTO       DECIMAL(10,2)                   NULL,
   STOCKPRODUCTO        INT                             NULL,
   PRIMARY KEY (IDPRODUCTO),
   CONSTRAINT FK_PRODUCTO_CATEGORIA FOREIGN KEY (IDCATEGORIA)
      REFERENCES categoria_producto (IDCATEGORIA)
);

/*==============================================================*/
/* Table: CARRITO                                               */
/*==============================================================*/
CREATE TABLE carrito
(
   IDCARRITO            INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   FECHACREACIONCARRITO TIMESTAMP                       NULL,
   TOTALCARRITO         DECIMAL(10,2)                   NULL,
   PRIMARY KEY (IDCARRITO),
   CONSTRAINT FK_CARRITO_USUARIO_C_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES usuario (IDUSUARIO)
);

/*==============================================================*/
/* Table: DETALLE_CARRITO                                       */
/*==============================================================*/
CREATE TABLE detalle_carrito
(
   IDDETALLE            INT                             NOT NULL,
   IDPRODUCTO           INT                             NOT NULL,
   IDCARRITO            INT                             NOT NULL,
   CANTIDADPRODUCTOCARRITO INT                          NULL,
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
   IDENVIO              INT                             NOT NULL,
   NOMBREENVIO          VARCHAR(32)                     NULL,
   PRECIOENVIO          DECIMAL(10,2)                   NULL,
   PRIMARY KEY (IDENVIO)
);

/*==============================================================*/
/* Table: NOTIFICACION                                          */
/*==============================================================*/
CREATE TABLE notificacion
(
   IDNOTIFICACION       INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   MENSAJENOTIFICACION  VARCHAR(64)                     NULL,
   FECHAENVIONOTIFICACION TIMESTAMP                     NULL,
   PRIMARY KEY (IDNOTIFICACION),
   CONSTRAINT FK_NOTIFICACION_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES usuario (IDUSUARIO)
);

/*==============================================================*/
/* Table: ORDEN_PAGO                                            */
/*==============================================================*/
CREATE TABLE orden_pago
(
   IDPAGO               INT                             NOT NULL,
   IDCARRITO            INT                             NOT NULL,
   IDENVIO              INT                             NOT NULL,
   METODOPAGO           VARCHAR(16)                     NULL,
   ESTADOPAGO           VARCHAR(16)                     NULL,
   TOTALPAGO            DECIMAL(10,2)                   NULL,
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
   IDORDPEDIDO          INT                             NOT NULL,
   IDPAGO               INT                             NOT NULL,
   FECHAORDPEDIDO       TIMESTAMP                       NULL,
   ESTADOORDPEDIDO      VARCHAR(8)                      NULL,
   PRIMARY KEY (IDORDPEDIDO),
   CONSTRAINT FK_ORDEN_PEDIDO_PAGO FOREIGN KEY (IDPAGO)
      REFERENCES orden_pago (IDPAGO)
);

/*==============================================================*/
/* Table: TICKET                                                */
/*==============================================================*/
CREATE TABLE ticket
(
   IDTICKET             INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   ASUNTO               VARCHAR(32)                     NULL,
   MENSAJE              VARCHAR(128)                    NULL,
   ESTADO               VARCHAR(16)                     NULL,
   FECHACREACION        TIMESTAMP                       NULL,
   PRIMARY KEY (IDTICKET),
   CONSTRAINT FK_TICKET_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES usuario (IDUSUARIO)
);
