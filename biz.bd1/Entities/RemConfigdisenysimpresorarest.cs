﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class RemConfigdisenysimpresorarest
    {
        public int Idfront { get; set; }
        public string Terminal { get; set; }
        public int Tipo { get; set; }
        public string Impresora { get; set; }

        public virtual RemFront IdfrontNavigation { get; set; }
    }
}