﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Pedventapromocione
    {
        public string Numserie { get; set; }
        public int Numpedido { get; set; }
        public string N { get; set; }
        public int Idpromocion { get; set; }
        public double? Importe { get; set; }
        public double? Importeiva { get; set; }

        public virtual Pedventacab NNavigation { get; set; }
    }
}