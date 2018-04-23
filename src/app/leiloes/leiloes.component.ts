import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/Produto';

@Component({
  selector: 'app-leiloes',
  templateUrl: './leiloes.component.html',
  styleUrls: ['./leiloes.component.css']
})
export class LeiloesComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  produtos: Produto[];

  ngOnInit() {
    this.produtoService.buscarProdutos().subscribe(
      response => {
        this.produtos = response['Lancamentos'];
        console.log (this.produtos);
      }
    )
  }

}
