﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd2.Entities
{
    public partial class IeInforme
    {
        public IeInforme()
        {
            BiPermisosUsuarios = new HashSet<BiPermisosUsuario>();
            IeControlesInformes = new HashSet<IeControlesInforme>();
            IeUsuariosInformes = new HashSet<IeUsuariosInforme>();
        }

        public int IdInforme { get; set; }
        public string Titulo { get; set; }
        public int IdGrupo { get; set; }

        public virtual IeGrupo IdGrupoNavigation { get; set; }
        public virtual ICollection<BiPermisosUsuario> BiPermisosUsuarios { get; set; }
        public virtual ICollection<IeControlesInforme> IeControlesInformes { get; set; }
        public virtual ICollection<IeUsuariosInforme> IeUsuariosInformes { get; set; }
    }
}