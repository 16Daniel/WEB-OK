﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhDetDietum
    {
        public int ClaEmpresa { get; set; }
        public int FolDieta { get; set; }
        public int Dia { get; set; }
        public int Semana { get; set; }
        public int Horario { get; set; }
        public int FolAuto { get; set; }
        public string Alimento { get; set; }
        public int? Calorias { get; set; }
        public string Porcion { get; set; }
        public DateTime? FechaUltCambio { get; set; }
    }
}