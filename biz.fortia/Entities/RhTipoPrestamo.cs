﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhTipoPrestamo
    {
        public RhTipoPrestamo()
        {
            RhSolPrestamos = new HashSet<RhSolPrestamo>();
        }

        public int TipoPrestamo { get; set; }
        public int Clase { get; set; }
        public string NomPrestamo { get; set; }
        public string Sp { get; set; }
        public int VisibleKiosco { get; set; }
        public int? ClaPerded { get; set; }
        public double? Interes { get; set; }
        public int? AplicSaldo { get; set; }
        public int? TipoInteres { get; set; }
        public int? TipoCobro { get; set; }
        public int? TipoTasaInteres { get; set; }
        public int? ClaPerdedInteres { get; set; }
        public int? ClaPerdedPrestamo { get; set; }
        public int? ClaPerdedIva { get; set; }
        public int? FolEncKitDoctos { get; set; }
        public string NomArchivo { get; set; }
        public int? FormatoContrato { get; set; }
        public int? Reestructurar { get; set; }
        public double? PorcentReestruct { get; set; }
        public int ClaEmpresa { get; set; }

        public virtual ICollection<RhSolPrestamo> RhSolPrestamos { get; set; }
    }
}