﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhTexto
    {
        public int TipoDocto { get; set; }
        public string ClaDocto { get; set; }
        public int ClaEmpresa { get; set; }
        public string NomDocto { get; set; }
        public string Docto { get; set; }
        public string ClaPadre { get; set; }
        public DateTime FechaCrea { get; set; }
        public int NivelSeg { get; set; }
        public DateTime? FechaCamb { get; set; }
        public DateTime? FechaAnt { get; set; }
        public string ObservCamb { get; set; }
        public int? TrabCamb { get; set; }
        public int? EmpCamb { get; set; }
        public int? Nivel { get; set; }
        public string Texto { get; set; }
        public string TextoAnt { get; set; }
        public DateTime? FechaUltCambio { get; set; }
    }
}