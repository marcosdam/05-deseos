import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string = '';

  constructor(private deseosService: DeseosService, private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    // console.log('id de la lista: ' + listaId);
    this.lista = this.deseosService.obtenerLista( listaId );
    console.log('Lista info: ' + this.lista);
  }

  ngOnInit() {
  }

  // Añadir elementos a la lista
  agregarItem(){
    if ( this.nombreItem.length === 0 ) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck( item: ListaItem ){
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;
    //console.log({ pendientes });

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.deseosService.guardarStorage();
  }

  borrar( i: number ){
    this.lista.items.splice( i, 1);
    this.deseosService.guardarStorage();
  }

}
