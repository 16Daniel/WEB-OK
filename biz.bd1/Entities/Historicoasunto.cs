﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.bd1.Entities
{
    public partial class Historicoasunto
    {
        public int Id { get; set; }
        public string Serie { get; set; }
        public int Numero { get; set; }
        public int? Idhotel { get; set; }
        public string Seriereserva { get; set; }
        public int? Idreserva { get; set; }
        public int? Habitacion { get; set; }
        public DateTime Fecha { get; set; }
        public int Empleado { get; set; }
        public int Tipo { get; set; }
        public string Observaciones { get; set; }

        public virtual Asunto Asunto { get; set; }
    }
}