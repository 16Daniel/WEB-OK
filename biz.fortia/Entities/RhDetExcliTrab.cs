﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhDetExcliTrab
    {
        public int ClaTrab { get; set; }
        public int ClaEmpresa { get; set; }
        public int ClaExamenCli { get; set; }
        public DateTime FechaExamen { get; set; }
        public int ClaPregunta { get; set; }
        public int TipoAplica { get; set; }
        public int? ClaRespuesta { get; set; }
        public double? ValorNum { get; set; }
        public string ValorTexto { get; set; }
        public DateTime? FechaUltCambio { get; set; }
        public string Observaciones { get; set; }
        public int ClaAgrupador { get; set; }
    }
}