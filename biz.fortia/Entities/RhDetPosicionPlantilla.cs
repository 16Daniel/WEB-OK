﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhDetPosicionPlantilla
    {
        public RhDetPosicionPlantilla()
        {
            RhInterinatos = new HashSet<RhInterinato>();
        }

        public int IdDetPosicion { get; set; }
        public int IdPosicion { get; set; }
        public string NumPlaza { get; set; }
        public int? ClaEmpresa { get; set; }
        public int? ClaUbicacion { get; set; }
        public int? ClaUbicacionPago { get; set; }
        public int? ClaArea { get; set; }
        public int? ClaDepto { get; set; }
        public int? ClaCentroCosto { get; set; }
        public int? ClaPuesto { get; set; }
        public int? ClaClasificacion { get; set; }
        public byte TipoTrab { get; set; }
        public byte TipoCosto { get; set; }
        public int? ClaTabSue { get; set; }
        public int? Nivel { get; set; }
        public double? SueldoDiario { get; set; }
        public double? SueldoMensual { get; set; }
        public int? ClaPeriodo { get; set; }
        public int? ClaTurno { get; set; }
        public int? ClaTabPre { get; set; }
        public byte? Status { get; set; }
        public byte TipoPlaza { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int? ClaRazonSocial { get; set; }
        public int? ClaRegImss { get; set; }
        public int? ClaTrab { get; set; }
        public int? PlazaDependFuncional { get; set; }
        public int? PlazaDependJerarquia { get; set; }
        public int? Origen { get; set; }
        public int? ClaRiesgo { get; set; }
        public int? AplicaPresupuesto { get; set; }
        public int? IdDetPosicionAnt { get; set; }
        public int? ClaEmpresaPropietario { get; set; }
        public int? ClaTrabPropietario { get; set; }
        public int? ClaUsuarioUltCambio { get; set; }
        public string Prefijo { get; set; }
        public string Alfanum1 { get; set; }
        public string Alfanum2 { get; set; }
        public string Alfanum3 { get; set; }
        public int? TipoJornada { get; set; }
        public double? HorasJornada { get; set; }

        public virtual ICollection<RhInterinato> RhInterinatos { get; set; }
    }
}