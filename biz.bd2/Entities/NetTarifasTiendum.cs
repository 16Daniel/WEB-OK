﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class NetTarifasTiendum
    {
        public int IdTienda { get; set; }
        public int IdTarifa { get; set; }

        public virtual Tarifasventum IdTarifaNavigation { get; set; }
        public virtual NetTiendum IdTiendaNavigation { get; set; }
    }
}