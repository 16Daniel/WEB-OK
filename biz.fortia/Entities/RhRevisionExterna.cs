﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhRevisionExterna
    {
        public RhRevisionExterna()
        {
            RhDetRevisionExternas = new HashSet<RhDetRevisionExterna>();
        }

        public int FolRevisionExterna { get; set; }
        public int ClaEmpresa { get; set; }
        public int ClaUbicacion { get; set; }
        public DateTime? FechaRevision { get; set; }
        public string TipoRevision { get; set; }
        public string Referencia { get; set; }
        public string Inspector { get; set; }
        public int? ClaTrabAtendio { get; set; }
        public string Comentarios { get; set; }
        public DateTime FechaUltCambio { get; set; }

        public virtual ICollection<RhDetRevisionExterna> RhDetRevisionExternas { get; set; }
    }
}