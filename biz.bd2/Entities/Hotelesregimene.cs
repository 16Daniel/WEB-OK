﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Hotelesregimene
    {
        public int Idhotel { get; set; }
        public int Codarticulo { get; set; }
        public int Posicion { get; set; }
        public byte[] Version { get; set; }

        public virtual Articulosregimene CodarticuloNavigation { get; set; }
        public virtual Hotele IdhotelNavigation { get; set; }
    }
}