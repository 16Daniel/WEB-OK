﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Subfamilia
    {
        public int Numdpto { get; set; }
        public int Numseccion { get; set; }
        public int Numfamilia { get; set; }
        public int Numsubfamilia { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }

        public virtual Familia Num { get; set; }
    }
}