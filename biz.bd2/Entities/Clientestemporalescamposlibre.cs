﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Clientestemporalescamposlibre
    {
        public int Codcliente { get; set; }
        public string Serie { get; set; }

        public virtual Clientestemporale CodclienteNavigation { get; set; }
    }
}