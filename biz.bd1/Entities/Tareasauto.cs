﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Tareasauto
    {
        public Tareasauto()
        {
            TareasautoLogs = new HashSet<TareasautoLog>();
        }

        public int Idtarea { get; set; }
        public int Accion { get; set; }
        public int? Tipofront { get; set; }
        public int? Z { get; set; }
        public string Caja { get; set; }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
        public bool? Bloqueado { get; set; }
        public DateTime? Fechabloqueado { get; set; }

        public virtual ICollection<TareasautoLog> TareasautoLogs { get; set; }
    }
}