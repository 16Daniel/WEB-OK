﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Marca
    {
        public Marca()
        {
            Lineas = new HashSet<Linea>();
        }

        public int Codmarca { get; set; }
        public string Descripcion { get; set; }
        public byte[] Version { get; set; }
        public byte[] Imagen { get; set; }

        public virtual ICollection<Linea> Lineas { get; set; }
    }
}