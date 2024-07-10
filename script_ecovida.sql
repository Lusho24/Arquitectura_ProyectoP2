/*==============================================================*/
/* Table: CARRITO                                               */
/*==============================================================*/
CREATE TABLE CARRITO 
(
   IDCARRITO            INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   FECHACREACIONCARRITO TIMESTAMP                       NULL,
   TOTALCARRITO         DECIMAL(10,2)                   NULL,
   PRIMARY KEY (IDCARRITO),
   CONSTRAINT FK_CARRITO_USUARIO_C_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES USUARIO (IDUSUARIO)
);

/*==============================================================*/
/* Table: CATEGORIA_PRODUCTO                                    */
/*==============================================================*/
CREATE TABLE CATEGORIA_PRODUCTO 
(
   IDCATEGORIA          INT                             NOT NULL,
   NOMBRECATEGORIA      VARCHAR(32)                     NULL,
   PRIMARY KEY (IDCATEGORIA)
);

/*==============================================================*/
/* Table: DETALLE_CARRITO                                       */
/*==============================================================*/
CREATE TABLE DETALLE_CARRITO 
(
   IDDETALLE            INT                             NOT NULL,
   IDPRODUCTO           INT                             NOT NULL,
   IDCARRITO            INT                             NOT NULL,
   CANTIDADPRODUCTOCARRITO INT                          NULL,
   PRIMARY KEY (IDDETALLE),
   CONSTRAINT FK_DETALLE_CARRITO_CARRITO FOREIGN KEY (IDCARRITO)
      REFERENCES CARRITO (IDCARRITO),
   CONSTRAINT FK_DETALLE_PRODUCTO_PRODUCTO FOREIGN KEY (IDPRODUCTO)
      REFERENCES PRODUCTO (IDPRODUCTO)
);

/*==============================================================*/
/* Table: ENVIO                                                 */
/*==============================================================*/
CREATE TABLE ENVIO 
(
   IDENVIO              INT                             NOT NULL,
   NOMBREENVIO          VARCHAR(32)                     NULL,
   PRECIOENVIO          DECIMAL(10,2)                   NULL,
   PRIMARY KEY (IDENVIO)
);

/*==============================================================*/
/* Table: NOTIFICACION                                          */
/*==============================================================*/
CREATE TABLE NOTIFICACION 
(
   IDNOTIFICACION       INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   MENSAJENOTIFICACION  VARCHAR(64)                     NULL,
   FECHAENVIONOTIFICACION TIMESTAMP                     NULL,
   PRIMARY KEY (IDNOTIFICACION),
   CONSTRAINT FK_NOTIFICACION_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES USUARIO (IDUSUARIO)
);

/*==============================================================*/
/* Table: ORDEN_PAGO                                            */
/*==============================================================*/
CREATE TABLE ORDEN_PAGO 
(
   IDPAGO               INT                             NOT NULL,
   IDCARRITO            INT                             NOT NULL,
   IDENVIO              INT                             NOT NULL,
   METODOPAGO           VARCHAR(16)                     NULL,
   ESTADOPAGO           VARCHAR(16)                     NULL,
   TOTALPAGO            DECIMAL(10,2)                   NULL,
   PRIMARY KEY (IDPAGO),
   CONSTRAINT FK_ORDEN_PAGO_ENVIO FOREIGN KEY (IDENVIO)
      REFERENCES ENVIO (IDENVIO),
   CONSTRAINT FK_ORDEN_PAGO_CARRITO FOREIGN KEY (IDCARRITO)
      REFERENCES CARRITO (IDCARRITO)
);

/*==============================================================*/
/* Table: ORDEN_PEDIDO                                          */
/*==============================================================*/
CREATE TABLE ORDEN_PEDIDO 
(
   IDORDPEDIDO          INT                             NOT NULL,
   IDPAGO               INT                             NOT NULL,
   FECHAORDPEDIDO       TIMESTAMP                       NULL,
   ESTADOORDPEDIDO      VARCHAR(8)                      NULL,
   PRIMARY KEY (IDORDPEDIDO),
   CONSTRAINT FK_ORDEN_PEDIDO_PAGO FOREIGN KEY (IDPAGO)
      REFERENCES ORDEN_PAGO (IDPAGO)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
CREATE TABLE PRODUCTO 
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
      REFERENCES CATEGORIA_PRODUCTO (IDCATEGORIA)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
CREATE TABLE ROL 
(
   IDROL                INT                             NOT NULL,
   NOMBREROL            VARCHAR(16)                     NULL,
   PRIMARY KEY (IDROL)
);

/*==============================================================*/
/* Table: TICKET                                                */
/*==============================================================*/
CREATE TABLE TICKET 
(
   IDTICKET             INT                             NOT NULL,
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   ASUNTO               VARCHAR(32)                     NULL,
   MENSAJE              VARCHAR(128)                    NULL,
   ESTADO               VARCHAR(16)                     NULL,
   FECHACREACION        TIMESTAMP                       NULL,
   PRIMARY KEY (IDTICKET),
   CONSTRAINT FK_TICKET_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES USUARIO (IDUSUARIO)
);

/*==============================================================*/
/* Table: TIENDA                                                */
/*==============================================================*/
CREATE TABLE TIENDA 
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
CREATE TABLE USUARIO 
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
      REFERENCES TIENDA (IDTIENDA)
);

/*==============================================================*/
/* Table: USUARIO_ROL                                           */
/*==============================================================*/
CREATE TABLE USUARIO_ROL 
(
   IDUSUARIO            VARCHAR(16)                     NOT NULL,
   IDROL                INT                             NOT NULL,
   PRIMARY KEY (IDUSUARIO, IDROL),
   CONSTRAINT FK_USUARIO_ROL_USUARIO FOREIGN KEY (IDUSUARIO)
      REFERENCES USUARIO (IDUSUARIO),
   CONSTRAINT FK_USUARIO_ROL_ROL FOREIGN KEY (IDROL)
      REFERENCES ROL (IDROL)
);
