﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class Situacionesmacro
    {
        public int Codmacro { get; set; }
        public int Codsituacion { get; set; }

        public virtual Situacione CodsituacionNavigation { get; set; }
    }
}