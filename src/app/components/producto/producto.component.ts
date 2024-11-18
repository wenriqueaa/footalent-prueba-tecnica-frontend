import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  standalone: true, // Standalone debe estar habilitado
  imports: [CommonModule, FormsModule], // Asegúrate de importar CommonModule aquí
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  mostrarFormulario = false;
  nuevoProducto = {
    productonombre: ' ',
    productodescripcion: ' ',
    productoprecio: 1000,
    productocategoria: 'Otros',
    productostock: 1,
  };

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {

    this.productoService.getProductos().subscribe(

      response => {
        console.log(response.productos)
        this.productos = response.productos
        console.log(this.productos)
      },
      error => {
        console.log(error)
      }
    )
  }

  // Mostrar/ocultar el formulario
  toggleForm(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearProducto(): void {
    // Mostrar una alerta de carga mientras se realiza la operación
    Swal.fire({
      title: 'Guardando producto...',
      text: 'Por favor, espera.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.productoService.createProducto(this.nuevoProducto).subscribe(
      (data) => {
        // Éxito: producto guardado
        Swal.fire({
          icon: 'success',
          title: 'Producto guardado',
          text: `El producto "${data.productonombre}" ha sido creado correctamente.`,
          timer: 3000,
          showConfirmButton: false,
        });
        console.log('Producto creado:', data);
        this.productos.push(data); // Agregar el nuevo producto a la lista
        this.nuevoProducto = { 
            productonombre: ' ', 
            productodescripcion: ' ', 
            productoprecio: 1000, 
            productocategoria: 'Otros', 
            productostock: 1 };
        this.mostrarFormulario = false; // Ocultar el formulario
      },
      (error) => {
        // Error: mostrar mensaje del backend
        const mensajeError = error?.error?.message || 'No se pudo guardar el producto. Intenta de nuevo.';
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: mensajeError,
        });
        console.error('Error al crear producto:', error);
      }
    );
  }

eliminarProducto(id: string): void {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    this.productoService.deleteProducto(id).subscribe(
      () => {
        // Elimina el producto de la lista local
        this.productos = this.productos.filter(producto => producto._id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: 'El producto ha sido eliminado correctamente.',
          timer: 3000,
          showConfirmButton: false,
        });
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: 'No se pudo eliminar el producto. Intenta de nuevo.',
        });
      }
    );
  }
}
}