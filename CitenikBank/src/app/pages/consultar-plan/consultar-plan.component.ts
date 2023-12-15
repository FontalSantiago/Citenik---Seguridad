//SISTEMA
import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

//COMPONENTES
import { PlanClass } from 'src/app/core/models/plan'; 

//SERVICIOS
import { PlanService } from 'src/app/core/services/plan.service'; 

registerLocaleData(localeEsAr, 'es-Ar');
@Component({
  selector: 'app-consultar-plan',
  templateUrl: './consultar-plan.component.html',
  styleUrls: ['./consultar-plan.component.css'],
})
export class ConsultarPlanComponent implements OnInit {
  //VARIABLES DE OBJETOS LIST
  Planes: PlanClass[] = [];
  PlanesFiltrados: PlanClass[] = [];

  //VARIABLES DE DATOS
  propiedadOrdenamiento: string = 'id';
  opcionFiltrado: string='';
  @Output() planSeleccionado: any;
  vigenciaHasta: any;
  mostrarBotonAceptar: boolean = false;
  tipoOrdenamiento = 1;

  //FORMS PARA LA AGRUPACIÓN DE DATOS
  formModificar: FormGroup;

  constructor(private fb: FormBuilder, private servicioPlan: PlanService) {
    this.formModificar = this.fb.group({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      CUIT: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{2}-[0-9]{8}-[0-9]{1}'),
      ]),
      fecha_nacimiento: new FormControl(null, Validators.required),
    });
  }

  get nombre() {
    return this.formModificar.get('nombre');
  }

  get apellido() {
    return this.formModificar.get('apellido');
  }

  get CUIT() {
    return this.formModificar.get('CUIT');
  }

  get fecha_nacimiento() {
    return this.formModificar.get('fecha_nacimiento');
  }

  ngOnInit(): void {
    this.obtenerPlanes();
  }

  //Consulta los planes que se encuentran registrados y los guarda en una lista de Planes.
  obtenerPlanes() {
    this.servicioPlan.listarPlanes().subscribe((data) => {
      this.Planes = data;
      this.PlanesFiltrados = this.Planes;
    });
  }

  //Filtra los planes por Nombre, Edad Máxima, TNA, Montos Mínimos y Máximos, y Cuotas Mínimas y Máximas.
  esFiltrar(event: Event) {
    let txtBuscar = (event.target as HTMLInputElement).value;
    let filtro = txtBuscar
      .replace(/[^\w\s]/g, '')
      .trim()
      .toLowerCase();

    this.PlanesFiltrados = [];

    this.Planes.forEach((plan) => {
      let tnaPorcentual = plan.tna.toString() + "%"
      if (
        plan.nombre.trim().toLowerCase().includes(filtro) ||
        plan.edadMax?.toString().includes(filtro) || 
        tnaPorcentual.includes(filtro) || 
        plan.montoMin.toString().includes(filtro) ||  
        plan.montoMax.toString().includes(filtro) ||
        plan.cuotasMax.toString().includes(filtro) ||
        plan.cuotasMin.toString().includes(filtro)
      ) {
        this.PlanesFiltrados.push(plan);
    }});
  }

  //Filtra los planes en base a la fecha de busqueda pasada por parámetro.
  esFiltrarVigencia(event: Event) {
    let fechaBusqueda = (event.target as HTMLInputElement).value;
    console.log(fechaBusqueda)
    this.PlanesFiltrados = [];
    this.Planes.forEach((plan) => {
      if (
        moment(plan.vigenciaDesde).format('YYYY-MM-DD') <= fechaBusqueda &&
        fechaBusqueda <= moment(plan.vigenciaHasta).format('YYYY-MM-DD')
      )
      {
        this.PlanesFiltrados.push(plan);
      }
      if (fechaBusqueda=='')
      {
        this.PlanesFiltrados = this.Planes;
      }
    });
  }

  //Valida que exista algún plan que responda a algún filtro especificado.
  validarFiltrado(): Boolean {
    if (this.PlanesFiltrados.length == 0) return false;
    return true;
  }

  //Almacena los datos del plan que fue seleccionado en la tabla de planes filtrados dentro de variables locales.
  esfilaSeleccionada(plan: PlanClass) {
    this.planSeleccionado = plan
  }

  //Metodos para grilla
  //Almacena en una variable la propiedad por la cual se quiere ordenar la consulta de clientes.
  ordenarPor(propiedad: string) {
    this.tipoOrdenamiento =
      propiedad === this.propiedadOrdenamiento ? this.tipoOrdenamiento * -1 : 1;
    this.propiedadOrdenamiento = propiedad;
  }

  //En base a la propiedad por la que se quiera ordenar y el tipo de orden muestra un icono.
  ordenarIcono(propiedad: string) {
    if (propiedad === this.propiedadOrdenamiento) {
      return this.tipoOrdenamiento === 1 ? '🠉' : '🠋';
    }
    return '🠋🠉';
  }
}