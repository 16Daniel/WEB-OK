﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class TFotosPedidosEntrega
    {
        public int Id { get; set; }
        public int IdPedido { get; set; }
        public string Foto { get; set; }
        public string Tipo { get; set; }

        public virtual TPedidosEntrega IdPedidoNavigation { get; set; }
    }
}