﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhListadoAvisosTrab
    {
        public int ClaNoticia { get; set; }
        public int ClaEmpresa { get; set; }
        public int ClaTrab { get; set; }
        public int Prioridad { get; set; }
        public string Aviso { get; set; }
        public int? BajaLogica { get; set; }
        public DateTime? FechaVencimiento { get; set; }
    }
}