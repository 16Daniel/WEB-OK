﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Configactualizacion
    {
        public int Idfront { get; set; }
        public int Idprograma { get; set; }
        public string Serverftp { get; set; }
        public string Directorioftp { get; set; }
        public int? Puertoftp { get; set; }
        public string Usuarioftp { get; set; }
        public string Passwordftp { get; set; }
        public string Terminalftp { get; set; }
        public string Directorio { get; set; }
        public int? Estadoftp { get; set; }
        public string Errordescargaftp { get; set; }
        public int? Versionexe { get; set; }

        public virtual RemFront IdfrontNavigation { get; set; }
    }
}