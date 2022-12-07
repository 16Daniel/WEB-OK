﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhCurso
    {
        public RhCurso()
        {
            RhGpoCursosProgs = new HashSet<RhGpoCursosProg>();
        }

        public int ClaCurso { get; set; }
        public string NomCurso { get; set; }
        public double? HorasPlan { get; set; }
        public string Objetivo { get; set; }
        public string TipoCurso { get; set; }
        public int? MaxAsist { get; set; }
        public int? MinAsist { get; set; }
        public DateTime UltRevision { get; set; }
        public DateTime? FechaUltCambio { get; set; }
        public string DescCurso { get; set; }
        public int? ClaTipoEscala { get; set; }
        public string NombreCorto { get; set; }
        public int? Clasificacion { get; set; }
        public string NomCursoIng { get; set; }
        public string TipoCalificacion { get; set; }
        public byte[] Documento { get; set; }
        public int? ClaEvaCurso { get; set; }
        public int? CalificacionMinAprobatoria { get; set; }
        public int? TipoAplica { get; set; }
        public int? ClaNivelComportamiento { get; set; }
        public double HorasDia { get; set; }
        public double? Creditos { get; set; }
        public int? Obligatorio { get; set; }
        public int? Dc3Automatico { get; set; }
        public int? Nacional { get; set; }
        public double? PctMinAsist { get; set; }
        public int? VisibleKiosco { get; set; }
        public int AreaTematicaStps { get; set; }
        public int? ModalidadDc4 { get; set; }
        public int? ObjetivoDc4 { get; set; }
        public string TemasPrincipales { get; set; }
        public int? ClaPlazo { get; set; }
        public int? ClaCursoStps { get; set; }

        public virtual ICollection<RhGpoCursosProg> RhGpoCursosProgs { get; set; }
    }
}