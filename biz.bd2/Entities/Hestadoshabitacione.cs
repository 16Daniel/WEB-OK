﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Hestadoshabitacione
    {
        public Hestadoshabitacione()
        {
            Hcuposestadosdefectos = new HashSet<Hcuposestadosdefecto>();
            Hestadosdefectos = new HashSet<Hestadosdefecto>();
        }

        public string Id { get; set; }
        public string Descripcion { get; set; }
        public int? Colorfondo { get; set; }
        public int? Colortexto { get; set; }
        public bool? Checkin { get; set; }
        public bool? Decamarera { get; set; }
        public byte[] Version { get; set; }

        public virtual ICollection<Hcuposestadosdefecto> Hcuposestadosdefectos { get; set; }
        public virtual ICollection<Hestadosdefecto> Hestadosdefectos { get; set; }
    }
}