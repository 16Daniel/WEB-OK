﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Sucursalespermiso
    {
        public int Idsucursal { get; set; }
        public int Idpermiso { get; set; }
        public string Seleccionado { get; set; }
        public int? Tipo { get; set; }

        public virtual Sucursale IdsucursalNavigation { get; set; }
    }
}