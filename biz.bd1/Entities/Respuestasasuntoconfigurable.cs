﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Respuestasasuntoconfigurable
    {
        public string Serie { get; set; }
        public int Idnumero { get; set; }
        public int Codrespuesta { get; set; }
        public string Texto { get; set; }
        public double? Numero { get; set; }
        public string Boolea { get; set; }
        public DateTime? Fecha { get; set; }

        public virtual Asunto Asunto { get; set; }
    }
}