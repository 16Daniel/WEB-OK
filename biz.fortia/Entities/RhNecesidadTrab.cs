﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhNecesidadTrab
    {
        public int ClaEmpresa { get; set; }
        public int ClaNecesidad { get; set; }
        public int ClaTrab { get; set; }
        public int ClaHabilidad { get; set; }
        public DateTime? FechaNecesidad { get; set; }
        public DateTime? FechaUltCambio { get; set; }
        public int? Prioridad { get; set; }
        public int? FolioCompetencia { get; set; }
        public string ClaEscalaEval { get; set; }
        public int? MetodoCap { get; set; }
        public byte? ReqCap { get; set; }
    }
}