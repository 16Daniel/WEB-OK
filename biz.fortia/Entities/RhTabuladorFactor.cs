﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhTabuladorFactor
    {
        public int ClaEmpresa { get; set; }
        public int ClaTabulador { get; set; }
        public int ClaFactor { get; set; }

        public virtual RhFactorValPuesto Cla { get; set; }
        public virtual RhTabulador ClaNavigation { get; set; }
    }
}