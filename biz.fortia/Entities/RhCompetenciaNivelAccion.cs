﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhCompetenciaNivelAccion
    {
        public int FolAccionNivel { get; set; }
        public int FolioCompetencia { get; set; }
        public int ClaNivel { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaUltCambio { get; set; }

        public virtual RhCompetenciaNivel RhCompetenciaNivel { get; set; }
    }
}