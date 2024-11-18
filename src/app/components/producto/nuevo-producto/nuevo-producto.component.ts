import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from '../../../services/producto.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent implements OnInit {

  formProducto!: FormGroup
  title!: string
  isEditing: boolean = false
  btnText: string = 'Nuevo'
  // forma nueva de injectar dependencias
  private route = inject(ActivatedRoute)


  constructor(
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder,
  ) {
    this.formProducto = this.fb.group({
      productonombre: [''],
      productodescripcion: [''],
      productoprecio: [''],
      productocategoria: [''],
      productostock: ['']
    })
  }

  ngOnInit(): void {
    if (this.productoId) {
      this.title = "Edicion Incidencia"
      this.isEditing = true
      this.btnText = 'Update'

      this.productoService.getProducto(this.productoId).subscribe(
        response => {
          //const data: any = response.producto
          console.log(response)
          this.formProducto.patchValue({
            ...response.producto
          })
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.title = "Nuevo Producto"
      this.isEditing = false
      console.log(this.isEditing)
    }
  }

  productoId = this.route.snapshot.paramMap.get("id")

  nuevoProducto(): void {
    //activar el servicio register
    this.productoService.createProducto(this.formProducto.value).subscribe(
      response => {
        console.log('ejecutado desde respuesta nueva producto')
        console.log(response)
        if (response.ok) {
          Swal.fire('Incidencia registrada!..', response.msg, 'success')
          //redirecciona a las productos
          this.router.navigate(['/producto'])
        } else {
          Swal.fire('error!, desde registro de producto.', response.error.msg, 'error')
        }
      },
      error => {
        console.log('Ejecutado desde el error registro producto')
        console.log(error)
        Swal.fire('!!upss error, registro producto', error.error.msg, 'error')
      }
    )
  }

  updateProductoById(data: any): void {
    this.productoService.updateProducto(data).subscribe(
      response => {
        console.log('actualizado')
        //redirecciona a las productos
        this.router.navigate(['/productos'])

      },
      error => {
        console.log(error)
      }
    )
  }

  save(): void {
    if (this.isEditing) {
      this.updateProductoById(this.formProducto.value)
    } else {
      this.nuevoProducto()
    }
  }

  cancelar(): void {
    //redirecciona a las productos
    this.router.navigate(['/productos'])
  }

}
