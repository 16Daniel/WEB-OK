﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Hotelestarifascargo
    {
        public int Idhotel { get; set; }
        public int Idtarifav { get; set; }
        public int Posicion { get; set; }
        public byte[] Version { get; set; }

        public virtual Hotele IdhotelNavigation { get; set; }
        public virtual Tarifasventum IdtarifavNavigation { get; set; }
    }
}