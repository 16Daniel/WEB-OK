﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhOrdenLimpiezaGuiaDet
    {
        public RhOrdenLimpiezaGuiaDet()
        {
            RhVerificaGuiaOrdenLimDets = new HashSet<RhVerificaGuiaOrdenLimDet>();
        }

        public int FolGuiaDet { get; set; }
        public int FolGuia { get; set; }
        public int FolSeccion { get; set; }
        public int ClaAspecto { get; set; }
        public int ClaSubAspecto { get; set; }
        public DateTime FechaUltCambio { get; set; }

        public virtual RhOrdenLimpiezaGuium FolGuiaNavigation { get; set; }
        public virtual RhOrdenLimpiezaSeccion FolSeccionNavigation { get; set; }
        public virtual ICollection<RhVerificaGuiaOrdenLimDet> RhVerificaGuiaOrdenLimDets { get; set; }
    }
}