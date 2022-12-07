﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class SysUsuario
    {
        public int ClaUsuario { get; set; }
        public string ClaLogin { get; set; }
        public string NomUsuario { get; set; }
        public string Descripcion { get; set; }
        public string PwdUsuario { get; set; }
        public string CuentaMail { get; set; }
        public int? LlevaBit { get; set; }
        public string Status { get; set; }
        public int? Nref1 { get; set; }
        public int? Nref2 { get; set; }
        public int? Nref3 { get; set; }
        public int? DiasExpira { get; set; }
        public DateTime? FechaModPwd { get; set; }
        public DateTime? FechaAcceso { get; set; }
        public byte? EsNueva { get; set; }
        public bool? TipoPwd { get; set; }
        public string PwdUsuarioWeb { get; set; }
        public byte SupervisorSino { get; set; }
        public int AplicaPerded { get; set; }
        public string UsuarioActiveDirectory { get; set; }
        public string DominioActiveDirectory { get; set; }
        public string UoActiveDirectory { get; set; }
        public string IdiomaIu { get; set; }
        public int ClaTema { get; set; }
        public int ClaTemaKiosko { get; set; }
        public int ClaTemaRep { get; set; }
        public int? ClaUltimaEmpresa { get; set; }
    }
}