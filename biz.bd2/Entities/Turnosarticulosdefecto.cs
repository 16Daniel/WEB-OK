﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Turnosarticulosdefecto
    {
        public int Codturno { get; set; }
        public int Codarticulo { get; set; }
        public double Uds { get; set; }

        public virtual Articulo1 CodarticuloNavigation { get; set; }
        public virtual Turno CodturnoNavigation { get; set; }
    }
}