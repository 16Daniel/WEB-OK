﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhClasificacion
    {
        public int ClaClasificacion { get; set; }
        public int ClaEmpresa { get; set; }
        public string NomClasificacion { get; set; }
        public int? TipoImss { get; set; }
        public DateTime? FechaUltCambio { get; set; }
        public string NomClasificacionIng { get; set; }
        public int? IdCorpDato { get; set; }
        public int? IdCorporativo { get; set; }
        public string Alfanum1 { get; set; }
        public string Alfanum2 { get; set; }
        public string Alfanum3 { get; set; }
        public int? ClaUniNeg { get; set; }

        public virtual RhUniNeg Cla { get; set; }
    }
}