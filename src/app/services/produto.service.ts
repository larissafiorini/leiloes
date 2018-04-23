import { Injectable } from '@angular/core';
import { Produto } from '../entities/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) { }

  cadastrarProduto(produto: Produto){
    this.http.post<Produto>('url', produto);
  }

  buscarProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('url');
  }

}
