﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class BitPrestamo
    {
        public int ClaUsuario { get; set; }
        public int ClaSistema { get; set; }
        public DateTime FechaOper { get; set; }
        public int FolBitacora { get; set; }
        public int ClaTrab { get; set; }
        public DateTime FechaPre { get; set; }
        public short Clase { get; set; }
        public int ClaEmpresa { get; set; }
        public int FolAuto { get; set; }
        public int? ClaPerded { get; set; }
        public double? Importe { get; set; }
        public int? Plazo { get; set; }
        public double? Interes { get; set; }
        public double? Cuota { get; set; }
        public string Status { get; set; }
        public double? Saldo { get; set; }
        public int? AplicSaldo { get; set; }
        public int? TipoInteres { get; set; }
        public int? TipoCobro { get; set; }
        public int? TipoTasaInteres { get; set; }
        public int? TipoAbono { get; set; }
        public DateTime? FechaLiquidacion { get; set; }
        public int? ClaPerdedInteres { get; set; }
        public byte? SaldarFechaLiq { get; set; }
        public int? TipoTasa { get; set; }
        public byte? TipoOper { get; set; }
        public string Localizacion { get; set; }
    }
}