﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace biz.rebel_wings.Entities
{
    public partial class CatState
    {
        public CatState()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string State { get; set; } = null!;
        public bool Status { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}