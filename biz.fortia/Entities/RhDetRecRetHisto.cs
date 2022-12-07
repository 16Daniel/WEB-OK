﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhDetRecRetHisto
    {
        public int ClaRetroactivo { get; set; }
        public int ClaTrab { get; set; }
        public int ClaEmpresa { get; set; }
        public int FolioNom { get; set; }
        public int ClaPerded { get; set; }
        public int FolAuto { get; set; }
        public int AnioMes { get; set; }
        public int NumNomina { get; set; }
        public int ClaPeriodo { get; set; }
        public int ClaCentroCosto { get; set; }
        public int ClaDepto { get; set; }
        public int ClaTurno { get; set; }
        public int ClaPuesto { get; set; }
        public double Importe { get; set; }
        public double Monto { get; set; }
        public double MontoTope { get; set; }
        public DateTime FechaTope { get; set; }
        public double Acum { get; set; }
        public int ClaUbicacionBase { get; set; }
        public double Valgen01 { get; set; }
        public double Valgen02 { get; set; }
        public double Valgen03 { get; set; }
        public DateTime FechaMov { get; set; }
        public DateTime FechaAplica { get; set; }
        public string TipoMovNomina { get; set; }
        public int ClaTabSue { get; set; }
        public int NivTabSue { get; set; }
        public string Referencia { get; set; }
        public double ResForSql { get; set; }
        public double ResTopeSql { get; set; }
        public double EvaForSql { get; set; }
        public double EvaTopeSql { get; set; }
        public double ImporteHisto { get; set; }
        public double ImporteRecalc { get; set; }
        public double ImporteActual { get; set; }
        public double Retroactivo { get; set; }
        public int ClaPerdedRetro { get; set; }
        public byte TipoCalcRetro { get; set; }
        public int ClaPerdedRetroNeg { get; set; }
        public byte TipoRegistro { get; set; }
    }
}