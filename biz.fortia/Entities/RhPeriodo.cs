﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace biz.fortia.Entities
{
    public partial class RhPeriodo
    {
        public int ClaPeriodo { get; set; }
        public int ClaEmpresa { get; set; }
        public int? ClaDesglose { get; set; }
        public string NomPeriodo { get; set; }
        public double? DiasPer { get; set; }
        public int? EsSeptimo { get; set; }
        public int? FolioNom { get; set; }
        public int? TablaPer { get; set; }
        public int? TablaMen { get; set; }
        public int? TablaAnu { get; set; }
        public double? DiasLab { get; set; }
        public double? SepDia { get; set; }
        public int? TipoMinPago { get; set; }
        public double? CantMinPago { get; set; }
        public double? HesApartirDe { get; set; }
        public double? HedApartirDe { get; set; }
        public double? HetApartirDe { get; set; }
        public double? HesNumsueXhr { get; set; }
        public double? HedNumsueXhr { get; set; }
        public double? HetNumsueXhr { get; set; }
        public int? HesClaPerded { get; set; }
        public int? HedClaPerded { get; set; }
        public int? HetClaPerded { get; set; }
        public string FormatoRecibo { get; set; }
        public string FormatoFiniquito { get; set; }
        public int? AplicaTodaPoliza { get; set; }
        public int? AplicaSepVac { get; set; }
        public int? SePagaProp { get; set; }
        public int? CasoNor { get; set; }
        public int? CasoVac { get; set; }
        public int? CasoPtu { get; set; }
        public int? CasoAgui { get; set; }
        public int? CasoFin { get; set; }
        public int? TablaPer91 { get; set; }
        public int? TablaMen91 { get; set; }
        public int? TablaAnu91 { get; set; }
        public int? PropSubsidio91 { get; set; }
        public int? VacClaPerded { get; set; }
        public int? PriClaPerded { get; set; }
        public int? SepClaPerded { get; set; }
        public DateTime? FechaUltCambio { get; set; }
        public int? ClaPropSubsidio { get; set; }
        public byte? CasoImss { get; set; }
        public byte? IcasoAquien { get; set; }
        public byte? IcasoVac { get; set; }
        public byte? IcasoFal { get; set; }
        public byte? IcasoDialab { get; set; }
        public byte? IcasoText { get; set; }
        public byte? IcasoPrestamo { get; set; }
        public byte? IcasoDestajo { get; set; }
        public int? VaclabClaPerded { get; set; }
        public double? DiasAnio { get; set; }
        public double? DiasMes { get; set; }
        public byte? TipoProp { get; set; }
        public byte? TipoPagoPrima { get; set; }
        public string LeyendaPer { get; set; }
        public byte? DiasPrevFaltas { get; set; }
        public byte? DiasPrevVac { get; set; }
        public byte? DiasPrevHrsext { get; set; }
        public byte? DiasPrevPresta { get; set; }
        public byte? DiasPrevMovnom { get; set; }
        public byte? DiasPrevDestaj { get; set; }
        public byte? DiasPrevFestiv { get; set; }
        public double? HorasDia { get; set; }
        public double? DiasSemana { get; set; }
        public int? TipoCalcIspt { get; set; }
        public int? AplicaIspt91 { get; set; }
        public int? AjusteMensual { get; set; }
        public int? AjusteUltNom { get; set; }
        public int? AjusteAnual { get; set; }
        public byte? ImpMarginalSubsi { get; set; }
        public byte? InicioSemana { get; set; }
        public byte? CasFinMes { get; set; }
        public string EncPeriodo { get; set; }
        public byte? DescontarVac { get; set; }
        public byte? IncluyeFiq { get; set; }
        public int? TipoCalcDiaslab { get; set; }
        public int? TipoCalcPropdias { get; set; }
        public byte? DescFaltas { get; set; }
        public byte? DescIncapacidades { get; set; }
        public byte? DescFSinsueldo { get; set; }
        public byte? RespetarPagomin { get; set; }
        public byte? AjusteMenNetos { get; set; }
        public byte? AjusteAnualEsp { get; set; }
        public byte? NoAplicaArt116b { get; set; }
        public double? ImpExclusion { get; set; }
        public byte? CalcIsrAjusteanu { get; set; }
        public byte? CalcIsr142risr { get; set; }
        public byte? DiasPrevPvac { get; set; }
        public byte? TipoSueIndem { get; set; }
        public byte? VacAntFiq { get; set; }
        public byte? TipoDiasPer { get; set; }
        public byte? Fechacalcfiq { get; set; }
        public byte? DiasPrevIncap { get; set; }
        public int? IcasoSueldos { get; set; }
        public byte? TipoCompTopeImss { get; set; }
        public byte? IncluirBgravDifsue { get; set; }
        public byte? ProcIsrPrev { get; set; }
        public byte? DescVacaciones { get; set; }
        public byte? BandCalcAquienpagar { get; set; }
        public byte? AplicaFalDesc { get; set; }
        public byte? AplicaVacDesc { get; set; }
        public byte? AplicaIncapDesc { get; set; }
        public byte PagoSextoDia { get; set; }
        public byte? IcasoSubinc { get; set; }
        public byte? AplicaPropVac { get; set; }
        public byte? TipoDiasPerNom { get; set; }
        public byte? TipoPeriodo { get; set; }
        public byte? DescVacProp { get; set; }
        public int? Tiposueldohr { get; set; }
        public int? ClaRazonSocial { get; set; }
        public int? ClaFormatoRecibo { get; set; }
        public byte? CasoSuemenIsr142 { get; set; }
        public int? GeneraPrimadom { get; set; }
        public int? Tipofactregresion { get; set; }
        public byte? AplicaSubempArt142 { get; set; }
        public byte? TopeFactorArt142 { get; set; }
        public double? VecesFactorArt142 { get; set; }
        public int? AplicaSubempIndem { get; set; }
        public int? AplicaTotperCompIndem { get; set; }
        public int? AplicaTotperCalcIndem { get; set; }
        public int? ModificarDiasSueldo { get; set; }
        public double? DiasSueldo { get; set; }
        public byte? CalsepDesfalProp { get; set; }
        public byte? AplicaPropFinjus { get; set; }
        public byte? AplicaPropIncap { get; set; }
        public byte? AplicaPropFjustss { get; set; }
        public byte? Ubicar29febFebMar { get; set; }
        public int? ClaPerdedIndem { get; set; }
        public int? ClaPerdedAntig { get; set; }
        public int? ClaPerdedPantig { get; set; }
        public int? ClaPerdedAgui { get; set; }
        public int? ClaPerdedVac { get; set; }
        public int? ClaPerdedPrima { get; set; }
        public int? ClaPerdedFatrab { get; set; }
        public int? ClaPerdedFaemp { get; set; }
        public int? ClaPerdedFarend { get; set; }
        public int? CasoEsp { get; set; }
        public byte? IcasoAquienFiq { get; set; }
        public byte? TopeInggrav117 { get; set; }
        public byte? TipoCalcSdiLft { get; set; }
        public int? NominasNormalesCalcSdiLft { get; set; }
        public byte? TipoDiasCalcMesSdiLft { get; set; }
        public int? DiasCalcMesSdiLft { get; set; }
        public byte? IncFiniqAjustes { get; set; }
        public int? CalcTeNomEsp { get; set; }
        public int? PeriodicidadPagoSat { get; set; }
        public int? ClaPoliticaPago { get; set; }
        public string Alfanum1 { get; set; }
        public string Alfanum2 { get; set; }
        public string Alfanum3 { get; set; }
        public Guid? InternalIdReport { get; set; }
        public byte? AplicaFechamovTe { get; set; }
        public bool? CfdiIndemSepara { get; set; }
        public int? CfdiIndemSeparaTipoContrato { get; set; }
        public int? DiasteMov { get; set; }
        public int? ClaUniNeg { get; set; }

        public virtual RhUniNeg Cla { get; set; }
    }
}